import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { DefaultRoutingModule } from './default-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [DefaultRoutingModule, SharedModule],
})
export class DefaultModule {}
