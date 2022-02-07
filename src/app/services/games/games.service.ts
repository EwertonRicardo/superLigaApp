import { Injectable } from '@angular/core';
import { GamesModel } from './../../models/games.model';
import { TeamsModel } from './../../models/teams.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  constructor(
    private ngFirestore: AngularFirestore
  ) { }

  async create(game: GamesModel): Promise<void> {
    try {
      await this.ngFirestore.collection('games').add(game);
    } catch (error) {
      throw error;
    }
  }

  getGames(): Observable<GamesModel[]> {
    try {
      const gamesResponse = this.ngFirestore.collection('games').snapshotChanges()
      .pipe(
        map(
          (data) => data.map(d => ({
            id: d.payload.doc.id,
            ...d.payload.doc.data() as GamesModel
          }))
        )
      );
      return gamesResponse;
    } catch (error) {
      throw error;
    }
  }

  getTeams(): Observable<TeamsModel[]> {
    try {
      const gamesResponse = this.ngFirestore.collection('teams').snapshotChanges()
      .pipe(
        map(
          (data) => data.map(d => ({
            id: d.payload.doc.id,
            ...d.payload.doc.data() as TeamsModel
          }))
        )
      );
      return gamesResponse;
    } catch (error) {
      throw error;
    }
  }

  async updateGame(game: GamesModel, gameId: string): Promise<void> {
    try {
      await this.ngFirestore.collection('games').doc(gameId).update(game);
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.ngFirestore.doc('games/' + id).delete();
    } catch (error) {
      throw error;
    }
  }
}
