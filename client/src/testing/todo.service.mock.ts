import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from '../app/todos/todo';
import { TodoService } from '../app/todos/todo.service';

/**
 * A 'mock' version of the `TodoService` that can be used to test components
 * without having to create an actual service.
 */
@Injectable()
export class MockTodoService extends TodoService {
  static testTodos: Todo[] = [
    {
      _id: 't_id',
      owner: 'Tim',
      status: false,
      body: 'Annuit coeptis',
      category: 'software design'
    },
    {
      _id: 'j_id',
      owner: 'Julia',
      status: true,
      body: 'Novus ordo seclorum',
      category: 'homework'
    },
    {
      _id: 'r_id',
      owner: 'Rusev',
      status: true,
      body: 'Novus ordo eternum',
      category: 'homework'
    }
  ];

  constructor() {
    super(null);
  }

  getTodos(): Observable<Todo[]> {
    // Our goal here isn't to test (and thus rewrite) the service, so we'll
    // keep it simple and just return the test todos regardless of what
    // filters are passed in.
    return of(MockTodoService.testTodos);
  }

  getTodoById(id: string): Observable<Todo> {
    // If the specified ID is for the first test todo,
    // return that todo, otherwise return `null` so
    // we can test illegal todo requests.
    if (id === MockTodoService.testTodos[0]._id) {
      return of(MockTodoService.testTodos[0]);
    } else {
      return of(null);
    }
  }

}
