import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnchorModule } from './anchor/anchor.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AnchorModule],
  exports: [CommonModule, AnchorModule],
})
export class SharedModule {}
