import { Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';
import { Sort } from '../utils/sort';

@Directive({
  selector: '[appSort]'
})
export class SortDirective {
  @Input() appSort: Array<any>;
  constructor(
    private renderer: Renderer2,
    private targetElem: ElementRef
    ) { }

    @HostListener("click")
    sortData() {
      //Create Object of Sort Class
      const sort = new Sort();
      //Get Reference of current clicked element
      const elem = this.targetElem.nativeElement;
      //Get which oreder
      const order = elem.getAttribute("data-order");
      //get property type
      //NOTE: set [data-type=date] if is is date field (StockValues.json)
      const type = elem.getAttribute("data-type");
      const property = elem.getAttribute("data-name");
      if(order === "desc") {
        this.appSort.sort(sort.startSort(property, order, type));
        elem.setAttribute("data-order", "asc");
      } else {
        this.appSort.sort(sort.startSort(property, order, type));
        elem.setAttribute("data-order", "desc");
      }

    }

}
