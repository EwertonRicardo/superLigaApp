import { TeamsModel } from './../../models/teams.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(
    private ngFirestore: AngularFirestore
  ) { }

  getTeams(): Observable<TeamsModel[]> {
    try {
      const teamsResponse = this.ngFirestore.collection('teams').snapshotChanges()
      .pipe(
        map(
          (data) => data.map(d => ({
            id: d.payload.doc.id,
            ...d.payload.doc.data() as TeamsModel
          }))
        )
      );
      return teamsResponse;
    } catch (error) {
      throw error;
    }
  }
}
