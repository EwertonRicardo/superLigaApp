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
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.newsService.getNews().subscribe((res) => {
      this.news = res.map((t) => ({
          id: t.payload.doc.id,
          ...t.payload.doc.data() as NewsModel
        }));
        console.log(this.news);
    });
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
