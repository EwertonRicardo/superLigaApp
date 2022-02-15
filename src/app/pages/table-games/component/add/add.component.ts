/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { TableGameModel } from './../../../../models/tableGame.model';
import { ToastService } from './../../../../services/toast/toast.service';
import { TableGamesService } from './../../../../services/table-games/table-games.service';
import { LoadingService } from './../../../../services/loading/loading.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MessagesEnum } from 'src/app/enums/messages.enum';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {

  tablesForm: FormGroup;
  table: TableGameModel;
  files;

  ngFireUploadTask: AngularFireUploadTask;
  fileUploadedPath: Observable<string>;

  private ngFirestoreCollection: AngularFirestoreCollection<TableGameModel>;

  constructor(
    private tableGamesService: TableGamesService,
    private _formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage,
    private fileChooser: Chooser,
  ) {

    this.ngFirestoreCollection = angularFirestore.collection<TableGameModel>('table-games');
  }

  ngOnInit() {
    this._createForm();
  }

  public async add(): Promise<void> {
    try {
      await this.loadingService.present();

      if(!this.files) {
        return this.toastService.showToast(MessagesEnum.requiredDocumentation);
      }
      const file = await this.sendFiles();
      const request: TableGameModel = {
        title: this.tablesForm.get('title').value,
        filepath: file,
        publishedDate: new Date().getTime()
      };

      await this.tableGamesService.create(request);
      this.tablesForm.reset();
      await this.toastService.showToast(MessagesEnum.regulationAdded, 'toast-success');
    } catch (error) {
      console.error(error);
    } finally {
      this.loadingService.dismiss();
    }
  }

  public async getFile(): Promise<void> {
    try {
      await this.loadingService.present();
      this.files = await this.fileChooser.getFile();
    } catch (error) {
      this.toastService.showToast(error);
    } finally {
      this.loadingService.dismiss();
    }
  }

  public removeImage(): void {
    this.files = null;
  }

  private async sendFiles(): Promise<string> {
    return new Promise(resolve => {
      const fileStoragePath = `tables-games/${new Date().getTime()}_${this.files.name}`;
      const imageRef = this.angularFireStorage.ref(fileStoragePath);
      this.ngFireUploadTask = this.angularFireStorage.upload(fileStoragePath, this.files.data);
      this.ngFireUploadTask.snapshotChanges().pipe(
        finalize(() => {
          imageRef.getDownloadURL().subscribe((url) => {
            resolve(url);

          });
        }),
      ).subscribe();
    });
  }

  private _createForm(): void {

    this.tablesForm = this._formBuilder.group({
      title: ['', Validators.required],
    });
  }

}
