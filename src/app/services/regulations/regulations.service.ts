import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { RegulationsModel } from './../../models/regulations.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegulationsService {

  constructor(
    private ngFirestore: AngularFirestore
  ) { }

  async create(newDetail: RegulationsModel): Promise<void> {
    try {
      await this.ngFirestore.collection('regulations').add(newDetail);
    } catch (error) {
      throw error;
    }
  }

  get(): Observable<RegulationsModel[]> {
    try {
      const newsResponse = this.ngFirestore.collection('regulations').snapshotChanges()
      .pipe(
        map(
          (data) => data.map(d => ({
            id: d.payload.doc.id,
            ...d.payload.doc.data() as RegulationsModel
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
       await this.ngFirestore.doc('regulations/' + id).delete();
     } catch (error) {
       throw error;
     }
   }
}
