import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.page.html',
  styleUrls: ['./sponsors.page.scss'],
})
export class SponsorsPage implements OnInit {

  sponsors = [
    {
      url: '../../../assets/imgs/sponsors/usina.png',
    },
    // {
    //   url: '../../../assets/imgs/sponsors/liga.jpg',
    // },
    {
      url: '../../../assets/imgs/sponsors/volei-pe.jpg',
    },
    {
      url: '../../../assets/imgs/sponsors/secretaria-esportes.png',
    },
    {
      url: '../../../assets/imgs/sponsors/cref.png',
    },
    {
      url: '../../../assets/imgs/sponsors/marias-quadrado.png',
    },
    {
      url: '../../../assets/imgs/sponsors/asa-branca.png',
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
