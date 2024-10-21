import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs/esm';

@Pipe({
  name: 'formatMonth',
})
export class FormatMonthPipe implements PipeTransform {
  transform(day: dayjs.Dayjs | null | undefined): string {
    return day ? day.format('MMM') : '';
  }
}