import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import { AddNewComponent } from './component/add-new/add-new.component';
import { NewDetailComponent } from './component/new-detail/new-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { NewsPageRoutingModule } from './news-routing.module';
import { NewsPage } from './news.page';
import { SharedComponentsModule } from './../../components/shared-components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewsPageRoutingModule,
    SharedComponentsModule,
  ],
  declarations: [
    NewsPage,
    NewDetailComponent,
    AddNewComponent
  ],
  providers: [Chooser]
})
export class NewsPageModule {}
