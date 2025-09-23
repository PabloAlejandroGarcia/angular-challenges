import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Todo } from '../models/todo.model';

@Component({
  imports: [MatIconModule],
  selector: 'app-todo',
  standalone: true,
  template: `
    <li>
      <span>{{ todo().title }}</span>
      <button (click)="update.emit(todo())">Update</button>
      <button (click)="delete.emit(todo())">
        <mat-icon
          aria-hidden="false"
          aria-label="Delete Todo"
          fontIcon="delete"></mat-icon>
      </button>
    </li>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  todo = input.required<Todo>();
  update = output<Todo>();
  delete = output<Todo>();
}
