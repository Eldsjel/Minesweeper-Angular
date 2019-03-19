import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { AppRoutingModule } from './app-routing.module';
import { SpecialComponent } from './special/special.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    SpecialComponent
  ],
  imports: [
    BrowserModule,
    CardModule,
    ButtonModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
