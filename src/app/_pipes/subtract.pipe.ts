import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'subtract',
  pure: false
})

export class SubtractPipe implements PipeTransform {

  transform(value: number, subtractFrom: number): string {

    const currencyPipe = new CurrencyPipe('en-US');

    if (value) {

      let remainder = (subtractFrom - value);

      let formatted = currencyPipe.transform(remainder.toFixed(2), 'GBP', true);

      return formatted;

    }

  }

}
