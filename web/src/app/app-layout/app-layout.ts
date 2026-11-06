import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AppLayoutStore } from './app-layout.store';
import { BottomNav } from './bottom-nav/bottom-nav';
import { NAV_ITEMS } from './nav-items';
import { Sidebar } from './sidebar/sidebar';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Sidebar, BottomNav],
  providers: [AppLayoutStore],
  host: { class: 'd-flex flex-column flex-lg-row min-vh-100' },
  template: `
    <app-sidebar [items]="navItems" [user]="store.currentUser()" (logout)="logout()" />
    <main class="flex-grow-1 p-3 p-lg-4">
      <router-outlet />
    </main>
    <app-bottom-nav [items]="navItems" />
  `,
  styles: `
    main {
      min-width: 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLayout {
  protected readonly store = inject(AppLayoutStore);
  protected readonly navItems = NAV_ITEMS;
  readonly #router = inject(Router);

  constructor() {
    this.store.loadCurrentUser();
  }

  protected logout(): void {
    this.#router.navigate(['/login']);
  }
}
