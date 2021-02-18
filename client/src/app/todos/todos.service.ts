import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Todos } from './todos';

@Injectable()
export class TodosService {
  readonly todosUrl: string = environment.apiUrl + 'todos';

  constructor(private httpClient: HttpClient) {
  }


  getTodos(filters?: { status?: boolean; owner?: string; body?: string; category?: string }): Observable<Todos[]> {
    let httpParams: HttpParams = new HttpParams();
    if (filters) {
      if (filters.status) {
        httpParams = httpParams.set('status', filters.status.toString());
      }
      if (filters.owner) {
        httpParams = httpParams.set('owner', filters.owner);
      }
      if (filters.category) {
        httpParams = httpParams.set('category', filters.category);
      }
      if (filters.body) {
        httpParams = httpParams.set('body', filters.body);
      }
    }
    return this.httpClient.get<Todos[]>(this.todosUrl, {
      params: httpParams,
    });
  }


  getTodosById(id: string): Observable<Todos> {
    return this.httpClient.get<Todos>(this.todosUrl + '/' + id);
  }

  filterTodos(todo: Todos[], filters: { status?: boolean; owner?: string; body?: string; category?: string }): Todos[] {

    let filteredTodos = todo;
    // Filter by status
    if (filters.status) {

      filteredTodos = filteredTodos.filter(todos => todos.status.toString().toLowerCase().indexOf(filters.status.toString()) !== -1);
    }

    // Filter by owner
    if (filters.owner) {
      filters.owner = filters.owner.toLowerCase();
      filteredTodos = filteredTodos.filter(todos => todos.owner.toLowerCase().indexOf(filters.owner) !== -1);
    }

     // Filter by category
     if (filters.category) {
      filters.category = filters.category.toLowerCase();
      filteredTodos = filteredTodos.filter(todos => todos.category.toLowerCase().indexOf(filters.category) !== -1);
    }

     // Filter by body
     if (filters.body) {
      filters.body = filters.body.toLowerCase();
      filteredTodos = filteredTodos.filter(todos => todos.body.toLowerCase().indexOf(filters.body) !== -1);
    }
    return filteredTodos;
  }
}
