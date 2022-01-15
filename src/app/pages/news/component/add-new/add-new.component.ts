import { NewsModel } from './../../../../models/news.model';
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss'],
})
export class AddNewComponent implements OnInit {

  newForm: FormGroup;

  constructor(
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
