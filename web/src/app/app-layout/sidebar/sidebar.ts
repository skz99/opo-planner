import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Icon } from '../../../common/components/icon/icon';
import { User } from '../../../common/models/user.model';
import { NavItem } from '../nav-items';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe, Icon],
  host: { class: 'd-none d-lg-flex flex-column gap-4 sticky-lg-top vh-100 bg-white border-end p-3' },
  template: `
    <img class="sidebar__logo align-self-start" src="/brand/logo.svg" [alt]="'appLayout.logoAlt' | translate" />
    <nav class="d-flex flex-column gap-1 flex-grow-1" [attr.aria-label]="'appLayout.navLabel' | translate">
      @for (item of items(); track item.path) {
        <a
          class="app-nav-link d-flex align-items-center px-3 py-2"
          [routerLink]="item.path"
          routerLinkActive="app-nav-link--active"
          ariaCurrentWhenActive="page">
          <app-icon class="me-2" [name]="item.icon" />
          {{ item.labelKey | translate }}
        </a>
      }
    </nav>
    <div class="d-flex flex-column gap-2">
      @if (user(); as user) {
        <div class="d-flex align-items-center px-3">
          <app-icon class="me-2" name="user" />
          <span class="text-truncate">{{ user.name }} {{ user.surname }}</span>
        </div>
      }
      <button
        type="button"
        class="btn btn-outline-primary d-flex align-items-center justify-content-center"
        (click)="logout.emit()">
        <app-icon class="me-2" name="logout" />
        {{ 'appLayout.logout' | translate }}
      </button>
    </div>
  `,
  styles: `
    :host {
      flex: 0 0 16rem;
      width: 16rem;
    }

    .sidebar__logo {
      height: 2.5rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  readonly items = input.required<readonly NavItem[]>();
  readonly user = input.required<User | null>();
  readonly logout = output();
}
