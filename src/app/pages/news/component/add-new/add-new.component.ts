import { ToastService } from './../../../../services/toast/toast.service';
import { LoadingService } from './../../../../services/loading/loading.service';
import { NewsModel } from './../../../../models/news.model';
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsService } from './../../../../services/news/news.service';
import { MessagesEnum } from 'src/app/enums/messages.enum';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss'],
})

export class AddNewComponent implements OnInit {

  newForm: FormGroup;
  news: NewsModel;
  constructor(
    private newsService: NewsService,
    private _formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this._createForm();
  }

  public async addNote(): Promise<void> {
    try {
      await this.loadingService.present();

      const request: NewsModel = {
        title: this.newForm.get('title').value,
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

      await this.newsService.updateNew(this.newForm.value, this.news.id);
      this.newForm.reset();
      await this.toastService.showToast(MessagesEnum.newsUpdated, 'toast-success');
    } catch (error) {
      console.error(error);
    } finally {
      this.loadingService.dismiss();
    }
  }
  private _createForm(): void {

    if (this.news) {
      this.newForm = this._formBuilder.group({
        title: [this.news.title, Validators.required],
        description: [this.news.description, Validators.required],
      });
    } else {
      this.newForm = this._formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
      });
    }

  }

}
