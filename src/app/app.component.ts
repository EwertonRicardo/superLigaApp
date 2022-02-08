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
    { title: 'Ranking', url: '/ranking', icon: 'star' },
    { title: 'Galeria de fotos', url: '/gallery', icon: 'images' },
    { title: 'Documentos', url: '/regulations', icon: 'document-text' },
    { title: 'Contato', url: '/contact', icon: 'call' },
    { title: 'Patrocianadores e Parceiros', url: '/sponsors', icon: 'warning' },
    { title: 'Sobre a liga', url: '/about', icon: 'information-circle' },
  ];
  constructor() {}
}
