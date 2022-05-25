import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectiveModule } from '../directive/directive.module';
import { PipeModule } from '../pipe/pipe.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, PipeModule, DirectiveModule],
  exports: [CommonModule, PipeModule, DirectiveModule],
})
export class SharedModule {}
