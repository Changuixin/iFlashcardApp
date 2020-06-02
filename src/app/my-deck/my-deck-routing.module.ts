import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyDeckPage } from './my-deck.page';

const routes: Routes = [
  {
    path: '',
    component: MyDeckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyDeckPageRoutingModule {}
