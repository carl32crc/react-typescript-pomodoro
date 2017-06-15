
import * as React from 'react';
import {Component} from 'react';
import {GenerateId} from '../../models/GenerateId';
const style = require('./Add.scss');

export interface AddState {
    text: string;
}

export interface AddProps {
    onAdd: any;
}

export class Add extends Component<AddProps, AddState> {

    private generateId: GenerateId = new GenerateId;

    public constructor(props) {
        super(props);

        this.state = {text: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public handleChange(e): void {
        this.setState({text: e.target.value});
    }

    public handleSubmit(e) {
        e.preventDefault();

        let task = {
            name: this.state.text,
            finished: false,
            id: this.generateId.setId()
        };

        this.props.onAdd(task);
    }


    public render(): JSX.Element {
        return (
            <div className={style.containerAdd}>

                <h1>Pomodoro</h1>

                <form onSubmit={this.handleSubmit}>
                    <input placeholder="Write Your Task..." onChange={this.handleChange} value={this.state.text} />
                    <button>Add #</button>
                </form>

            </div>
        );
    }

}