import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DEFAULT_STATE_KEYS } from './core/state/state.config';
import { StateModule } from './core/state/state.module';
import { PageModule } from './page/page.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    PageModule,
    AppRoutingModule,
    StateModule.forFeature(DEFAULT_STATE_KEYS),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
