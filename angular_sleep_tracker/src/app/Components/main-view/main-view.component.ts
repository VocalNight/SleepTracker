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

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatButtonModule, MatTableModule, MatDividerModule, MatPaginator, MatPaginatorModule, CommonModule, MatFormFieldModule, MatDatepickerModule],
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
