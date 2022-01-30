import { Component, OnInit } from '@angular/core';

import { femaleTeam, maleTeams } from './teams.data';
@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss'],
})
export class AddTeamComponent implements OnInit {

  fameleTeams = femaleTeam;
  maleTeams = maleTeams;
  constructor() { }

  ngOnInit() {}

}
