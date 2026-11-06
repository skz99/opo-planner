import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { PlannerTask } from '../../../common/models/home.model';
import { FormatDatePipe } from '../../../common/pipes/format-date.pipe';

@Component({
  selector: 'app-today-card',
  imports: [TranslatePipe, FormatDatePipe],
  template: `
    <section class="card h-100">
      <div class="card-body">
        <h2 class="card-title fs-5">{{ 'home.today.title' | translate }}</h2>
        <ul class="list-unstyled d-flex flex-column gap-3 mb-0">
          @for (task of tasks(); track task.id) {
            <li class="form-check mb-0">
              <input
                class="form-check-input"
                type="checkbox"
                [id]="'task-' + task.id"
                [checked]="task.isDone"
                (change)="toggled.emit(task.id)" />
              <label class="form-check-label d-block" [for]="'task-' + task.id">
                <span [class.text-decoration-line-through]="task.isDone">{{ task.text }}</span>
                <small class="d-block text-body-secondary">
                  {{ task.start | formatDate: 'HH:mm' }} – {{ task.end | formatDate: 'HH:mm' }}
                </small>
              </label>
            </li>
          } @empty {
            <li class="text-body-secondary">{{ 'home.today.empty' | translate }}</li>
          }
        </ul>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodayCard {
  readonly tasks = input.required<PlannerTask[]>();
  readonly toggled = output<number>();
}
