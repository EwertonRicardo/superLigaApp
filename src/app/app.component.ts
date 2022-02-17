import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Início', url: '/home', icon: 'home'},
    { title: 'Notícias', url: '/news', icon: 'newspaper' },
    { title: 'Equipes', url: '/teams', icon: 'people',image: '../assets/icon/group.png'},
    { title: 'Jogos', url: '/games', icon: 'game-controller', image: '../assets/icon/person-playing-volleyball.png' },
    { title: 'Tabela de Jogos', url: '/table-games', icon: 'game-controller',image: '../assets/icon/volleyball.png' },
    { title: 'Ranking', url: '/ranking', icon: 'star',image: '../assets/icon/ranking.png' },
    { title: 'Galeria de fotos', url: '/gallery', icon: 'images' },
    { title: 'Documentos', url: '/regulations', icon: 'document-text' },
    { title: 'Contato', url: '/contact', icon: 'call' },
    { title: 'Patrocianadores e Parceiros', url: '/sponsors', icon: 'warning',image: '../assets/icon/handshake.png'},
    { title: 'Sobre a liga', url: '/about', icon: 'information-circle' },
  ];
  constructor() {}
}
