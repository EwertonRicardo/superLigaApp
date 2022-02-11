import { SharedComponentsModule } from './../../components/shared-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RankingPageRoutingModule } from './ranking-routing.module';

import { RankingPage } from './ranking.page';
import { AddRankingComponent } from './component/add-ranking/add-ranking.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RankingPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [
    RankingPage,
    AddRankingComponent
  ]
})
export class RankingPageModule {}
