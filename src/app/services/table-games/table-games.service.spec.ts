import { TestBed } from '@angular/core/testing';

import { TableGamesService } from './table-games.service';

describe('TableGamesService', () => {
  let service: TableGamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableGamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
