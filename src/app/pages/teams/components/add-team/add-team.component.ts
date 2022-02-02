import { TeamsModel } from './../../../../models/teams.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { femaleTeams, maleTeams, allTeams } from './teams.data';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TeamImage } from 'src/app/models/teams.model';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss'],
})
export class AddTeamComponent implements OnInit {

  fTeams = femaleTeams;
  mTeams = maleTeams;
  allTeamsArr = allTeams();
  teamForm: FormGroup;
  team: TeamsModel;

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  public async addTeam(): Promise<void> {
    try {
      await this.loadingService.present();

      const request: TeamsModel = {
        imageId: 1,
        gender: this.teamForm.get('gender').value,
        teamName: this.teamForm.get('teamName').value,
        state: this.teamForm.get('state').value
      };

      console.log(request);
    } catch (error) {
      this.toastService.showToast(error);
    } finally {
      this.loadingService.dismiss();
    }
  }

  public selectedImage(teamImage: TeamImage): void {
    console.log(teamImage);
    if(this.team?.imageId === teamImage.id) {
      teamImage.isSelected = !teamImage.isSelected;
    } else {
      // must be finished
      teamImage.isSelected = !teamImage.isSelected;
    } 
  }

  private createForm(): void {
    this.teamForm = this.formBuilder.group({
      teamName: ['', Validators.required],
      state: ['', Validators.required],
      gender: ['', Validators.required],
      imageId: [null, Validators.required],
    });
  }

}
