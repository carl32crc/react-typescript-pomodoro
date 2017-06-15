
import * as React from 'react';
import {Component} from 'react';

const style = require('./Counter.scss');


export interface CounterProps {
    start: any;
    reset: any;
    stop: any;
    textStart: string;
    toDoTask: boolean;
    finishedTask: any;
    seconds:number;
    minutes:number;
    isStart:boolean;
    task:any;
}

export class Counter extends Component<CounterProps, {}> {

    public render(): JSX.Element {

        return (
            <div className={style.containerCounter} >

                <h1>{this.numPad(this.props.minutes, 2)}:{this.numPad(this.props.seconds, 2)}</h1>

                {!this.props.isStart ? <button onClick={this.props.start} >{this.props.textStart}</button> :
                        <button onClick={this.props.stop} >{this.props.textStart}</button>}

                <button onClick={this.props.reset} >Reset</button>

                {this.props.isStart ? <button onClick={() => {
                    this.props.finishedTask();
                    this.props.reset();
                    this.props.stop();
                }} >Finished</button> : null}

                {this.props.task ? <h3>{this.props.task.name}</h3> : null}

            </div>
        );
    }

    private numPad(num: number, length: number): string {
        if(num === 60){return '00';}
        return Array(Math.max(length - String(num).length + 1, 0)).join('0') + num;
    }

}