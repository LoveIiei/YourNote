export type ViewMode = 'day' | 'week' | 'month';

export interface Todo {
  id: number;
  text: string;
  status: 'DONE' | 'IN PROGRESS';
  date: Date;
}
