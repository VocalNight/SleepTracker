export class SleepModel {
    public id: number;
    public date: Date;
    public time: string;

    constructor(id: number, date: Date, time: string) {
        this.id = id;
        this.date = date;
        this.time = time;
    }
}
