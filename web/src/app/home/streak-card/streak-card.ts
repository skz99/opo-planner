import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Icon } from '../../../common/components/icon/icon';

@Component({
  selector: 'app-streak-card',
  imports: [TranslatePipe, Icon],
  template: `
    <section class="card card--yellow h-100">
      <div class="card-body">
        <h2 class="card-title fs-5">{{ 'home.streak.title' | translate }}</h2>
        <p class="d-flex align-items-center gap-2 mb-0">
          <app-icon class="text-secondary" name="flame" />
          <span class="fs-2 fw-bold">{{ days() }}</span>
          {{ (days() === 1 ? 'home.streak.day' : 'home.streak.days') | translate }}
        </p>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreakCard {
  readonly days = input.required<number>();
}
