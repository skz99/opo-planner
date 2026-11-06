import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Icon } from '../../../common/components/icon/icon';
import { StudiedBlock, WeakBlock } from '../../../common/models/home.model';

@Component({
  selector: 'app-blocks-card',
  imports: [TranslatePipe, Icon],
  template: `
    <section class="card card--teal h-100">
      <div class="card-body">
        <h2 class="card-title fs-5">{{ 'home.blocks.title' | translate }}</h2>
        <div class="row g-4">
          <div class="col-12 col-md-6">
            <h3 class="fs-6">{{ 'home.blocks.studied' | translate }}</h3>
            <ul class="list-unstyled d-flex flex-column gap-2 mb-0">
              @for (block of studiedBlocks(); track block.id) {
                <li class="d-flex align-items-center">
                  <app-icon class="text-success me-2" name="check" />
                  {{ block.name }}
                </li>
              } @empty {
                <li class="text-body-secondary">{{ 'home.blocks.noStudied' | translate }}</li>
              }
            </ul>
          </div>
          <div class="col-12 col-md-6">
            <h3 class="fs-6">{{ 'home.blocks.weak' | translate }}</h3>
            <ul class="list-unstyled d-flex flex-column gap-2 mb-0">
              @for (block of weakBlocks(); track block.id) {
                <li class="d-flex justify-content-between gap-3">
                  {{ block.name }}
                  <span class="text-nowrap fw-bold">
                    {{ 'home.blocks.correctPercentage' | translate: { percentage: block.correctPercentage } }}
                  </span>
                </li>
              } @empty {
                <li class="text-body-secondary">{{ 'home.blocks.noWeak' | translate }}</li>
              }
            </ul>
          </div>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlocksCard {
  readonly studiedBlocks = input.required<StudiedBlock[]>();
  readonly weakBlocks = input.required<WeakBlock[]>();
}
