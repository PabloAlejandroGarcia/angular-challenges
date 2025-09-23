import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { catchError, Observable } from 'rxjs';
import { Todo, TodoUpdate } from '../models/todo.model';

export function ErrorHandlingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Error occurred:', error);
      throw error;
    }),
  );
}
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_URL = 'https://jsonplaceholder.typicode.com/todos';
  private http = inject(HttpClient);

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.API_URL);
  }

  updateTodo(todo: Todo): Observable<TodoUpdate> {
    return this.http.put<TodoUpdate>(
      `${this.API_URL}/${todo.id}`,
      JSON.stringify({
        todo: todo.id,
        title: randText(),
        userId: todo.userId,
      }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
  }
  deleteTodo(id: number): Observable<{}> {
    return this.http.delete<{}>(`${this.API_URL}/${id}`);
  }
}
