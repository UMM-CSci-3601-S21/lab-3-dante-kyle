import { Component, OnInit, Input } from '@angular/core';
import { Todos } from './todos';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TodosService } from './todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  providers: [TodosService],
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
    @Input() todos: Todos;
    @Input() simple?: boolean = false;
    dataSource;

    listData: MatTableModule;
    displayedColumns: string[] = ['owner', 'category', 'status', 'body'];
    todo: Todos[] = [];



    constructor(private http: TodosService) { };


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

