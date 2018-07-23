import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormatDatePipe } from './format-date.pipe';

@Pipe({
  name: 'billingDate',
  pure: false
})

export class BillingDatePipe implements PipeTransform {

  transform(value: number, startDate: any, frequency: string, which: string): any {

    const datePipe = new DatePipe('en-US');
    const formatPipe = new FormatDatePipe();

    if (value) {

      let today = new Date(),
          dd = today.getDate(),
          mm = today.getMonth()+1,
          yyyy = today.getFullYear(),
          billingDay = parseInt(datePipe.transform(startDate, 'dd'));

      if (billingDay < dd) {

        frequency == 'Monthly' ? mm += 1 : mm += 3;

      }

      which == 'next' ? mm += 1 : mm;

      let day = billingDay.toString(),
          month = mm.toString(),
          year = yyyy.toString(),
          date = year + '-' + month + '-' + day,
          formatted = formatPipe.transform(date);

      if (billingDay == dd && which != 'next') {

        formatted = 'Today';

      }

      return formatted;

    }

  }

}
