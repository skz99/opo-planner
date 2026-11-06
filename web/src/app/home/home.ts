import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Icon } from '../../common/components/icon/icon';
import { FormatDatePipe } from '../../common/pipes/format-date.pipe';
import { BlocksCard } from './blocks-card/blocks-card';
import { HomeStore } from './home.store';
import { StreakCard } from './streak-card/streak-card';
import { TodayCard } from './today-card/today-card';
import { TrueFalseCard } from './true-false-card/true-false-card';

@Component({
  selector: 'app-home',
  imports: [TranslatePipe, Icon, FormatDatePipe, TodayCard, StreakCard, BlocksCard, TrueFalseCard],
  providers: [HomeStore],
  host: { class: 'd-block mx-auto' },
  template: `
    @if (store.isLoading()) {
      <div class="d-flex justify-content-center py-5">
        <span class="spinner-border text-primary" role="status">
          <span class="visually-hidden">{{ 'home.loading' | translate }}</span>
        </span>
      </div>
    } @else if (store.error()) {
      <div class="alert alert-danger" role="alert">{{ 'home.error' | translate }}</div>
    } @else {
      @if (store.examDate(); as examDate) {
        <header class="mb-4">
          <h1 class="fs-4 mb-1">{{ store.oppositionName() }}</h1>
          <p class="d-flex align-items-center mb-0">
            <app-icon class="text-primary me-2" name="flag" />
            {{ 'home.examDate' | translate: { date: examDate | formatDate: 'PPP' } }}
          </p>
        </header>
      }
      <div class="row g-4">
        <div class="col-12 col-xl-8">
          <app-today-card class="d-block h-100" [tasks]="store.tasks()" (toggled)="store.toggleTask($event)" />
        </div>
        <div class="col-12 col-xl-4">
          <app-streak-card class="d-block h-100" [days]="store.streakDays()" />
        </div>
        <div class="col-12 col-xl-8">
          <app-blocks-card
            class="d-block h-100"
            [studiedBlocks]="store.studiedBlocks()"
            [weakBlocks]="store.weakBlocks()" />
        </div>
        <div class="col-12 col-xl-4">
          @if (store.statement(); as statement) {
            <app-true-false-card
              class="d-block h-100"
              [text]="statement.text"
              [isCorrect]="store.isAnswerCorrect()"
              (answered)="store.answerStatement($event)" />
          }
        </div>
      </div>
    }
  `,
  styles: `
    :host {
      max-width: 75rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly store = inject(HomeStore);

  constructor() {
    this.store.load();
  }
}
