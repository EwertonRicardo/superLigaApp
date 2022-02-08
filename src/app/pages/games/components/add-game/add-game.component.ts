/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GamesService } from './../../../../services/games/games.service';
import { LoadingService } from './../../../../services/loading/loading.service';
import { GamesModel } from './../../../../models/games.model';
import { TeamsModel } from './../../../../models/teams.model';
import { ToastService } from './../../../../services/toast/toast.service';
import { MessagesEnum } from 'src/app/enums/messages.enum';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss'],
})
export class AddGameComponent implements OnInit {
  gameForm: FormGroup;
  game: GamesModel;
  genderSelecteed;
  fisrtTeam;
  secondTeam;
  teams: TeamsModel[];
  constructor(
    private _formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private gamesService: GamesService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this._createForm();
    if(this.game){
      this.genderSelecteed = this.game.gender;
      this.getTeams(false);
      this.fisrtTeam = this.game.fisrtTeam;
      this.secondTeam = this.game.secondTeam;
    }
  }

  public async addGame(): Promise<void> {
    try {
      await this.loadingService.present();

      const request: GamesModel = {
        fisrtTeam:  this.gameForm.get('fisrtTeam').value,
        secondTeam:  this.gameForm.get('secondTeam').value,
        gameDate:  this.gameForm.get('gameDate').value,
        gameNumber:  this.gameForm.get('gameNumber').value,
        gender:  this.gameForm.get('gender').value,
        place:  this.gameForm.get('place').value,
      };

      await this.gamesService.create(request);
      this.gameForm.reset();
      await this.toastService.showToast(MessagesEnum.gamesAdded, 'toast-success');
    } catch (error) {
      console.error(error);
    } finally {
      this.loadingService.dismiss();
    }
  }

  public async editGame(): Promise<void> {
    try {
      await this.loadingService.present();

      await this.gamesService.updateGame(this.gameForm.value, this.game.id);
      await this.toastService.showToast(MessagesEnum.gameUpdated, 'toast-success');
    } catch (error) {
      console.error(error);
    } finally {
      this.loadingService.dismiss();
    }
  }

  public async getTeams(reset = true): Promise<void> {
    try {
      await this.loadingService.present();
      const genderSelecteed = this.genderSelecteed;
      console.log(genderSelecteed);
      if(genderSelecteed){
        this.gamesService.getTeams().subscribe(result => {
          this.teams = result.filter(({gender}) => gender === genderSelecteed);
        });
        if(reset){
          this.fisrtTeam = null;
          this.secondTeam = null;
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.loadingService.dismiss();

    }
  }

  private _createForm(): void {
    if (this.game) {
      this.gameForm = this._formBuilder.group({
        gameNumber: [this.game.gameNumber, Validators.required],
        fisrtTeam: [this.game.fisrtTeam, Validators.required],
        secondTeam: [this.game.secondTeam, Validators.required],
        gameDate: [this.game.gameDate, Validators.required],
        gender: [this.game.gender, Validators.required],
        place: [this.game.place, Validators.required],
      });
    } else {
      this.gameForm = this._formBuilder.group({
        gameNumber: ['', Validators.required],
        fisrtTeam: ['', Validators.required],
        secondTeam: ['', Validators.required],
        gameDate: ['', Validators.required],
        gender: ['', Validators.required],
        place: ['', Validators.required],
      });
    }
  }

}
