import { NgModule } from '@angular/core';

import { DefaultRoutingModule } from './default-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [DefaultRoutingModule],
})
export class DefaultModule {}
