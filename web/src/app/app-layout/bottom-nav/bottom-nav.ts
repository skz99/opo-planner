import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Icon } from '../../../common/components/icon/icon';
import { NavItem } from '../nav-items';

@Component({
  selector: 'app-bottom-nav',
  imports: [RouterLink, RouterLinkActive, TranslatePipe, Icon],
  host: { class: 'd-block d-lg-none sticky-bottom bg-white border-top' },
  template: `
    <nav class="d-flex py-1" [attr.aria-label]="'appLayout.navLabel' | translate">
      @for (item of items(); track item.path) {
        <a
          class="bottom-nav__link app-nav-link d-flex flex-column align-items-center gap-1 py-2"
          [routerLink]="item.path"
          routerLinkActive="app-nav-link--active"
          ariaCurrentWhenActive="page">
          <app-icon [name]="item.icon" />
          <span class="bottom-nav__label text-truncate mw-100">{{ item.shortLabelKey | translate }}</span>
        </a>
      }
    </nav>
  `,
  styles: `
    .bottom-nav__link {
      flex: 1 1 0;
      min-width: 0;
    }

    .bottom-nav__label {
      font-size: 0.625rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomNav {
  readonly items = input.required<readonly NavItem[]>();
}
