import { ToastService } from './../../services/toast/toast.service';
import { LoadingService } from './../../services/loading/loading.service';
import { AddNewComponent } from './component/add-new/add-new.component';
import { NewDetailComponent } from './component/new-detail/new-detail.component';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewsService } from './../../services/news/news.service';
import { NewsModel } from './../../models/news.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  news: NewsModel[];
  constructor(
    private newsService: NewsService,
    private modalCtrl: ModalController,
    private loadingService: LoadingService,
    private angularFireStorage: AngularFireStorage,
    private toastService: ToastService
    ) { }

  async ngOnInit() {
    await this.getNews();
  }

  public async openNewDetail(newDetail: NewsModel): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: NewDetailComponent,
      componentProps: { newDetail },
    });

    await modal.present();
  }

  public async openAddDetailModal(news?: NewsModel): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AddNewComponent,
      componentProps: { news }
    });

    await modal.present();
  }

  public async deleteNew(newObject: NewsModel): Promise<void> {
    try {
      await this.loadingService.present();

      if(newObject.filespath){
        this.angularFireStorage.storage.refFromURL(newObject.filespath).delete();
      }

      await this.newsService.delete(newObject.id);
    } catch (error) {
      this.toastService.showToast(error);
    } finally {
      this.loadingService.dismiss();
    }
  }

  private async getNews(): Promise<void> {
    try {
      await this.loadingService.present();

      this.newsService.getNews().subscribe(result => this.news = result);

    } catch (error) {
      this.toastService.showToast(error);
    } finally {
      this.loadingService.dismiss();
    }
  }
}
