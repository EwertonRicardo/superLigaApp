import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { RankingModel } from './../../models/ranking.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor(
    private ngFirestore: AngularFirestore
  ) { }

  async createRanking(ranking: RankingModel): Promise<void> {
    try {
      await this.ngFirestore.collection('ranking').add(ranking);
    } catch (error) {
      throw error;
    }
  }

  getRanking(): Observable<RankingModel[]> {
    try {
      const newsResponse = this.ngFirestore.collection('ranking').snapshotChanges()
      .pipe(
        map(
          (data) => data.map(d => ({
            id: d.payload.doc.id,
            ...d.payload.doc.data() as RankingModel
          }))
        )
      );
      return newsResponse;
    } catch (error) {
      throw error;
    }
  }

  async deleteRanking(id: string): Promise<void> {
    try {
      await this.ngFirestore.doc('ranking/' + id).delete();
    } catch (error) {
      throw error;
    }
  }
}
