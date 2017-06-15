
import * as React from 'react';
import {Component} from 'react';

import {Task} from '../../models/Task';

const style = require('./List.scss');


export interface ListProps {
    finished?: boolean;
    onChange?: any;
    tasks: Task[];
    start?: any;
    returnTask?: any;
    deleteTask?: any;
    task?: any;
}

export class List extends Component<ListProps,{}> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    public render(): JSX.Element {
        return (
            <ul className={style.list} >

                {this.props.tasks.map((t, i) =>
                        <li key={t.id} >
                            <span>{t.name}</span>

                        {!t.finished && !this.props.start && !this.props.task ? <button className={style.btnStart} onClick={() =>
                            this.props.onChange(t.id)}>Start Task</button> : null}

                        {t.finished ? <button className={style.btnReturn} onClick={() =>
                            this.props.returnTask(t.id)}>Return</button> : null}

                        {t.finished ? <button className={style.btnDelete} onClick={() =>
                            this.props.deleteTask(t.id)}>Delete</button> : null}
                </li>
                )}
            </ul>
        );
    }

}