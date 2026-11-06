import { Injectable } from '@angular/core';
import { addMinutes, startOfToday } from 'date-fns';
import { Observable, delay, of } from 'rxjs';
import { HomeData } from '../../common/models/home.model';

const todayAt = (hours: number, minutes = 0): string =>
  addMinutes(startOfToday(), hours * 60 + minutes).toISOString();

@Injectable({ providedIn: 'root' })
export class HomeService {
  getHomeData(): Observable<HomeData> {
    return of({
      oppositionName: 'Auxiliar Administrativo del Estado',
      examDate: '2027-06-12',
      tasks: [
        { id: 1, text: 'Repasar la Constitución', start: todayAt(9), end: todayAt(10, 30), isDone: true },
        { id: 2, text: 'Simulacro de Procedimiento Administrativo', start: todayAt(11), end: todayAt(12), isDone: false },
        { id: 3, text: 'Pasar a limpio los apuntes de Ofimática', start: todayAt(17), end: todayAt(18, 30), isDone: false },
      ],
      streakDays: 12,
      studiedBlocks: [
        { id: 1, name: 'Organización del Estado' },
        { id: 2, name: 'Derecho de la Unión Europea' },
      ],
      weakBlocks: [
        { id: 3, name: 'Procedimiento Administrativo', correctPercentage: 42 },
        { id: 4, name: 'Gestión de personal', correctPercentage: 55 },
        { id: 5, name: 'Ofimática', correctPercentage: 61 },
      ],
      statement: {
        id: 1,
        text: 'La Constitución Española de 1978 consta de 169 artículos.',
        isTrue: true,
      },
    }).pipe(delay(800));
  }
}
