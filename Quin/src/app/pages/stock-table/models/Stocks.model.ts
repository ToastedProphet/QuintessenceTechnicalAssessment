export class Stocks {
    public id: number;
    public stock: string;
    public industry: string;
    public sector: string;
    public currency_code: string;
    public Selected: boolean;
    public Visible: boolean;

    constructor(){
        this.id = 0;
        this.stock = '';
        this.industry = '';
        this.sector = '';
        this.currency_code = '';
        this.Selected = false;
        this.Visible = true;
    }
}