import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Subject, Subscription} from 'rxjs';
import { TodolistDataService } from '../shared/todolist-data.component';
import { TodolistEntry } from '../shared/todolist-entry.model';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit, OnDestroy {

  constructor(private todolistDataService: TodolistDataService, private router: Router) { }

  
  todolistEntries: TodolistEntry[] =[]; 
  todolistSubscription = new Subscription();
  
  
  ngOnInit(): void {
    this.todolistDataService.getTodolistEntires();
    this.todolistSubscription = this.todolistDataService.todolistSubject.subscribe(entries => {
      this.todolistEntries = entries;
    })
  }

  ngOnDestroy(): void{
    this.todolistSubscription.unsubscribe();
  }

  onDelete(id: string){
    console.log(id)
    this.todolistDataService.onDelete(id);
  }

  onEdit(id: string){
    console.log(id)
    this.router.navigate(['edit', id])
  }

}
