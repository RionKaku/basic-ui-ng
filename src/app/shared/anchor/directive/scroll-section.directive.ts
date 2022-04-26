import { Directive, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appScrollSection]',
})
export class ScrollSectionDirective implements OnInit {
  @Input('appScrollSection') id!: string | number;

  constructor() {}

  ngOnInit() {
    console.warn(`section: ${this.id}`);
  }

  scroll(): void {
    console.log('call scroll');
    // this.host.nativeElement.scrollIntoView({
    //   behavior: 'smooth',
    // });
  }
}
