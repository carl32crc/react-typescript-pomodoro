
import * as React from 'react';

import {Counter} from '../Counter/Counter';
import {List} from '../List/List';
import {Add} from '../Add/Add';
import {Task} from '../../models/Task';
import {LocalStorage} from '../../models/LocalStorage';

const style = require('./App.scss');


export interface AppState {
    tasks: Task[];
    todoTask?: any;
    seconds: number;
    minutes: number;
    start: string;
    running: boolean;
}

export default class App extends React.Component<{}, AppState> {

    private interval: any;
    private startTask: any;
    private storage: LocalStorage = new LocalStorage();

    public constructor(props?: any, context?: any) {
        super(props, context);

        this.storage.initLocalStorage();

        this.state = {tasks: this.storage.getLocalStorage(), todoTask: false, seconds: 60, minutes: 25, running:false, start: 'Start'};

        this.onAdd = this.onAdd.bind(this);
        this.getTask = this.getTask.bind(this);
        this.returnTaskInList = this.returnTaskInList.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.startTime = this.startTime.bind(this);
        this.stop = this.stop.bind(this);
        this.resetCounter = this.resetCounter.bind(this);
        this.finishedTask = this.finishedTask.bind(this);
    }


    public timeDecrement(): void{

        if(this.state.seconds === 0 && this.state.minutes === 0){
            this.stop();
        }else{
            if(this.state.seconds === 0){
                this.setState({minutes: this.state.minutes - 1, seconds: 60});
                this.setState({seconds: this.state.seconds - 1 });
            }else{

                if(this.state.minutes === 25){
                    this.setState({minutes: this.state.minutes - 1});
                }

                this.setState({seconds: this.state.seconds - 1 });
            }
        }
    }

    public startTime(): void {
        this.interval = setInterval(() => this.timeDecrement(), 1000);
        this.setState({running:true, start: 'Pause'});
    }

    public stop(): void {
        clearInterval(this.interval);
        this.setState({ running:false, start: 'Start'});
    }

    public resetCounter(): void {
        this.stop();
        this.setState({minutes: 25, seconds: 60, running:false});
    }


    public onAdd(task: Task): void {

        let tasks = this.state.tasks.concat([task]);
        this.storage.setLocalStorage(tasks);
        this.setState({tasks: tasks});
    }

    public getTask(id): void{

        this.state.tasks.forEach((t) => {
            if(id === t.id){
                this.startTask = t;
                this.setState({todoTask: t});
            }
        });

        this.startTime();
        this.setState({minutes: 25, seconds: 60, running:true});
        this.storage.setLocalStorage(this.state.tasks);
        this.setState({tasks: this.state.tasks});
    }

    public finishedTask(){

        let self = this;

        if(this.startTask){
            this.state.tasks.forEach(function (t) {
                if(self.state.todoTask.id === t.id){
                    t.finished = true;
                    self.setState({todoTask: null});
                    self.startTask = null;
                }
            });
        }

        this.storage.setLocalStorage(this.state.tasks);
        this.setState({tasks: this.state.tasks});
    }

    public returnTaskInList(id):void {

        this.state.tasks.forEach(function (t) {
            if(id === t.id){
                t.finished = false;
            }
        });

        this.storage.setLocalStorage(this.state.tasks);
        this.setState({tasks: this.state.tasks});
    }

    public deleteTask(id):void {

        let filteredAry = this.state.tasks.filter(t => t.id !== id);

        this.storage.setLocalStorage(filteredAry);
        this.setState({tasks: filteredAry});
    }

    public render(): JSX.Element {
        return (
            <div className={style.containerApp}>

                <div>
                    <Add onAdd={this.onAdd} />
                    <List
                        start={this.state.running}
                        task={this.startTask}
                        tasks={this.state.tasks ? this.state.tasks.filter(t => !t.finished) : []}
                        onChange={this.getTask} />
                </div>

                <div>
                    <Counter start={this.startTime}
                             textStart={this.state.start}
                             reset={this.resetCounter}
                             stop={this.stop}
                             isStart={this.state.running}
                             toDoTask={this.state.todoTask}
                             task={this.startTask}
                             finishedTask={this.finishedTask}
                             minutes={this.state.minutes}
                             seconds={this.state.seconds}
                             />
                </div>

                <div>
                    <List
                        deleteTask={this.deleteTask}
                        returnTask={this.returnTaskInList}
                        start={this.state.running}
                        tasks={this.state.tasks ? this.state.tasks.filter(t => t.finished) : []} />
                </div>

            </div>
        );
    }

}