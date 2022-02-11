/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { RegulationsModel } from './../../../../models/regulations.model';
import { ToastService } from './../../../../services/toast/toast.service';
import { RegulationsService } from './../../../../services/regulations/regulations.service';
import { LoadingService } from './../../../../services/loading/loading.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { MessagesEnum } from 'src/app/enums/messages.enum';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';

@Component({
  selector: 'app-add-regulation',
  templateUrl: './add-regulation.component.html',
  styleUrls: ['./add-regulation.component.scss'],
})
export class AddRegulationComponent implements OnInit {
  regulationForm: FormGroup;
  regulation: RegulationsModel;
  files;

  ngFireUploadTask: AngularFireUploadTask;

  progressNum: Observable<number>;

  progressSnapshot: Observable<any>;

  fileUploadedPath: Observable<string>;

  fileName: string;
  fileSize: number;

  isImgUploading: boolean;
  isImgUploaded: boolean;

  private ngFirestoreCollection: AngularFirestoreCollection<RegulationsModel>;

  constructor(
    private regulationsService: RegulationsService,
    private _formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage,
    private fileChooser: Chooser,
  ) {
    this.isImgUploading = false;
    this.isImgUploaded = false;
    this.ngFirestoreCollection = angularFirestore.collection<RegulationsModel>('regulations');
  }

  ngOnInit() {
    this._createForm();
  }

  public async add(): Promise<void> {
    try {
      await this.loadingService.present();

      const file = await this.sendFiles();
      const request: RegulationsModel = {
        title: this.regulationForm.get('title').value,
        filepath: file,
        publishedDate: new Date().getTime()
      };

      await this.regulationsService.create(request);
      this.regulationForm.reset();
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
      this.isImgUploading = true;
      this.isImgUploaded = false;
      this.fileName = this.files.name;
      const fileStoragePath = `regulations/${new Date().getTime()}_${this.files.name}`;
      const imageRef = this.angularFireStorage.ref(fileStoragePath);

      this.ngFireUploadTask = this.angularFireStorage.upload(fileStoragePath, this.files.data);
      this.progressNum = this.ngFireUploadTask.percentageChanges();
      this.ngFireUploadTask.snapshotChanges().pipe(
        finalize(() => {
          imageRef.getDownloadURL().subscribe((url) => {
            resolve(url);

          });
        }),
        tap(snap => {
          this.fileSize = snap.totalBytes;
        })
      ).subscribe();
    });
  }

  private _createForm(): void {

    if (this.regulation) {
      this.regulationForm = this._formBuilder.group({
        title: [this.regulation.title, Validators.required],
      });
    } else {
      this.regulationForm = this._formBuilder.group({
        title: ['', Validators.required],
      });
    }

  }

}
