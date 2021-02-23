import { Component, OnInit, Input } from '@angular/core';
import { Todo } from './todo';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo.component.html',
  providers: [TodoService],
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
    @Input() todos: Todo;
    @Input() simple?: boolean = false;
    dataSource;

    listData: MatTableModule;
    displayedColumns: string[] = ['owner', 'category', 'status', 'body'];
    todo: Todo[] = [];



    constructor(private http: TodoService) { };


    ngOnInit(): void {
      this.findTodos();
    }

    async findTodos() {


      const arr = await this.http.getTodos().toPromise();
      let i = 0;
        while(arr[i]) {
            this.todo.push(arr[i]);
            i++;
        }
      this.dataSource = new MatTableDataSource<any>(this.todo);
  }

}

