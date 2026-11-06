export interface NavItem {
  path: string;
  icon: string;
  labelKey: string;
  shortLabelKey: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { path: '/home', icon: 'home', labelKey: 'nav.home', shortLabelKey: 'nav.home' },
  { path: '/syllabus', icon: 'syllabus', labelKey: 'nav.syllabus', shortLabelKey: 'nav.syllabusShort' },
  { path: '/notes', icon: 'notes', labelKey: 'nav.notes', shortLabelKey: 'nav.notes' },
  { path: '/exams', icon: 'timer', labelKey: 'nav.exams', shortLabelKey: 'nav.exams' },
  { path: '/mock-exams', icon: 'tests', labelKey: 'nav.mockExams', shortLabelKey: 'nav.mockExamsShort' },
  { path: '/planner', icon: 'planner', labelKey: 'nav.planner', shortLabelKey: 'nav.planner' },
];
