import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BoardComponent} from './board/board.component';
import {SpecialComponent} from './special/special.component';

const routes: Routes = [
  { path: '', component: BoardComponent },
  { path: 'easteregg', component: SpecialComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
