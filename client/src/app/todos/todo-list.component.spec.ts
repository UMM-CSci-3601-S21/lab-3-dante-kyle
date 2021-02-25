import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { MockTodoService } from '../../testing/todo.service.mock';
import { Todo } from './todo';
import { TodoListComponent } from './todo-list.component';
import { TodoService } from './todo.service';


const COMMON_IMPORTS: any[] = [
  FormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatButtonModule,
  MatInputModule,
  MatExpansionModule,
  MatTooltipModule,
  MatListModule,
  MatDividerModule,
  MatRadioModule,
  MatSnackBarModule,
  BrowserAnimationsModule,
  RouterTestingModule,
];

describe('TodosListComponent', () => {
  let todoList: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [ TodoListComponent ],
      providers: [{ provide: TodoService, useValue: new MockTodoService() }]
    });
  });

  beforeEach(waitForAsync(() => {
    TestBed.compileComponents().then(() => {
      // Create a "fixture" of the UserListComponent. that
      // allows us to get an instance of the component
      // (userList, below) that we can "control" in
      // the tests.
      fixture = TestBed.createComponent(TodoListComponent);
      todoList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('contains all the todos', () => {
    expect(todoList.serverFilteredTodos.length).toBe(3);
  });

  it('contains an owner named "Tim"', () => {
    expect(todoList.serverFilteredTodos.some((todo: Todo) => todo.owner === 'Tim')).toBe(true);
  });

  it('contains an owner named "Julia"', () => {
    expect(todoList.serverFilteredTodos.some((todo: Todo) => todo.owner === 'Julia')).toBe(true);
  });

  it('doesn\'t contain an owner named "Bob"', () => {
    expect(todoList.serverFilteredTodos.some((todo: Todo) => todo.owner === 'Bob')).toBe(false);
  });

  it('has two todos deemed complete', () => {
    expect(todoList.serverFilteredTodos.filter((todo: Todo) => todo.status === true).length).toBe(2);
  });
});


