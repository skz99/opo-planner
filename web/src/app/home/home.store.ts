import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { HomeData } from '../../common/models/home.model';
import { HomeService } from '../services/home.service';

interface HomeState extends Omit<HomeData, 'oppositionName' | 'examDate' | 'statement'> {
  oppositionName: string | null;
  examDate: string | null;
  statement: HomeData['statement'] | null;
  answer: boolean | null;
  isLoading: boolean;
  error: 'loading' | null;
}

export const HomeStore = signalStore(
  withState<HomeState>({
    oppositionName: null,
    examDate: null,
    tasks: [],
    streakDays: 0,
    studiedBlocks: [],
    weakBlocks: [],
    statement: null,
    answer: null,
    isLoading: false,
    error: null,
  }),
  withComputed(({ answer, statement }) => ({
    isAnswerCorrect: computed(() => {
      const currentAnswer = answer();
      return currentAnswer === null ? null : currentAnswer === statement()?.isTrue;
    }),
  })),
  withMethods((store, homeService = inject(HomeService)) => ({
    load: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap(() =>
          homeService.getHomeData().pipe(
            tapResponse({
              next: (homeData) => patchState(store, { ...homeData, isLoading: false }),
              error: () => patchState(store, { isLoading: false, error: 'loading' }),
            }),
          ),
        ),
      ),
    ),
    toggleTask(taskId: number): void {
      patchState(store, ({ tasks }) => ({
        tasks: tasks.map((task) => (task.id === taskId ? { ...task, isDone: !task.isDone } : task)),
      }));
    },
    answerStatement(answer: boolean): void {
      patchState(store, { answer });
    },
  })),
);
