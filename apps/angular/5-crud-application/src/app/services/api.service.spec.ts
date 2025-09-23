import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Todo, TodoUpdate } from '../models/todo.model';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  const API_URL = 'https://jsonplaceholder.typicode.com/todos';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), ApiService],
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch todos', () => {
    const mockTodos = [
      { userId: 1, id: 1, title: 'Test Todo 1', completed: false },
      { userId: 1, id: 2, title: 'Test Todo 2', completed: true },
    ];

    service.getTodos().subscribe((todos) => {
      expect(todos.length).toBe(2);
      expect(todos).toEqual(mockTodos);
    });

    const req = httpMock.expectOne(API_URL);
    expect(req.request.method).toBe('GET');
    req.flush(mockTodos);
  });

  it('should update todo', () => {
    const testTodo: Todo = {
      userId: 1,
      id: 1,
      title: 'Test Todo 1',
      completed: false,
    };
    const mockUpdatedTodo: TodoUpdate = {
      todo: 1,
      id: 1,
      title: 'Updated Title',
      userId: 1,
    };

    service.updateTodo(testTodo).subscribe((updatedTodo) => {
      expect(updatedTodo).toEqual(mockUpdatedTodo);
    });

    const req = httpMock.expectOne(`${API_URL}/${testTodo.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockUpdatedTodo);
  });

  it('should delete todo', () => {
    const testTodo: Todo = {
      userId: 1,
      id: 1,
      title: 'Test Todo 1',
      completed: false,
    };

    service.deleteTodo(testTodo.id).subscribe((res) => {
      expect(res).toEqual({});
    });

    const req = httpMock.expectOne(`${API_URL}/${testTodo.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  afterEach(() => {
    httpMock.verify();
  });
});
