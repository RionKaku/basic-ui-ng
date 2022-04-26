import { Directive, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appScrollAnchor]',
})
export class ScrollAnchorDirective implements OnInit {
  @Input('appScrollAnchor') id!: string | number;

  constructor() {}

  ngOnInit() {
    console.warn(`anchor: ${this.id}`);
  }

  // @HostListener('click')
  // scroll() {
  //   console.log('do scroll');
  // }
}
