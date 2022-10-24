import { AbstractControl } from "@angular/forms";
import { DatePipe } from '@angular/common';
import { PipeTransform } from "@angular/core";


export function PasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
     const password = control.get('password');
     const password_confirmed = control.get('password_confirmed');
     if (password.pristine || password_confirmed.pristine) {
          return null;
     }
     return password && password_confirmed && password.value !== password_confirmed.value ?
          { 'mismatch': true } : null;
}