import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { User } from '../../common/models/user.model';
import { AccountService } from '../services/account.service';

interface AppLayoutState {
  currentUser: User | null;
  isLoadingUser: boolean;
  error: 'loading' | null;
}

export const AppLayoutStore = signalStore(
  withState<AppLayoutState>({
    currentUser: null,
    isLoadingUser: false,
    error: null,
  }),
  withMethods((store, accountService = inject(AccountService)) => ({
    loadCurrentUser: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoadingUser: true, error: null })),
        switchMap(() =>
          accountService.getCurrentUser().pipe(
            tapResponse({
              next: (currentUser) => patchState(store, { currentUser, isLoadingUser: false }),
              error: () => patchState(store, { isLoadingUser: false, error: 'loading' }),
            }),
          ),
        ),
      ),
    ),
  })),
);
