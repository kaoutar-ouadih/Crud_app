import { Component, Inject, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-add-edit',
  standalone: true,
  providers: [provideNativeDateAdapter(), EmployeeService],
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule, MatSelectModule, ReactiveFormsModule, MatDialogModule ],
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.css'
})
export class EmpAddEditComponent implements OnInit{
  education : string[] =['Bac', 'Bac+2', 'Bac+3', 'Back+5'];

  empGroup : FormGroup;

  constructor(private _fb : FormBuilder, private _empService : EmployeeService,private _dialogRef : MatDialogRef<EmpAddEditComponent>
    ,@Inject(MAT_DIALOG_DATA) public data : any){
    this.empGroup = this._fb.group({
      firstName : '',
      lastName : '',
      email : '',
      dateOfBirth : '',
      gender : '',
      education : '',
      company :''
    })
  }
  ngOnInit(): void {
    this.empGroup.patchValue(this.data);
  }
  OnSubmitForm(){
    if(this.empGroup.valid){
      if(this.data){
        this._empService.editEmployee(this.data.id, this.empGroup.value).subscribe(
          {
           next: (val : any)=>{
               alert("Employee updated successfully");
               this._dialogRef.close(true);
            }
         ,
            error: (err : any)=>{
             console.log(err);
            }
            
         }
       )
      }
      else{
        this._empService.addEmployee(this.empGroup.value).subscribe(
           {
            next: (val : any)=>{
                alert("Employee added successfully");
                this._dialogRef.close(true);
             }
          ,
             error: (err : any)=>{
              console.log(err);
             }
             
          }
        )
  
      }

    }
    
  }

}
