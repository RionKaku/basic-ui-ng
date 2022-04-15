import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appScrollAnchor]',
})
export class ScrollAnchorDirective {
  @Input('scrollAnchor') id!: string | number;

  constructor() {}

  @HostListener('click')
  scroll() {}
}
