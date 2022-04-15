import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollSectionDirective } from './directive/scroll-section.directive';
import { ScrollAnchorDirective } from './directive/scroll-anchor.directive';

@NgModule({
  declarations: [
    ScrollSectionDirective,
    ScrollAnchorDirective
  ],
  imports: [CommonModule],
  exports: [CommonModule],
})
export class SharedModule {}
