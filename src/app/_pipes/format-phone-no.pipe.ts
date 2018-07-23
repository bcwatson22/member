import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPhoneNo',
  pure: false
})

export class FormatPhoneNoPipe implements PipeTransform {

  transform(value: string): string {

      if (value) {

        const countryEnd = 3,
              areaEnd = 6,
              numEnd = 9;

        let paddedNo = value.substring(countryEnd, areaEnd) + ' ' + value.substring(areaEnd, numEnd) + ' ' + value.substring(numEnd, value.length);

        return '0' + paddedNo;

      }

  }

}
