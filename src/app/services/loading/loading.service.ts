import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(
    private loadingCtrl: LoadingController
  ) { }

  async present(): Promise<void> {
    const loading = await this.loadingCtrl.create({
      cssClass: 'loading-default',
      mode: 'md'
    });

    return await loading.present();
  }

  dismiss(): void {
    this.loadingCtrl.dismiss();
  }
}
