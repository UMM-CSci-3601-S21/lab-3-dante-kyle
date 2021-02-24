import { Component, OnInit, Input } from '@angular/core';
import { Todo } from './todo';

@Component({
  selector: 'app-todos-card',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodosComponent implements OnInit {

  @Input() todos?: Todo;
  @Input() simple?: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
