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
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this._createForm();
  }

  public async addNote(): Promise<void> {
    try {
      const request: NewsModel = {
        title: this.newForm.get('title').value,
        description: this.newForm.get('description').value,
        publishedDate: new Date().getTime()
      };
      console.log(request);

      this.newsService.create(request)
      .then(() => {
        console.log('salvo');
      }).catch((err) => {
        console.log(err);
      });

    } catch (error) {
      console.error(error);
    }
  }
  private _createForm(): void {
    this.newForm = this._formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

}
