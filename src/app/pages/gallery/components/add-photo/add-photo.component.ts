/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PhotosModel } from './../../../../models/photos.model';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';


export interface FILE {
  name: string;
  filepath: string;
  size: number;
}
@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss'],
})
export class AddPhotoComponent implements OnInit {
  photoForm: FormGroup;
  photo: PhotosModel;

  ngFireUploadTask: AngularFireUploadTask;

  progressNum: Observable<number>;

  progressSnapshot: Observable<any>;

  fileUploadedPath: Observable<string>;

  files: Observable<FILE[]>;

  fileName: string;
  fileSize: number;

  isImgUploading: boolean;
  isImgUploaded: boolean;

  private ngFirestoreCollection: AngularFirestoreCollection<FILE>;
  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage
  ) {
    this.isImgUploading = false;
    this.isImgUploaded = false;
    this.ngFirestoreCollection = angularFirestore.collection<FILE>('filesCollection');
    this.files = this.ngFirestoreCollection.valueChanges();
   }

  ngOnInit() {}

  fileUpload(event: FileList) {
      const file = event.item(0);

      if (file.type.split('/')[0] !== 'image') {
        console.log('File type is not supported!');
        return;
      }

      this.isImgUploading = true;
      this.isImgUploaded = false;

      this.fileName = file.name;

      const fileStoragePath = `filesStorage/${new Date().getTime()}_${file.name}`;

      const imageRef = this.angularFireStorage.ref(fileStoragePath);

      this.ngFireUploadTask = this.angularFireStorage.upload(fileStoragePath, file);

      this.progressNum = this.ngFireUploadTask.percentageChanges();
      this.progressSnapshot = this.ngFireUploadTask.snapshotChanges().pipe(
        finalize(() => {
          this.fileUploadedPath = imageRef.getDownloadURL();
          this.fileUploadedPath.subscribe(resp=>{
            this.fileStorage({
              name: file.name,
              filepath: resp,
              size: this.fileSize
            });
            this.isImgUploading = false;
            this.isImgUploaded = true;
          },error => {
            console.log(error);
          });
        }),
        tap(snap => {
            this.fileSize = snap.totalBytes;
        })
      );
  }


  fileStorage(image: FILE) {
      const imgId = this.angularFirestore.createId();
      this.ngFirestoreCollection.doc(imgId).set(image).then(data => {
        console.log(data);
      }).catch(error => {
        console.log(error);
      });
  }
}
