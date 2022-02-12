import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chooser, ChooserResult } from '@awesome-cordova-plugins/chooser/ngx';
import { Observable } from 'rxjs';
import { MessagesEnum } from 'src/app/enums/messages.enum';
import { RankingModel } from 'src/app/models/ranking.model';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { RankingService } from 'src/app/services/ranking/ranking.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { finalize } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-add-ranking',
  templateUrl: './add-ranking.component.html',
  styleUrls: ['./add-ranking.component.scss'],
})
export class AddRankingComponent implements OnInit {

  rankingForm: FormGroup;
  file: ChooserResult;
  ngFireUploadTask: AngularFireUploadTask;
  fileUploadedPath: Observable<string>;
  private ngFirestoreCollection: AngularFirestoreCollection<RankingModel>;
  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private fileChooser: Chooser,
    private toastService: ToastService,
    private rankingService: RankingService,
    private angularFireStorage: AngularFireStorage,
    private angularFirestore: AngularFirestore,
  ) {
    this.ngFirestoreCollection = angularFirestore.collection<RankingModel>('ranking');
  }

  ngOnInit() {
    this.createForm();
   }

  public removeImage(): void {
    this.file = null;
  }

  public async getFile(): Promise<void> {
    try {
      await this.loadingService.present();
      this.file = await this.fileChooser.getFile();
    } catch (error) {
      this.toastService.showToast(error);
    } finally {
      this.loadingService.dismiss();
    }
  }

  public async addRanking(): Promise<void> {
    try {
      await this.loadingService.present();

      if(!this.file) {
        return this.toastService.showToast(MessagesEnum.requiredDocumentation);
      }

      const file = await this.sendFiles();
      const request: RankingModel = {
        title: this.rankingForm.get('title').value,
        filepath: file,
        publishedDate: new Date().getTime()
      };

      await this.rankingService.createRanking(request);
      this.rankingForm.reset();
      await this.toastService.showToast(MessagesEnum.rankingAdded, 'toast-success');
    } catch (error) {
      console.error(error);
    } finally {
      this.loadingService.dismiss();
    }
  }

  private async sendFiles(): Promise<string> {
    return new Promise(resolve => {
      const fileStoragePath = `ranking/${new Date().getTime()}_${this.file.name}`;
      const imageRef = this.angularFireStorage.ref(fileStoragePath);
      this.ngFireUploadTask = this.angularFireStorage.upload(fileStoragePath, this.file.data);
      this.ngFireUploadTask.snapshotChanges().pipe(
        finalize(() => {
          imageRef.getDownloadURL().subscribe((url) => {
            resolve(url);

          });
        }),
      ).subscribe();
    });
  }

  private createForm(): void {

    this.rankingForm = this.formBuilder.group({
      title: ['', Validators.required],
    });

  }

}
