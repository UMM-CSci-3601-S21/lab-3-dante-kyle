import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todos-list-component',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: []
})

export class TodoListComponent implements OnInit {
  // These are public so that tests can reference them (.spec.ts)
  public serverFilteredTodos: Todo[] = [];
  public filteredTodos: Todo[];

  public todoStatus: boolean;
  public todoOwner: string;
  public todoBody: string;
  public todoCategory: string;
  public todoLimit: number;
  public viewType: 'card' | 'list' = 'list';

  // Inject the UserService into this component.
  // That's what happens in the following constructor.
  //
  // We can call upon the service for interacting
  // with the server.
  constructor(private todoService: TodoService, private snackBar: MatSnackBar) {

  }

  getTodosFromServer() {
    this.todoService.getTodos({
      status: this.todoStatus,
      owner: this.todoOwner,
      body: this.todoBody,
      category: this.todoCategory,
      limit: this.todoLimit
    }).subscribe(returnedTodos => {
      this.serverFilteredTodos = returnedTodos;
      this.updateFilter();
    }, err => {
      // If there was an error getting the users, display
      // a message.
      this.snackBar.open(
        'Problem contacting the server – try again',
        'OK',
        // The message will disappear after 3 seconds.
        { duration: 3000 });
      // I (Nic) feel like we should throw an error here, but
      // I can't figure out how to test that at the moment,
      // so I'm going to leave it out. If someone knows
      // how to make this work that would be great.
      //
      // Now throw an error, which will show up in the browser
      // JavaScript console and allow us to examine the stack
      // trace.
      //
      // throw new Error('Failed to connect to the server: ' + err);
    });
  }

  public updateFilter() {
    this.filteredTodos = this.todoService.filterTodos(
      this.serverFilteredTodos, {
        status: this.todoStatus,
        owner: this.todoOwner,
        body: this.todoBody,
        category: this.todoCategory,
        limit: this.todoLimit});
  }

  /**
   * Starts an asynchronous operation to update the users list
   *
   */
  ngOnInit(): void {
    this.getTodosFromServer();
  }
}



