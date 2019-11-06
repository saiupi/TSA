import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchText'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
