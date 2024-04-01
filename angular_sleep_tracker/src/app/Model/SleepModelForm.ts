export class SleepModelForm {
    public id: number;
    public timeStart: number;
    public timeEnd: number;
    public dateStart: Date;
    public dateEnd: Date;
    public time: string;

    constructor(id: number, timeStart: number, timeEnd: number, dateStart: Date, dateEnd: Date, time: string) {
        this.id = id;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        this.time = time;
        this.dateEnd = dateEnd;
        this.dateStart = dateStart;
    }
}
