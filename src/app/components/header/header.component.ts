import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input()
  title = '';

  @Input()
  hasNoBorder = false;

  @Input()
  hasMenu = true;

  @Input()
  hasCloseOption = false;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  public closeModal(): void {
    this.modalCtrl.dismiss();
  }

}
