import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TableGamesPage } from './table-games.page';

const routes: Routes = [
  {
    path: '',
    component: TableGamesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableGamesPageRoutingModule {}
