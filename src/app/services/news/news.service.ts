import { MessagesEnum } from './../../enums/messages.enum';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { NewsModel } from './../../models/news.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class NewsService {

  constructor(
    private ngFirestore: AngularFirestore
  ) { }

  async create(newDetail: NewsModel): Promise<void> {
    try {
      await this.ngFirestore.collection('news').add(newDetail);
    } catch (error) {
      throw MessagesEnum.genericMessage;
    }
  }
  getNews(): Observable<NewsModel[]> {
    try {
      const newsResponse = this.ngFirestore.collection('news').snapshotChanges()
      .pipe(
        map(
          (data) => data.map(d => ({
            id: d.payload.doc.id,
            ...d.payload.doc.data() as NewsModel
          }))
        )
      );
      return newsResponse;
    } catch (error) {
      throw MessagesEnum.genericMessage;
    }
  }

  async updateNew(newDetail: NewsModel, newsId: string): Promise<void> {
   try {
    await this.ngFirestore.collection('news').doc(newsId).update({
      title: newDetail.title,
      description: newDetail.description,
      filespath: newDetail.filespath
    });
   } catch (error) {
    throw MessagesEnum.genericMessage;
   }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.ngFirestore.doc('news/' + id).delete();
    } catch (error) {
      throw MessagesEnum.genericMessage;
    }
  }
}
