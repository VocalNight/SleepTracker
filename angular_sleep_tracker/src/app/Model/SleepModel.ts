export class SleepModel {
    public id: number;
    public date: Date;
    public timeTaken: string;

    constructor(id: number, date: Date, timeTaken: string) {
        this.id = id;
        this.date = date;
        this.timeTaken = timeTaken;
    }
}
