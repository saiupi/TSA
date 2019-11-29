import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMobileNumber]'
})
export class MobileNumberDirective {

  constructor(private _el: ElementRef) { }
  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this._el.nativeElement.value;
    //  alert('direactive' + initalValue);
    this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if (initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
