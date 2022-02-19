import { ErrorModalService } from './../../services/error-modal/error-modal.service';
import { FileManagerService } from './../../services/file-manager/file-manager.service';
import { LoadingService } from './../../services/loading/loading.service';
import { RegulationsModel } from './../../models/regulations.model';
import { AddRegulationComponent } from './components/add-regulation/add-regulation.component';
import { RegulationsService } from './../../services/regulations/regulations.service';
import { ToastService } from './../../services/toast/toast.service';
import { MessagesEnum } from 'src/app/enums/messages.enum';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-regulations',
  templateUrl: './regulations.page.html',
  styleUrls: ['./regulations.page.scss'],
})
export class RegulationsPage implements OnInit {
  regulations: RegulationsModel[];
  isAdmin = environment.isAdmin;
  constructor(
    private regulationsService: RegulationsService,
    private modalCtrl: ModalController,
    private toastService: ToastService,
    private loadingService: LoadingService,
    private fileManager: FileManagerService,
    private angularFireStorage: AngularFireStorage,
    private errorModalService: ErrorModalService
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

  public async deleteRegulation(regulation: RegulationsModel): Promise<void> {
    try {
      await this.loadingService.present();

      if(regulation.filepath){
        this.angularFireStorage.storage.refFromURL(regulation.filepath).delete();
      }

      await this.regulationsService.delete(regulation.id);
      await this.toastService.showToast(MessagesEnum.regulationDeleted, 'toast-success');
    } catch (error) {
      this.toastService.showToast(MessagesEnum.genericMessage);
    } finally {
      this.loadingService.dismiss();
    }
  }

  public async downloadFile(url: string): Promise<void> {
    try {
      await this.loadingService.present();
      await this.fileManager.downloadFile(url);
    } catch (error) {
      this.toastService.showToast(MessagesEnum.genericMessage);
    } finally {
      this.loadingService.dismiss();
    }
  }

  private async get(): Promise<void> {
    try {
      await this.loadingService.present();

      this.regulationsService.get().subscribe(result => this.regulations = result);

    } catch (error) {
      this.errorModalService.openModalError();
    } finally {
      this.loadingService.dismiss();
    }
  }

}
