import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  employeeForm: FormGroup;

  formErrors = {
    'fullName': '',
    'email': '',
    'phone': '',
    'skillname': '',
    'experience': '',
    'proficiency': ''
  };

  // This object contains all the validation messages for this form
  validationMessages = {
    'fullName': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 2 characters.',
      'maxlength': 'Full Name must be less than 10 characters.'
    },
    'email': {
      'required': 'Email is required.',
      'emailDomain': 'Email domain should be cognizant.com'

    },
    'phone': {
      'required': 'Phone is required.'
    },
    'preference': {
      'required': 'Contact Preference is required.'
    },
    'skillname': {
      'required': 'Skill Name is required.',
    },
    'experience': {
      'required': 'Experience is required.',
    },
    'proficiency': {
      'required': 'Proficiency is required.',
    },
  };

  ngOnInit() {

    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      email: ['', [Validators.required,emailDomain]],
      phone: [''],
      preference: ['phone', Validators.required],
      skills: this.fb.group({
        skillname: ['', Validators.required],
        experience: ['', Validators.required],
        proficiency: ['', Validators.required]
      }),
    });

    // Subscribe to FormGroup valueChanges observable
    this.employeeForm.get('preference').valueChanges.subscribe(
      (value: string) => {
        this.onContactPrefernceChange(this.employeeForm.get('preference').value)
      }
    );
  }

  onContactPrefernceChange(data: string) {
    const phoneFormControl = this.employeeForm.get('phone');
    if (data === 'phone') {
      phoneFormControl.setValidators(Validators.required)
    }
    else {
      phoneFormControl.clearValidators()
    }
    phoneFormControl.updateValueAndValidity();

  }

  loadvalues(): void {
    this.logValidationErrors(this.employeeForm);
    console.log(this.formErrors);
  }

  logValidationErrors(group: FormGroup = this.employeeForm): void {
    // loop through each key in the FormGroup
    Object.keys(group.controls).forEach((key: string) => {
      // Get a reference to the control using the FormGroup.get() method
      const abstractControl = group.get(key);
      // If the control is an instance of FormGroup i.e a nested FormGroup
      // then recursively call this same method (logKeyValuePairs) passing it
      // the FormGroup so we can get to the form controls in it
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
        // If the control is not a FormGroup then we know it's a FormControl


      } else {
        // console.log('Key = ' + key + ' && Value = ' + abstractControl.value);
        // abstractControl.disable();
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
          // Get all the validation messages of the form control
          // that has failed the validation
          const messages = this.validationMessages[key];
          // Find which validation has failed. For example required,
          // minlength or maxlength. Store that error message in the
          // formErrors object. The UI will bind to this object to
          // display the validation errors
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
  }

   

onSubmit(): void {
  console.log(this.employeeForm.value);
  console.log(this.employeeForm);


}


}

function emailDomain(control: AbstractControl): { [key: string]: any } | null {
  const email = control.value
  const domain = email.substring(email.lastIndexOf("@") +1);
  if(domain === '' || domain === 'cognizant.com'){
    return null;
  }
  return { 'emailDomain': true };
  
  }