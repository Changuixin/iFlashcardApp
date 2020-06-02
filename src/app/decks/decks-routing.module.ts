import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DecksPage } from './decks.page';

const routes: Routes = [
  {
    path: '',
    component: DecksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DecksPageRoutingModule {}
