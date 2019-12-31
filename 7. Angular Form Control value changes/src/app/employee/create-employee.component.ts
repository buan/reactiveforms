import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  employeeForm: FormGroup;
  ngOnInit() {
    // this.employeeForm = new FormGroup({
    //   fullName: new FormControl(),
    //   email: new FormControl(),
    //   skills: new FormGroup({
    //     skillname: new FormControl(),
    //     experience: new FormControl(),
    //     proficiency: new FormControl()
    //   })
    // });

    this.employeeForm = this.fb.group({
      fullName: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]],
      email: [''],
      skills: this.fb.group({
        skillname: [''],
        experience: [''],
        proficiency: ['beginner']
      }),
    });

    // Subscribe to FormGroup valueChanges observable
this.employeeForm.valueChanges.subscribe(
  value => {
    console.log(value);
    console.log(JSON.stringify(value));
  }
);
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
      skills: {
        // skillname: 'C#',
        // experience: 5,
        proficiency: 'Advanced'
      }
    });
  }
  
  onSubmit(): void {
    console.log(this.employeeForm.value);
    console.log(this.employeeForm);
  }

  
}
