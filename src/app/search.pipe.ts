import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './interface/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products:Product[] , searchWord:string) {
    return products.filter( (product) => product.title.toLowerCase().includes(searchWord));
  }

}
