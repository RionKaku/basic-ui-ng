import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appScrollSection]',
})
export class ScrollSectionDirective {
  @Input('appScrollSection') id!: string | number;

  constructor(private host: ElementRef<HTMLElement>) {}

  ngOnInit() {
    console.log(this.host);
  }

  scroll(): void {
    this.host.nativeElement.scrollIntoView({
      behavior: 'smooth',
    });
  }
}
