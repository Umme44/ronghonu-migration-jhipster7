import { NgModule } from '@angular/core';

import { SharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { TranslateDirective } from './language/translate.directive';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { DurationPipe } from './date/duration.pipe';
import { FormatMediumDatetimePipe } from './date/format-medium-datetime.pipe';
import { FormatMediumDatePipe } from './date/format-medium-date.pipe';
import { FormatTimePipe } from './date/format-time.pipe';
import { FormatYearPipe } from './date/format-year.pipe';
import { FormatMonthPipe } from './date/format-month.pipe';
import { FormatDayOfTheMonthPipe } from './date/format-day-of-the-month.pipe';
import { FormatDayOfTheWeekPipe } from './date/format-day-of-the-week.pipe';

import { SortByDirective } from './sort/sort-by.directive';
import { SortDirective } from './sort/sort.directive';
import { ItemCountComponent } from './pagination/item-count.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  imports: [SharedLibsModule],
  declarations: [
    FindLanguageFromKeyPipe,
    TranslateDirective,
    AlertComponent,
    AlertErrorComponent,
    HasAnyAuthorityDirective,
    DurationPipe,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
    FormatTimePipe,
    FormatMonthPipe,
    FormatYearPipe,
    FormatDayOfTheMonthPipe,
    FormatDayOfTheWeekPipe,
    SortByDirective,
    SortDirective,
    ItemCountComponent,
    FilterComponent,
  ],
  exports: [
    SharedLibsModule,
    FindLanguageFromKeyPipe,
    TranslateDirective,
    AlertComponent,
    AlertErrorComponent,
    HasAnyAuthorityDirective,
    DurationPipe,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
    FormatTimePipe,
    FormatMonthPipe,
    FormatYearPipe,
    FormatDayOfTheMonthPipe,
    FormatDayOfTheWeekPipe,
    SortByDirective,
    SortDirective,
    ItemCountComponent,
    FilterComponent,
  ],
})
export class SharedModule {}
