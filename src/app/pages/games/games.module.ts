import { AddGameComponent } from './components/add-game/add-game.component';
import { SharedComponentsModule } from './../../components/shared-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GamesPageRoutingModule } from './games-routing.module';

import { GamesPage } from './games.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    GamesPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [
    GamesPage,
    AddGameComponent
  ]
})
export class GamesPageModule {}
