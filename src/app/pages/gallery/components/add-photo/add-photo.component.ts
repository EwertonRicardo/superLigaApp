/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PhotosModel } from './../../../../models/photos.model';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { LoadingService } from './../../../../services/loading/loading.service';
import { GalleryService } from './../../../../services/gallery/gallery.service';
import { ToastService } from './../../../../services/toast/toast.service';
import { MessagesEnum } from 'src/app/enums/messages.enum';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss'],
})

export class AddPhotoComponent implements OnInit {
  photoForm: FormGroup;
  photo: PhotosModel;
  files;
  filesList;

  ngFireUploadTask: AngularFireUploadTask;

  progressNum: Observable<number>;

  progressSnapshot: Observable<any>;

  fileUploadedPath: Observable<string>;

  fileName: string;
  fileSize: number;

  private ngFirestoreCollection: AngularFirestoreCollection<PhotosModel>;
  constructor(
    private _formBuilder: FormBuilder,
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage,
    private galleryService: GalleryService,
    private toastService: ToastService,
    private loadingService: LoadingService,
  ) {

    this.ngFirestoreCollection = angularFirestore.collection<PhotosModel>('gallery');
   }

  ngOnInit() {
    this._createForm();
  }

  async fileUpload(event) {
    this.files =  event.target.files;
  }

  sendFiles() {
    const filesPath = [];
    const promises: AngularFireUploadTask[] = [];
    let counter = 0;
    return new Promise(resolve => {
    for (const file of this.files) {
        if (file.type.split('/')[0] !== 'image') {
          console.log('File type is not supported!');
          return;
        }
        this.fileName = file.name;
        const fileStoragePath = `filesStorage/${new Date().getTime()}_${file.name}`;
        const imageRef = this.angularFireStorage.ref(fileStoragePath);

        this.ngFireUploadTask = this.angularFireStorage.upload(fileStoragePath, file);
        this.progressNum = this.ngFireUploadTask.percentageChanges();
        this.ngFireUploadTask.snapshotChanges().pipe(
          finalize(() => {
            imageRef.getDownloadURL().subscribe((url) => {
              if(this.filesList){
                this.filesList.push(url);
              }else{
                filesPath.push(url);
              }
              counter++;
              if(counter === this.files.length){
                  resolve(filesPath);
              }
            });
          }),
          tap(snap => {
              this.fileSize = snap.totalBytes;
          })
        ).subscribe();
      }
    });
  }

  public async addPhoto(): Promise<void> {
    try {
      await this.loadingService.present();

      if(!this.files) {
        return this.toastService.showToast(MessagesEnum.requiredImage);
      }
      const files = await this.sendFiles();

      const request: PhotosModel = {
        title:  this.photoForm.get('title').value,
        description: this.photoForm.get('description').value,
        filespath:  files,
        publishedDate:  new Date().getTime()
      };

      await this.galleryService.create(request);
      this.photoForm.reset();
      await this.toastService.showToast(MessagesEnum.gallerySuccess, 'toast-success');
    } catch (error) {
      console.error(error);
    } finally {
      this.loadingService.dismiss();
    }
  }

  public async updateGallery(): Promise<void> {
    try {
      await this.loadingService.present();

      if(!this.files) {
        return this.toastService.showToast(MessagesEnum.requiredImage);
      }

      if(this.files){
        await this.sendFiles();
      }

      const request: PhotosModel = {
        title:  this.photoForm.get('title').value,
        description: this.photoForm.get('description').value,
        filespath:  this.filesList,
        publishedDate:  new Date().getTime()
      };
      await this.galleryService.update(request, this.photo.id);
      await this.toastService.showToast(MessagesEnum.galleryUpdated, 'toast-success');
    } catch (error) {
      console.error(error);
    } finally {
      this.loadingService.dismiss();
    }
  }

  public removeImageList(index: number) {
    this.filesList.splice(index,1);
  }

  private _createForm(): void {
    if (this.photo) {
      this.photoForm = this._formBuilder.group({
        title: [this.photo.title, Validators.required],
        description: [this.photo.description, Validators.required]
      });
      this.filesList = this.photo.filespath;
    } else {
      this.photoForm = this._formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required]
      });
    }
  }
}
