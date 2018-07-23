import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'formatDate',
  pure: false
})

export class FormatDatePipe implements PipeTransform {

  endsWithString(number, ending) {

    return number.endsWith(ending);

  }

  transform(value: string, args: any[] = null): any {

    const datePipe = new DatePipe('en-US');

    if (value) {

      let standardDate = datePipe.transform(value, 'd MMMM y');
      let dayOfMonth = standardDate.substring(0, standardDate.indexOf(' '));
      let dateWithoutDay = standardDate.substring(standardDate.indexOf(' ') + 1, standardDate.length);
      let ordinal;

      switch (true) {

        case this.endsWithString(dayOfMonth, '11'):
        case this.endsWithString(dayOfMonth, '12'):
        case this.endsWithString(dayOfMonth, '13'):
          ordinal = 'th';
          break;

        case this.endsWithString(dayOfMonth, '1'):
          ordinal = 'st';
          break;

        case this.endsWithString(dayOfMonth, '2'):
          ordinal = 'nd';
          break;

        case this.endsWithString(dayOfMonth, '3'):
          ordinal = 'rd';
          break;

        default:
          ordinal = 'th';
          break;

      }

      dayOfMonth += ordinal + ' ';

      return dayOfMonth += dateWithoutDay;

    }

  }

}
