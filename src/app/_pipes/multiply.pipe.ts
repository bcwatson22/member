import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'multiply',
  pure: false
})

export class MultiplyPipe implements PipeTransform {

  transform(value: number, divideBy: number, timesBy: number): string {

    const currencyPipe = new CurrencyPipe('en-US');

    if (value) {

      let vat = (value / divideBy) * timesBy;

      let rounded = Math.round((vat + 0.00001) * 100) / 100;

      let formatted = currencyPipe.transform(rounded.toFixed(2), 'GBP', true);

      return formatted;

    }

  }

}
