import { LoadingService } from './../../services/loading/loading.service';
import { RegulationsModel } from './../../models/regulations.model';
import { AddRegulationComponent } from './components/add-regulation/add-regulation.component';
import { RegulationsService } from './../../services/regulations/regulations.service';
import { ToastService } from './../../services/toast/toast.service';
import { MessagesEnum } from 'src/app/enums/messages.enum';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-regulations',
  templateUrl: './regulations.page.html',
  styleUrls: ['./regulations.page.scss'],
})
export class RegulationsPage implements OnInit {
  regulations: RegulationsModel[];
  constructor(
    private regulationsService: RegulationsService,
    private modalCtrl: ModalController,
    private toastService: ToastService,
    private loadingService: LoadingService
  ) { }

  async ngOnInit() {
    await this.get();
  }

  public async openAddDetailModal(regulation?: RegulationsModel): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AddRegulationComponent,
      componentProps: { regulation }
    });
    await modal.present();
  }

  public async delete(regulationId: string): Promise<void> {
    try {
      await this.loadingService.present();

      await this.regulationsService.delete(regulationId);
      await this.toastService.showToast(MessagesEnum.regulationDeleted, 'toast-success');
    } catch (error) {
      console.error(error);
    } finally {
      this.loadingService.dismiss();
    }
  }

  private async get(): Promise<void> {
    try {
      await this.loadingService.present();

      this.regulationsService.get().subscribe(result => this.regulations = result);

    } catch (error) {
      console.error(error);
    } finally {
      this.loadingService.dismiss();
    }
  }

}
