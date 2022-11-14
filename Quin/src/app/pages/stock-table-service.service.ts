import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stocks } from './stock-table/models/Stocks.model';
import { StockValues } from './stock-table/models/StockValues.model';

@Injectable({
  providedIn: 'root'
})
export class StockTableServiceService {

  readonly APIUrl = "https://localhost:7058/api";

  constructor(
    private http: HttpClient
  ) { }

  getStocks() : Observable<Stocks[]> {
    return this.http.get<Stocks[]>(this.APIUrl+'/Stock/GetStocks')
  }

  getStockValues() : Observable<StockValues[]> {
    return this.http.get<StockValues[]>(this.APIUrl+'/Stock/GetStockValues')
  }
}
