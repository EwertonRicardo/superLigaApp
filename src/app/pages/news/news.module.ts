import { AddNewComponent } from './component/add-new/add-new.component';
import { NewDetailComponent } from './component/new-detail/new-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { NewsPageRoutingModule } from './news-routing.module';
import { NewsPage } from './news.page';
import { SharedComponentsModule } from './../../components/shared-components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [
    NewsPage,
    NewDetailComponent,
    AddNewComponent
  ]
})
export class NewsPageModule {}
