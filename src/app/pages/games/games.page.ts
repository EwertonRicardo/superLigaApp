import { AddGameComponent } from './components/add-game/add-game.component';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {
  teamGender = 'male';
  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  public async openAddGameModal(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AddGameComponent,
    });

    await modal.present();
  }

}
