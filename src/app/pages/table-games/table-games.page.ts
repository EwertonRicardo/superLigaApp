import { FileManagerService } from './../../services/file-manager/file-manager.service';
import { LoadingService } from './../../services/loading/loading.service';
import { TableGameModel } from './../../models/tableGame.model';
import { AddComponent } from './component/add/add.component';
import { TableGamesService } from './../../services/table-games/table-games.service';
import { ToastService } from './../../services/toast/toast.service';
import { MessagesEnum } from 'src/app/enums/messages.enum';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-table-games',
  templateUrl: './table-games.page.html',
  styleUrls: ['./table-games.page.scss'],
})
export class TableGamesPage implements OnInit {

  tables: TableGameModel[];
  constructor(
    private tableGamesService: TableGamesService,
    private modalCtrl: ModalController,
    private toastService: ToastService,
    private loadingService: LoadingService,
    private fileManager: FileManagerService,
    private angularFireStorage: AngularFireStorage,
    ) { }

  async ngOnInit() {
    await this.getTableGame();
  }

  public async openAddDetailModal(regulation?: TableGameModel): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AddComponent,
      componentProps: { regulation }
    });
    await modal.present();
  }

  public async deleteTableGame(table: TableGameModel): Promise<void> {
    try {
      await this.loadingService.present();

      if(table.filepath){
        this.angularFireStorage.storage.refFromURL(table.filepath).delete();
      }

      await this.tableGamesService.delete(table.id);
      await this.toastService.showToast(MessagesEnum.regulationDeleted, 'toast-success');
    } catch (error) {
      console.error(error);
    } finally {
      this.loadingService.dismiss();
    }
  }

  public async downloadFile(url: string): Promise<void> {
    try {
      await this.loadingService.present();
      await this.fileManager.downloadFile(url);
    } catch (error) {
      console.error(error);
    } finally {
      this.loadingService.dismiss();
    }
  }

  private async getTableGame(): Promise<void> {
    try {
      await this.loadingService.present();

      this.tableGamesService.get().subscribe(result => this.tables = result);

    } catch (error) {
      console.error(error);
    } finally {
      this.loadingService.dismiss();
    }
  }

}
