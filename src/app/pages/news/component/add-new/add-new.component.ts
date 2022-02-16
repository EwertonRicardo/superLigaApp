import { ToastService } from './../../../../services/toast/toast.service';
import { LoadingService } from './../../../../services/loading/loading.service';
import { NewsModel } from './../../../../models/news.model';
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsService } from './../../../../services/news/news.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MessagesEnum } from 'src/app/enums/messages.enum';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss'],
})

export class AddNewComponent implements OnInit {

  newForm: FormGroup;
  files;
  file;
  news: NewsModel;

  ngFireUploadTask: AngularFireUploadTask;

  progressNum: Observable<number>;

  progressSnapshot: Observable<any>;

  fileUploadedPath: Observable<string>;

  fileName: string;
  fileSize: number;

  isImgUploading: boolean;
  isImgUploaded: boolean;
  private ngFirestoreCollection: AngularFirestoreCollection<NewsModel>;
  constructor(
    private newsService: NewsService,
    private _formBuilder: FormBuilder,
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private fileChooser: Chooser,
  ) {
    this.isImgUploading = false;
    this.isImgUploaded = false;
    this.ngFirestoreCollection = angularFirestore.collection<NewsModel>('news');
  }

  ngOnInit() {
    this._createForm();
  }

  sendFiles() {

    return new Promise(resolve => {
      // if (this.files.type.split('/') !== 'image') {
      //   console.log('File type is not supported!');
      //   return;
      // }
      this.isImgUploading = true;
      this.isImgUploaded = false;
      this.fileName = this.files.name;
      const fileStoragePath = `news/${new Date().getTime()}_${this.files.name}`;
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

  public async addNote(): Promise<void> {
    try {
      await this.loadingService.present();

      if(!this.file) {
        return this.toastService.showToast(MessagesEnum.requiredImage, 'toast-error');
      }
      const file = await this.sendFiles();
      const request: NewsModel = {
        title: this.newForm.get('title').value,
        filespath: file,
        description: this.newForm.get('description').value,
        publishedDate: new Date().getTime()
      };

      await this.newsService.create(request);
      this.newForm.reset();
      await this.toastService.showToast(MessagesEnum.newsAdded, 'toast-success');
    } catch (error) {
      console.error(error);
    } finally {
      this.loadingService.dismiss();
    }
  }

  public async editNew(): Promise<void> {
    try {
      await this.loadingService.present();
      if(!this.file) {
        return this.toastService.showToast(MessagesEnum.requiredImage, 'toast-error');
      }
      let file = this.file;
      if (this.files) {
        if (this.file) {
          this.angularFireStorage.storage.refFromURL(this.file).delete();
        }
        file = await this.sendFiles();
      }
      const request: NewsModel = {
        title: this.newForm.get('title').value,
        filespath: file,
        description: this.newForm.get('description').value,
        publishedDate: new Date().getTime()
      };

      await this.newsService.updateNew(request, this.news.id);
      this.file = null;
      await this.toastService.showToast(MessagesEnum.newsUpdated, 'toast-success');
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

  public deleteFile(): void {
    this.file = null;
  }
  private _createForm(): void {

    if (this.news) {
      this.newForm = this._formBuilder.group({
        title: [this.news.title, Validators.required],
        description: [this.news.description, Validators.required],
      });
      this.file = this.news.filespath;
    } else {
      this.newForm = this._formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
      });
    }

  }

}
