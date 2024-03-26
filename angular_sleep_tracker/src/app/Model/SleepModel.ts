export class SleepModel {
    public id: number;
    public timeStart: Date;
    public timeEnd: Date;
    public time: string;

    constructor(id: number, timeStart: Date, timeEnd: Date, time: string) {
        this.id = id;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        this.time = time;
    }
}
