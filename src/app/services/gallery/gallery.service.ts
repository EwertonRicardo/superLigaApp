import { MessagesEnum } from './../../enums/messages.enum';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotosModel } from './../../models/photos.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(
    private ngFirestore: AngularFirestore
  ) { }

  getPhotos(): Observable<PhotosModel[]> {
    try {
      const photosResponse = this.ngFirestore.collection('gallery').snapshotChanges()
      .pipe(
        map(
          (data) => data.map(d => ({
            id: d.payload.doc.id,
            ...d.payload.doc.data() as PhotosModel
          }))
        )
      );
      return photosResponse;
    } catch (error) {
      throw error;
    }
  }

  async create(photo: PhotosModel): Promise<void> {
    try {
      await this.ngFirestore.collection('gallery').add(photo);
    } catch (error) {
      throw MessagesEnum.genericMessage;
    }
  }

  async update(gallery: PhotosModel, galleryId: string): Promise<void> {
    try {
      await this.ngFirestore.collection('gallery').doc(galleryId).update(
        {
          title: gallery.title,
          description: gallery.description,
          filespath: gallery.filespath,
          publishedDate: gallery.publishedDate
        }
      );
    } catch (error) {
      throw MessagesEnum.genericMessage;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.ngFirestore.doc('gallery/' + id).delete();
    } catch (error) {
      throw MessagesEnum.genericMessage;
    }
  }
}
