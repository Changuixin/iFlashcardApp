import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyDeckPageRoutingModule } from './my-deck-routing.module';

import { MyDeckPage } from './my-deck.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyDeckPageRoutingModule
  ],
  declarations: [MyDeckPage]
})
export class MyDeckPageModule {}
