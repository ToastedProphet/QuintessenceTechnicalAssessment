import { TestBed } from '@angular/core/testing';

import { StockTableServiceService } from './stock-table-service.service';

describe('StockTableServiceService', () => {
  let service: StockTableServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockTableServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
