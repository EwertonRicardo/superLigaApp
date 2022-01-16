import { LoadingService } from './../../../../services/loading/loading.service';
import { NewsModel } from './../../../../models/news.model';
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsService } from './../../../../services/news/news.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss'],
})

export class AddNewComponent implements OnInit {

  newForm: FormGroup;

  constructor(
    private newsService: NewsService,
    private _formBuilder: FormBuilder,
    private loadingService: LoadingService
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
    } catch (error) {
      console.error(error);
    } finally {
      this.loadingService.dismiss();
    }
  }

  private _createForm(): void {
    this.newForm = this._formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

}
