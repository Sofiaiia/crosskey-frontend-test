import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from "@angular/forms";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  todos: any[] = [];
  seeForm: boolean = false;

  newTodo = this.formBuilder.group({
    date: ['', [Validators.required]],
    description: ['',[Validators.required]],
    priority: ['',[Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getAllTodos();
  }

  addTodo(): void{
    if(this.newTodo.valid){
      this.todos.push(this.newTodo.value);
      localStorage.setItem("todos", JSON.stringify(this.todos));
      this.getAllTodos();
      this.newTodo.reset();
    }
  }

  removeTodo(key:number): void{
    this.todos.splice(key,1);
    localStorage.setItem("todos", JSON.stringify(this.todos));
    this.getAllTodos();
  }

  getAllTodos():void{
    if(localStorage.length > 0) {
      this.todos = JSON.parse(localStorage.getItem('todos')||JSON.stringify(['default']));
      this.todos = this.todos.reverse();
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    else {
      transferArrayItem(event.previousContainer.data,event.container.data,event.previousIndex,event.currentIndex,);
    }
  }

  showForm():void{
    this.seeForm ? this.seeForm= false : this.seeForm = true;
  }
}
