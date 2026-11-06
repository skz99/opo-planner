export interface PlannerTask {
  id: number;
  text: string;
  start: string;
  end: string;
  isDone: boolean;
}

export interface StudiedBlock {
  id: number;
  name: string;
}

export interface WeakBlock {
  id: number;
  name: string;
  correctPercentage: number;
}

export interface TrueFalseStatement {
  id: number;
  text: string;
  isTrue: boolean;
}

export interface HomeData {
  oppositionName: string;
  examDate: string;
  tasks: PlannerTask[];
  streakDays: number;
  studiedBlocks: StudiedBlock[];
  weakBlocks: WeakBlock[];
  statement: TrueFalseStatement;
}
