import { NewsModel } from './../../../../models/news.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-detail',
  templateUrl: './new-detail.component.html',
  styleUrls: ['./new-detail.component.scss'],
})
export class NewDetailComponent implements OnInit {

  newDetail: NewsModel;
  constructor( ) { }

  ngOnInit() {}

}
