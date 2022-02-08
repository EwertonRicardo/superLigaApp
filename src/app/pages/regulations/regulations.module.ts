import { SharedComponentsModule } from './../../components/shared-components.module';
import { AddRegulationComponent } from './components/add-regulation/add-regulation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegulationsPageRoutingModule } from './regulations-routing.module';

import { RegulationsPage } from './regulations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegulationsPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [
    RegulationsPage,
    AddRegulationComponent
  ],
})
export class RegulationsPageModule {}
