import { Component, OnInit } from '@angular/core';
import { GalleryService } from './../../services/gallery/gallery.service';
import { LoadingService } from './../../services/loading/loading.service';
import { PhotosModel } from './../../models/photos.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {
  photos: PhotosModel[];
  constructor(
    private galleryService: GalleryService,
    private loadingService: LoadingService
  ) {}

  async ngOnInit() {
    await this.getPhotos();
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
