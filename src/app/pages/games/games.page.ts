import { AddGameComponent } from './components/add-game/add-game.component';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoadingService } from './../../services/loading/loading.service';
import { GamesService } from './../../services/games/games.service';
import { ToastService } from './../../services/toast/toast.service';
import { GamesModel } from './../../models/games.model';
import { MessagesEnum } from 'src/app/enums/messages.enum';
import { ErrorModalService } from 'src/app/services/error-modal/error-modal.service';
@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {
  gamesMale: GamesModel[];
  gamesFemale: GamesModel[];
  teamGender = 'male';
  game: GamesModel;
  constructor(
    private modalCtrl: ModalController,
    private gamesService: GamesService,
    private toastService: ToastService,
    private loadingService: LoadingService,
    private errorModalService: ErrorModalService
  ) { }

  async ngOnInit() {
    await this.getGames();
  }

  public async openAddGameModal(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AddGameComponent,
    });

    await modal.present();
  }

  public async deleteGame(gameID: string): Promise<void> {
    try {
      await this.loadingService.present();

      await this.gamesService.delete(gameID);
      await this.toastService.showToast(MessagesEnum.gamesDeletedSuccess, 'toast-success');
    } catch (error) {
      this.toastService.showToast(error);
    } finally {
      this.loadingService.dismiss();
    }
  }

  public async updateGame(game?: GamesModel): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AddGameComponent,
      componentProps: { game }
    });

    await modal.present();
  }

  private async getGames(): Promise<void> {
    try {
      await this.loadingService.present();

      this.gamesService.getGames().subscribe(result => {
        this.gamesMale = result.filter(({gender}) => gender === 'male');
        this.gamesFemale = result.filter(({gender}) => gender === 'female');
      });
    } catch (error) {
      this.errorModalService.openModalError();
    } finally {
      this.loadingService.dismiss();
    }
  }
}
