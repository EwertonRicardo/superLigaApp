import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { TableGameModel } from './../../models/tableGame.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TableGamesService {

  constructor(
    private ngFirestore: AngularFirestore
  ) { }

  async create(newDetail: TableGameModel): Promise<void> {
    try {
      await this.ngFirestore.collection('table-games').add(newDetail);
    } catch (error) {
      throw error;
    }
  }

  get(): Observable<TableGameModel[]> {
    try {
      const newsResponse = this.ngFirestore.collection('table-games').snapshotChanges()
      .pipe(
        map(
          (data) => data.map(d => ({
            id: d.payload.doc.id,
            ...d.payload.doc.data() as TableGameModel
          }))
        )
      );
      return newsResponse;
    } catch (error) {
      throw error;
    }
  }

   async delete(id: string): Promise<void> {
     try {
       await this.ngFirestore.doc('table-games/' + id).delete();
     } catch (error) {
       throw error;
     }
   }
}
