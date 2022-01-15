import { AddNewComponent } from './component/add-new/add-new.component';
import { NewDetailComponent } from './component/new-detail/new-detail.component';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  public async openNewDetail(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: NewDetailComponent,
    });

    await modal.present();
  }

  public async openAddDetailModal(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AddNewComponent,
    });

    await modal.present();
  }
}
