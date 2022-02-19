import { ErrorModalService } from './../../services/error-modal/error-modal.service';
import { RankingModel } from './../../models/ranking.model';
import { RankingService } from './../../services/ranking/ranking.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { FileManagerService } from 'src/app/services/file-manager/file-manager.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MessagesEnum } from 'src/app/enums/messages.enum';
import { AddRankingComponent } from './component/add-ranking/add-ranking.component';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {

  ranking: RankingModel[];
  isAdmin = environment.isAdmin;
  constructor(
    private rankingService: RankingService,
    private modalCtrl: ModalController,
    private toastService: ToastService,
    private loadingService: LoadingService,
    private fileManager: FileManagerService,
    private angularFireStorage: AngularFireStorage,
    private errorModalService: ErrorModalService
  ) { }

  async ngOnInit() {
    await this.getRanking();
  }

  public async openAddRankingModal(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AddRankingComponent,
    });
    await modal.present();
  }

  public async deleteRanking(ranking: RankingModel): Promise<void> {
    try {
      await this.loadingService.present();

      if(ranking.filepath){
        this.angularFireStorage.storage.refFromURL(ranking.filepath).delete();
      }

      await this.rankingService.deleteRanking(ranking.id);
      await this.toastService.showToast(MessagesEnum.rankingDeleted, 'toast-success');
    } catch (error) {
      this.toastService.showToast(error);
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

  private async getRanking(): Promise<void> {
    try {
      await this.loadingService.present();

      this.rankingService.getRanking().subscribe(result => this.ranking = result);

    } catch (error) {
      this.errorModalService.openModalError();
    } finally {
      this.loadingService.dismiss();
    }
  }
}
