import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Todo } from '../models/todo.model';
import { ApiService } from '../services/api.service';
import { TodoComponent } from './todo.component';

@Component({
  imports: [MatProgressSpinnerModule, TodoComponent],
  selector: 'app-root',
  template: `
    @if (todos().length === 0) {
      <mat-spinner></mat-spinner>
    } @else {
      <li>
        @for (todo of todos(); track todo.id) {
          <app-todo
            [todo]="todo"
            (update)="updateTodo($event)"
            (delete)="deleteTodo($event)"></app-todo>
        }
      </li>
    }
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  private api = inject(ApiService);

  todos: WritableSignal<Todo[]> = signal<Todo[]>([]);

  ngOnInit(): void {
    this.api.getTodos().subscribe((todos) => {
      this.todos.set(todos);
    });
  }

  updateTodo(todo: Todo) {
    this.api.updateTodo(todo).subscribe((updatedTodo) => {
      this.todos.update((todos) =>
        todos.map((t) =>
          t.id === updatedTodo.id ? { ...t, title: updatedTodo.title } : t,
        ),
      );
    });
  }
  deleteTodo(todo: Todo) {
    this.api.deleteTodo(todo.id).subscribe(() => {
      this.todos.update((todos) => todos.filter((t) => t.id !== todo.id));
    });
  }
}
