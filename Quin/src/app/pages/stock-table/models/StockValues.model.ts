export class StockValues {
    public stock_id: number;
    public date: string;
    public value: number

    constructor() {
        this.stock_id = 0;
        this.date = '';
        this.value = 0;
    }
}

export class StockValuesTable {
    public StockName: string;
    public Date: string;
    public Value: number;

    constructor() {
        this.StockName = '';
        this.Date = '';
        this.Value = 0;
    }
}