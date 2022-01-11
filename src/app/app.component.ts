import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Notícias', url: '/news', icon: 'newspaper' },
    { title: 'Equipes', url: '/teams', icon: 'people' },
    { title: 'Jogos', url: '/games', icon: 'game-controller' },
    { title: 'Ranking', url: '/folder/Archived', icon: 'star' },
    { title: 'Galeria de fotos', url: '/folder/Trash', icon: 'images' },
    { title: 'Regulamento', url: '/folder/Spam', icon: 'document-text' },
    { title: 'Contato', url: '/contact', icon: 'call' },
    { title: 'Patrocianadores', url: '/sponsors', icon: 'warning' },
    { title: 'Sobre a liga', url: '/about', icon: 'information-circle' },
  ];
  constructor() {}
}
