import { AbstractControl } from '@angular/forms';
function emailDomain(control: AbstractControl): {
  [key: string]: any;
} | null {
  const email = control.value;
  const domain = email.substring(email.lastIndexOf("@") + 1);
  if (domain === 'cognizant.com') {
    return null;
  }
  return { 'emailDomain': true };
}
