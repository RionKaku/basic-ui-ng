import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeModule } from '../pipe/pipe.module';
import { DirectiveModule } from '../directive/directive.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, PipeModule, DirectiveModule],
  exports: [CommonModule, PipeModule, DirectiveModule],
})
export class SharedModule {}
