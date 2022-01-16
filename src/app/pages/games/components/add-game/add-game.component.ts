/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss'],
})
export class AddGameComponent implements OnInit {

  gameForm: FormGroup;
  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this._createForm();
  }

  public async addGame(): Promise<void> {
    try {
      console.log(this.gameForm.value);
    } catch (error) {
      console.error(error);
    }
  }
  private _createForm(): void {
    this.gameForm = this._formBuilder.group({
      gameNumber: ['', Validators.required],
      fisrtTeam: ['', Validators.required],
      secondTeam: ['', Validators.required],
      gameDate: ['', Validators.required],
    });
  }

}
