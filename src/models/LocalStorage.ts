
import {Task} from '../models/Task';
import {GenerateId} from './GenerateId';

export class LocalStorage {

    private generateId:GenerateId = new GenerateId;

    private initialTask: Task[] = [{
        name: 'Sample Task',
        finished: true,
        id: this.generateId.setId()
    }];

    public initLocalStorage():void {
        if(!localStorage.getItem('tasks')){
            localStorage.setItem('tasks', JSON.stringify(this.initialTask));
        }
    }

    public getLocalStorage():Task[] {
        return JSON.parse(localStorage.getItem('tasks'));
    }

    public setLocalStorage(task: Task[]):void {
       localStorage.setItem('tasks', JSON.stringify(task));
    }

}
