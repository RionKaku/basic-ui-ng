import { NgModule } from '@angular/core';
import { PageRoutingModule } from './page-routing.module';
import { IndexModule } from './index/index.module';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [],
  imports: [PageRoutingModule, IndexModule, DashboardModule],
})
export class PageModule {}
