import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollSectionDirective } from './scroll-section.directive';
import { ScrollAnchorDirective } from './scroll-anchor.directive';
import { PageModule } from './page/page.module';

@NgModule({
  declarations: [AppComponent, ScrollSectionDirective, ScrollAnchorDirective],
  imports: [BrowserModule, PageModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
