
import * as React from 'react';
import {Component} from 'react';
const style = require('./Counter.scss');

export interface CounterState {
    seconds: number;
    minutes: number;
    toDoTask: boolean;
    start: string;
}

export interface CounterProps {
    taskStart: any;
    toDoTask: boolean;
    finishedTask: any;
}

export class Counter extends Component<CounterProps, CounterState> {

    private interval: any;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {seconds: 60, minutes: 25, toDoTask: true, start: 'Start'};
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

    public startTime():void {
        this.interval = setInterval(() => this.timeDecrement(), 1000);
        this.setState({start: 'Pause'});
    }

    public stop():void {
        clearInterval(this.interval);
        this.setState({start: 'Start'});
    }

    public resetCounter():void {
        this.stop();
        this.setState({minutes: 25, seconds: 60});
    }

    public render(): JSX.Element {

        if(this.props.toDoTask && this.state.toDoTask){
            clearInterval(this.interval);
            this.startTime();
            this.setState({toDoTask: false});
            this.setState({minutes: 25, seconds: 60});
        }

        return(
            <div className={style.containerCounter} >

                <h1>{this.numPad(this.state.minutes, 2)}:{this.numPad(this.state.seconds, 2)}</h1>

                {this.state.start === 'Start' ? <button onClick={() => this.startTime()} >{this.state.start}</button> :
                        <button onClick={() => this.stop()} >{this.state.start}</button>}

                <button onClick={() => this.resetCounter()} >Reset</button>

                {this.props.taskStart ? <button onClick={() => {
                    this.props.finishedTask();
                    this.setState({toDoTask: true});
                    this.setState({start: 'Start'});
                    this.resetCounter();
                    this.stop();

                }} >Finished</button> : null}

                {this.props.taskStart ? <h3>{this.props.taskStart.name}</h3> : null}

            </div>
        );
    }

    private numPad(num: number, length: number): string {
        if(num === 60){return '00';}
        return Array(Math.max(length - String(num).length + 1, 0)).join('0') + num;
    }

}