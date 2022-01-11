import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

}
