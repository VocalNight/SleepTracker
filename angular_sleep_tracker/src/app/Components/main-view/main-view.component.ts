import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { SleepModel } from '../../Model/SleepModel';
import { SleepHttpService } from '../../Services/sleep-http.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { CdTimerComponent, CdTimerModule } from 'angular-cd-timer';
import moment from 'moment';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatButtonModule, MatTableModule, MatDividerModule, MatPaginator, MatPaginatorModule, CommonModule, MatFormFieldModule, MatDatepickerModule, CdTimerModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css'
})
export class MainViewComponent implements OnInit, AfterViewInit {

  columnsToDisplay = ['id', 'timeStart', 'timeEnd', 'time'];
  clickedRecord!: SleepModel;
  dataSource = new MatTableDataSource<SleepModel>([]);
  dateFieldStart: Date = new Date();
  dateFieldEnd: Date = new Date();
  @ViewChild('basicTimer') timerModule: CdTimerModule | undefined;
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    } 
  }

  constructor(private SleepHttp: SleepHttpService) {}

  ngOnInit(): void {
    this.getRecords();
  }

  getRecords() {
    this.SleepHttp.getRecords('sleepers').subscribe({
      next: records =>  {
        this.dataSource = new MatTableDataSource(records);
        this.dataSource.paginator = this.paginator;
      },
      error: e => console.error("Api error", e)
    });;
  }

  formatTableDate(milliseconds: number) {
    let time = new Date(milliseconds);
    console.log(milliseconds);
    console.log(time);
    console.log(moment(milliseconds).toDate())
    return time;
  }

  formatDate(date: Date): number {
    return date.setHours(0,0,0,0);
  }

  onTimerStop(timer: CdTimerComponent) {
    let currSeconds = timer.get().seconds;
    let startDate = new Date();
    let endDate = new Date();
    console.log(startDate.getTime());
    
    startDate.setSeconds(startDate.getSeconds() - (currSeconds));
    endDate.setSeconds(startDate.getSeconds() + (currSeconds));

    let timePassed = this.EditTimer(timer.get().hours.toString()) + ':' + this.EditTimer(timer.get().minutes.toString()) + ':' + this.EditTimer(timer.get().seconds.toString())

    let sleep = new SleepModel(0, startDate.getMilliseconds(), endDate.getMilliseconds(), timePassed)

    this.SleepHttp.postItem( sleep, 'sleepers')
      .subscribe({
        next: (r) => {
          this.getRecords();
        },
        error: (e) => {
          console.error("post error", e)
        }
      })

    timer.reset();
  }

  EditTimer(time: string) {
    console.log(time);
    if (time.length === 1) {
      return '0' + time;
    }
    return time;
  }

  onChangeDate() {
    if (this.dateFieldEnd) {

    this.SleepHttp.getRecords('sleepers').subscribe({
      next: (records: SleepModel[]) => {
        this.dataSource = new MatTableDataSource(records.filter(
          sleepRecord => 
          this.formatDate(new Date(sleepRecord.timeStart)) >= this.formatDate(this.dateFieldStart) 
            && this.formatDate(new Date(sleepRecord.timeStart)) <= this.formatDate(this.dateFieldEnd) 
        ))
        this.dataSource.paginator = this.paginator;
      },
      error: e => console.error("Api error", e)
    })
  }
  }

  deleteRecord() {
    if (this.clickedRecord) {
      console.log("hi");
      this.SleepHttp.deleteRow(this.clickedRecord.id, 'sleepers')
        .subscribe({
          next: result => this.getRecords(),
          error: e => console.error("Api error", e)
        })
      
    }
  }
}
