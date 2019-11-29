import { Directive, AfterViewInit, ElementRef } from '@angular/core';

type NewType = AfterViewInit;

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements NewType {
 
  constructor(private el: ElementRef) {
  }
 
  ngAfterViewInit() {
    this.el.nativeElement.focus();
  }

}
