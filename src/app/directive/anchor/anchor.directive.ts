import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appAnchor]',
})
export class AnchorDirective {
  @Input('appAnchor') targetElement!: HTMLHeadingElement;

  constructor() {}

  @HostListener('click')
  _() {
    this.targetElement.scrollIntoView({
      behavior: 'smooth',
    });
  }
}
