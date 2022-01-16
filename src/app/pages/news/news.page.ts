import { LoadingService } from './../../services/loading/loading.service';
import { AddNewComponent } from './component/add-new/add-new.component';
import { NewDetailComponent } from './component/new-detail/new-detail.component';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewsService } from './../../services/news/news.service';
import { NewsModel } from './../../models/news.model';

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
    private loadingService: LoadingService
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

  public async openAddDetailModal(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AddNewComponent,
    });

    await modal.present();
  }

  public async deleteNew(newID: string): Promise<void> {
    try {
      await this.loadingService.present();

      await this.newsService.delete(newID);
    } catch (error) {
      console.error(error);
    } finally {
      this.loadingService.dismiss();
    }
  }

  private async getNews(): Promise<void> {
    try {
      await this.loadingService.present();

      this.newsService.getNews().subscribe(result => this.news = result);

    } catch (error) {
      console.error(error);
    } finally {
      this.loadingService.dismiss();
    }
  }
}
