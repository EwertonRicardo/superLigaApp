/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GamesService } from './../../../../services/games/games.service';
import { LoadingService } from './../../../../services/loading/loading.service';
import { GamesModel } from './../../../../models/games.model';
import { ToastService } from './../../../../services/toast/toast.service';
import { MessagesEnum } from 'src/app/enums/messages.enum';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss'],
})
export class AddGameComponent implements OnInit {
  gameForm: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private gamesService: GamesService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this._createForm();
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

  private _createForm(): void {
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
