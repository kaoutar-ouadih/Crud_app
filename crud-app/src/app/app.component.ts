import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './services/employee.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-root',
  standalone: true,
  providers: [EmployeeService],
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule, HttpClientModule, MatPaginatorModule, MatSortModule, MatTableModule, MatInputModule, MatFormFieldModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'dateOfBirth', 'gender', 'education', 'company'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private _dialog : MatDialog, private _empService: EmployeeService){
  }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEditEmpForm(){
    this._dialog.open(EmpAddEditComponent);
  }

  getEmployeeList(){
    this._empService.getEmployee().subscribe(
      {
        next: (result)=>{
            this.dataSource = new MatTableDataSource(result);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        },
        error: (err)=>{
            console.log(err);
        }
      }
    )
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
