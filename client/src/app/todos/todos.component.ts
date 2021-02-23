
import { Component, OnInit, Input } from '@angular/core';
import { Todos } from './todos';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TodosService } from './todos.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  providers: [TodosService],
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  public serverFilteredTodos: Todos[];
  public filteredTodos: Todos[];
  todos: Todos[] = [];
  public todosOwner: string;
  public todosStatus: boolean;
  public todosBody: string;
  public todosCategory: string;
  public todosLimit: number;
  dataSource;
  listData: MatTableModule;
  displayedColumns: string[] = ['owner','category','status','body'];
  todo: Todos[] = [];


  constructor(private todosService: TodosService, private snackBar: MatSnackBar) {


  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getTodosFromServer() {
    this.todosService.getTodos({
      status: this.todosStatus,
      owner: this.todosOwner,
      body: this.todosBody,
      category: this.todosCategory,
      limit: this.todosLimit
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
    this.filteredTodos = this.todosService.filterTodos(
      this.serverFilteredTodos, { status: this.todosStatus,
        owner: this.todosOwner,
        body: this.todosBody,
        category: this.todosCategory });
  }
}
