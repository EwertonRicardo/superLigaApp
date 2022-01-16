import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NewsModel } from './../../models/news.model';

@Injectable({
  providedIn: 'root'
})

export class NewsService {

  constructor(
    private ngFirestore: AngularFirestore
  ) { }

  create(newDetail: NewsModel) {
    return this.ngFirestore.collection('news').add(newDetail);
  }
  getNews() {
    return this.ngFirestore.collection('news').snapshotChanges();
  }
  getTask(id) {
    return this.ngFirestore.collection('news').doc(id).valueChanges();
  }
  update(id, newDetail: NewsModel) {
    this.ngFirestore.collection('news').doc(id).update(newDetail)
      .then(() => {
        console.log('ATUALIZADO');
      }).catch(error => console.log(error));;
  }
  delete(id: string) {
    this.ngFirestore.doc('news/' + id).delete();
  }
}
