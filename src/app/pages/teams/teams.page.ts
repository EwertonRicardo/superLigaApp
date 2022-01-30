import { AddTeamComponent } from './components/add-team/add-team.component';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {

  teamGender = 'male';

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  public async openAddTeamModal(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AddTeamComponent,
    });
    await modal.present();
  }

}
