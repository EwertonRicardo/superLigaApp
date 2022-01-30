import { AddPhotoComponent } from './components/add-photo/add-photo.component';
import { Component, OnInit } from '@angular/core';
import { GalleryService } from './../../services/gallery/gallery.service';
import { LoadingService } from './../../services/loading/loading.service';
import { ToastService } from './../../services/toast/toast.service';
import { MessagesEnum } from 'src/app/enums/messages.enum';
import { PhotosModel } from './../../models/photos.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    loop: true,
  };
  photos: PhotosModel[];
  constructor(
    private galleryService: GalleryService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private modalCtrl: ModalController
  ) {}

  async ngOnInit() {
    await this.getPhotos();
  }

  public async openAddPhotoModal(photo?: PhotosModel): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AddPhotoComponent,
      componentProps: { photo }
    });
    await modal.present();
  }

  public async deleteGallery(gallery: string): Promise<void> {
    try {
      await this.loadingService.present();

      await this.galleryService.delete(gallery);
      await this.toastService.showToast(MessagesEnum.galleryDeleted, 'toast-success');
    } catch (error) {
      console.error(error);
    } finally {
      this.loadingService.dismiss();
    }
  }

  private async getPhotos(): Promise<void> {
    try {
      await this.loadingService.present();

      this.galleryService.getPhotos().subscribe(result => this.photos = result);

    } catch (error) {
      console.error(error);
    } finally {
      this.loadingService.dismiss();
    }
  }

}
