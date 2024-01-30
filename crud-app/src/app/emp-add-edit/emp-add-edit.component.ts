import { Component } from '@angular/core';
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
import { DialogRef } from '@angular/cdk/dialog';


@Component({
  selector: 'app-emp-add-edit',
  standalone: true,
  providers: [provideNativeDateAdapter(), EmployeeService],
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule, MatSelectModule, ReactiveFormsModule ],
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.css'
})
export class EmpAddEditComponent {
  education : string[] =['Bac', 'Bac+2', 'Bac+3', 'Back+5'];

  empGroup : FormGroup;

  constructor(private _fb : FormBuilder, private _empService : EmployeeService,private _dialogRef : DialogRef<EmpAddEditComponent>){
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
  OnSubmitForm(){
    if(this.empGroup.valid){
      this._empService.addEmployee(this.empGroup.value).subscribe(
         {
          next: (val : any)=>{
              alert("Employee added successfully");
              this._dialogRef.close();
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
