import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  constructor() { }
  employeeForm: FormGroup;
  ngOnInit() {
    this.employeeForm = new FormGroup({
      fullName: new FormControl(),
      email: new FormControl(),
      skills: new FormGroup({
        skillname: new FormControl(),
        experience: new FormControl(),
        proficiency: new FormControl()
      })
    });
  }

  loadvalues():void{
    // this.employeeForm.setValue({
    //   fullName: 'Pragim Technologies',
    //   email: 'pragim@pragimtech.com',
    //   skills: {
    //     skillname: 'C#',
    //     experience: 5,
    //     proficiency: 'Beginner'
    //   }
    // });
    this.employeeForm.patchValue({
      fullName: 'Pragim Technologies',
      email: 'pragim@pragimtech.com',
      // skills: {
      //   skillname: 'C#',
      //   experience: 5,
      //   proficiency: 'Beginner'
      // }
    });
  }
  
  onSubmit(): void {
    console.log(this.employeeForm.value);
    console.log(this.employeeForm);
  }
}
