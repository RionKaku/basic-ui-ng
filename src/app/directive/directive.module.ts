import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnchorDirective } from './anchor/anchor.directive';

@NgModule({
  declarations: [AnchorDirective],
  imports: [CommonModule],
  exports: [AnchorDirective],
})
export class DirectiveModule {}
