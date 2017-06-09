

export class GenerateId {

    public setId():number {
        let d = new Date();
        return d.getTime();
    }
}
