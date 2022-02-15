import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedComponentsModule } from './../../components/shared-components.module';
import { AddComponent } from './component/add/add.component';

import { IonicModule } from '@ionic/angular';

import { TableGamesPageRoutingModule } from './table-games-routing.module';

import { TableGamesPage } from './table-games.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TableGamesPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [TableGamesPage,AddComponent]
})
export class TableGamesPageModule {}
