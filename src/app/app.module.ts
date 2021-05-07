import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AmiiboComponent } from './amiibo/amiibo/amiibo.component';
import { DisplayComponent } from './amiibo/display/display.component';

@NgModule({
  declarations: [
    AppComponent,
    AmiiboComponent,
    DisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
