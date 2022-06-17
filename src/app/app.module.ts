import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppRouteReuseStrategy } from './appRouteReuseStrategy';
import { PageModule } from './page/page.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PageModule, AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: AppRouteReuseStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
