import { TeamsService } from './../../services/teams/teams.service';
import { TeamsModel } from './../../models/teams.model';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {

  teamGender = 'male';
  teamsMale: TeamsModel[];
  teamsFemale: TeamsModel[];
  constructor(
    private loadingService: LoadingService,
    private teamsService: TeamsService
  ) { }

  async ngOnInit() {
    await this.getTeams();
  }

  private async getTeams(): Promise<void> {
    try {
      await this.loadingService.present();
      this.teamsService.getTeams().subscribe(teams => {
        this.teamsFemale = teams.filter(({gender}) => gender === 'female');
        this.teamsMale = teams.filter(({gender}) => gender === 'male');
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.loadingService.dismiss();
    }
  }

}
