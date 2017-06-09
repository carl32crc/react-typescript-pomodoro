

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
}

export default class App extends React.Component<{}, AppState> {

    private startTask: any;
    private storage: LocalStorage = new LocalStorage();

    public constructor(props?: any, context?: any) {
        super(props, context);

        this.storage.initLocalStorage();

        this.state = { tasks: this.storage.getLocalStorage(), todoTask: false };
        this.onAdd = this.onAdd.bind(this);
        this.getTask = this.getTask.bind(this);
        this.returnTaskInList = this.returnTaskInList.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.finishedTask = this.finishedTask.bind(this);
    }

    public onAdd(task: Task): void {

        let tasks = this.state.tasks.concat([task]);
        this.storage.setLocalStorage(tasks);
        this.setState({tasks: tasks});

    }

    public getTask(id): void{

        let self = this;

        this.state.tasks.forEach(function (t) {
            if(id === t.id){
                self.startTask = t;
                self.setState({todoTask: t});
            }
        });

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

        var filteredAry = this.state.tasks.filter(t => t.id !== id)

        this.storage.setLocalStorage(filteredAry);
        this.setState({tasks: filteredAry});
    }


    public render(): JSX.Element {
        return(
            <div className={style.containerApp}>

                <div>
                    <Add  onAdd={this.onAdd} />
                    <List taskStart = {this.startTask} tasks={this.state.tasks ? this.state.tasks.filter(t => !t.finished) : []} onChange={this.getTask} />
                </div>

                <div>
                    <Counter taskStart = {this.startTask} toDoTask={this.state.todoTask} finishedTask = {this.finishedTask} />
                </div>

                <div>
                    <List deleteTask={this.deleteTask} returnTask={this.returnTaskInList} tasks={this.state.tasks ? this.state.tasks.filter(t => t.finished) : []} finished />
                </div>

            </div>
        );
    }

}