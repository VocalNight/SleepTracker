import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { SleepModel } from '../../Model/SleepModel';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatButtonModule, MatTableModule],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css'
})
export class MainViewComponent {

  sleepRecords: SleepModel[] = [];
  columnsToDisplay = ['id', 'date', 'timeTaken'];
  clickedRecord!: SleepModel;

}
