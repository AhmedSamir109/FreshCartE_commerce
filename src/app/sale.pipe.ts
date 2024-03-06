import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sale'
})
export class SalePipe implements PipeTransform {

  transform(name:string): unknown {
    return `sale ${ name}`;
  }

}
