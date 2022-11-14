import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { StockTableServiceService } from '../stock-table-service.service';
import { Stocks } from './models/Stocks.model';
import { StockValues, StockValuesTable } from './models/StockValues.model';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.scss']
})
export class StockTableComponent implements OnInit {

  //populate on load and will be used to filter the tables
  //This will not change
  mStocks: Stocks[] = [];
  mStockValues: StockValues[] = [];

  //used for the tables
  mStocksTable: Stocks[] = [];
  mStockValuesTable: StockValuesTable[] = [];

  //will be used to get the corresponding stock values
  mSelectedStock: Stocks;

  //Search filter
  mSearchString: string = '';
  mStockValuesHeader = '';

  stockIsDesc: boolean = false;
  stockColumn: string = "";

  stockValuesIsDesc: boolean = false;
  stockValuesColumn: string = "";

  mStockTableClicked: boolean = false;

  constructor(
    private stockService: StockTableServiceService
  ) { }

  ngOnInit(): void {
    //Load Stock and Stock Values once on load for speed purposes
    this.getStockList();
    this.getStockValueList();
  }

  getStockList() {
    this.stockService.getStocks().subscribe((result: Stocks[]) => {
      this.mStocks = result;
      this.mStocksTable = result;
    });
  }

  getStockValueList() {
    this.stockService.getStockValues().subscribe((result: StockValues[]) => {
      this.mStockValues = result;
    });
  }

  onSelectClick(pStock: Stocks) {
    if(this.mStockValuesHeader === pStock.stock) {
      this.mStockValuesTable = [];
      this.mStockValuesHeader = '';
      this.mStockTableClicked = false;
      this.mSelectedStock = new Stocks;
      return;
    }
    this.mStockTableClicked = true;
    this.mStockValuesHeader = pStock.stock
    this.mStockValuesTable = [];
    this.mSelectedStock = pStock;
    if (this.mStockValues && this.mStockValues.length > 0) {
      for (const SV of this.mStockValues) {
        if (SV.stock_id === pStock.id) {
          let item = {} as StockValuesTable;
          item.StockName = pStock.stock;
          item.Date = SV.date;
          item.Value = SV.value;
          this.mStockValuesTable.push(item);
        }
      }
    }
  }
  onStockSearch() {
    const tableData: Stocks[] = [];
    for (const S of this.mStocks) {
      if (this.mSearchString !== '') {
        if (!S.stock.toLocaleUpperCase().includes(this.mSearchString.toLocaleUpperCase())) {
          S.Visible = false;
          continue
        }
      }
      S.Visible = true;
      tableData.push(S);
    }
    this.mStocksTable = tableData;
  }
  OrderStockBy(property) {
    this.stockIsDesc = !this.stockIsDesc;
    this.stockColumn = property;
  }

  OrderStockValuesBy(property) {
    this.stockValuesIsDesc = !this.stockValuesIsDesc;
    this.stockValuesColumn = property;
  }
  downloadJson() {
    this.prepData().subscribe((res) => {
      this.downloadJsonByHtmlTag({
        fileName: this.mStockValuesHeader + ' StockValues.json',
        text: JSON.stringify(res)
      });
    });
  }

  private setting = {
    jsonElement: {
      download: null as unknown as HTMLElement
    }
  }

  downloadJsonByHtmlTag(arg: {
    fileName: string,
    text: string
  }) {
    if (!this.setting.jsonElement.download) {
      this.setting.jsonElement.download = document.createElement('a');
    }
    const element = this.setting.jsonElement.download;
    const fileType = arg.fileName.indexOf('.json');
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    var event = new MouseEvent("click");
    element.dispatchEvent(event);
  }

  prepData() {
    return of(this.mStockValuesTable);
  }
}
