import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Button } from '../../../common/components/button/button';

@Component({
  selector: 'app-true-false-card',
  imports: [TranslatePipe, Button],
  template: `
    <section class="card card--cyan h-100">
      <div class="card-body">
        <h2 class="card-title fs-5">{{ 'home.trueFalse.title' | translate }}</h2>
        <p>{{ text() }}</p>
        <div class="d-flex gap-2">
          <app-button variant="outline-primary" [isDisabled]="hasAnswered()" (click)="answered.emit(true)">
            {{ 'home.trueFalse.true' | translate }}
          </app-button>
          <app-button variant="outline-primary" [isDisabled]="hasAnswered()" (click)="answered.emit(false)">
            {{ 'home.trueFalse.false' | translate }}
          </app-button>
        </div>
        <p class="fw-bold mt-3 mb-0" role="status" [class.text-success]="isCorrect()" [class.text-danger]="!isCorrect()">
          @if (hasAnswered()) {
            {{ (isCorrect() ? 'home.trueFalse.correct' : 'home.trueFalse.incorrect') | translate }}
          }
        </p>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrueFalseCard {
  readonly text = input.required<string>();
  readonly isCorrect = input.required<boolean | null>();
  readonly answered = output<boolean>();

  protected readonly hasAnswered = computed(() => this.isCorrect() !== null);
}
