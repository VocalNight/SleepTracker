import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { SleepModel } from '../../Model/SleepModel';
import { SleepHttpService } from '../../Services/sleep-http.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatButtonModule, MatTableModule],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css'
})
export class MainViewComponent implements OnInit {

  sleepRecords = new BehaviorSubject([]);
  columnsToDisplay = ['id', 'date', 'time'];
  clickedRecord!: SleepModel;

  constructor(private SleepHttp: SleepHttpService) {}

  ngOnInit(): void {
    this.getRecords();
  }

  getRecords() {
    this.SleepHttp.getRecords('sleepers').subscribe({
      next: records => this.sleepRecords.next(records),
      error: e => console.error("Api error", e)
    });;
  }

}
