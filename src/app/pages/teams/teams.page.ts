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
  teams = [
    {
      name: 'Seleção recife de volley',
      isShow: false,
      players: [
        'Ewerton', 'Ricardo santos', 'Santos'
      ]
    },
    {
      name: 'Seleção teste',
      isShow: false,
      players: [
        'Ewerton', 'Ricardo', 'Santos'
      ]
    },
    {
      name: 'Seleção testando',
      isShow: false,
      players: [
        'Ewerton', 'Ricardo', 'Santos'
      ]
    }
  ];
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
