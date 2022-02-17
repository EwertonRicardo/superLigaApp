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
import { finalize } from 'rxjs/operators';
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
  fileUploadedPath: Observable<string>;

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

    this.ngFirestoreCollection = angularFirestore.collection<RegulationsModel>('regulations');
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
      const request: RegulationsModel = {
        title: this.regulationForm.get('title').value,
        filepath: file,
        publishedDate: new Date().getTime()
      };

      await this.regulationsService.create(request);
      this.regulationForm.reset();
      this.files = null;
      await this.toastService.showToast(MessagesEnum.regulationAdded, 'toast-success');
    } catch (error) {
      this.toastService.showToast(MessagesEnum.genericMessage);
    } finally {
      this.loadingService.dismiss();
    }
  }

  public async getFile(): Promise<void> {
    try {
      await this.loadingService.present();
      this.files = await this.fileChooser.getFile();
    } catch (error) {
      this.toastService.showToast(MessagesEnum.genericMessage);
    } finally {
      this.loadingService.dismiss();
    }
  }

  public removeImage(): void {
    this.files = null;
  }

  private async sendFiles(): Promise<string> {
    return new Promise(resolve => {
      const fileStoragePath = `regulations/${new Date().getTime()}_${this.files.name}`;
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

    this.regulationForm = this._formBuilder.group({
      title: ['', Validators.required],
    });
  }

}
