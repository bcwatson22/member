import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})

export class SearchPipe implements PipeTransform {

  transform(items: any, searchText: any): any {

    if (searchText == null) return items;

    return items.filter(function(item) {

      return JSON.stringify(item).toLowerCase().indexOf(searchText.toLowerCase()) > -1

    });

  }

}
