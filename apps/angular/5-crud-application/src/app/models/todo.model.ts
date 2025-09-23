export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
export interface TodoUpdate {
  todo: number;
  title: string;
  userId: number;
  id: number;
}
