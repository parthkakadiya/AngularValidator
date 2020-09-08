import { Directive, OnInit } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { USER_MIN_AGE } from 'app/shared/enum/enum.model';

@Directive({
  selector: '[userMinAgeValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: UserMinAgeValidatorDirective,
      multi: true
    }
  ]
})
export class UserMinAgeValidatorDirective implements Validator {
  constructor() {}

  public validate(elementControl: AbstractControl): { [key: string]: any } | null {
    const now = new Date();
    if (elementControl && elementControl.value && elementControl.value._i) {
      const temp = new Date(elementControl.value._i);
      /*older than 100 years*/
      if (temp.getFullYear() < now.getFullYear() - 100) {
        return { hasError: true };
      } else if (temp.getFullYear() == now.getFullYear() - 100 && temp.getMonth() < 1 && temp.getDate() < 1) {

      /*age is 100*/
        return { hasError: true };
      } else if (temp.getFullYear() < now.getFullYear() - USER_MIN_AGE) {
        return null;
      } else if (temp.getFullYear() == now.getFullYear() - USER_MIN_AGE) {

      /*same year, same month*/
        if (temp.getMonth() + 1 == now.getMonth() + 1) {
          if (temp.getDate() > now.getDate()) return { hasError: true };
        } else if (temp.getMonth() > now.getMonth() + 1) {
          return { hasError: true };
        }
      } else if (temp.getFullYear() > now.getFullYear() - USER_MIN_AGE) {
      /*below 18*/
        return { hasError: true };
      }
    }
  }
}
