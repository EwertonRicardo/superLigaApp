import { ErrorComponent } from './../../components/error/error.component';
import { ModalController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorModalService {

  constructor(
    private modalCtrl: ModalController
  ) { }

  public async openModalError(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: ErrorComponent,
    });

    await modal.present();
  }
}
