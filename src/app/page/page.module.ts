import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { PageRoutingModule } from './page-routing.module';
import { SubComponent } from './sub/sub.component';

@NgModule({
  declarations: [HomeComponent, SubComponent],
  imports: [PageRoutingModule, SharedModule],
})
export class PageModule {}
