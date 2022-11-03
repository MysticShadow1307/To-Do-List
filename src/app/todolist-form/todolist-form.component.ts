import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TodolistDataService } from '../shared/todolist-data.component';
import { TodolistEntry } from '../shared/todolist-entry.model';

@Component({
  selector: 'app-todolist-form',
  templateUrl: './todolist-form.component.html',
  styleUrls: ['./todolist-form.component.css']
})
export class TodolistFormComponent implements OnInit {

  todolistForm: FormGroup;
  editMode = false;
  todolistEntry: TodolistEntry;
  paramId: string;

  constructor(private todolistDataService: TodolistDataService, private router: Router, private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((paraMap: ParamMap) =>{
      if(paraMap.has('id')){
        this.editMode = true;
        this.paramId = paraMap.get('id')!;
        this.todolistEntry = this.todolistDataService.getTodolistEntry(this.paramId);
      }
      else{
        this.editMode = false;
      }
    })
    this.todolistForm = new FormGroup({
      "date": new FormControl(this.editMode ? this.todolistEntry.date: null, [Validators.required]),
      "entry": new FormControl(this.editMode ? this.todolistEntry.entry: null, [Validators.required]),
      "status": new FormControl(this.editMode ? this.todolistEntry.status: null, [Validators.required]),
      "priority": new FormControl(this.editMode ? this.todolistEntry.priority: null, [Validators.required])
    })
  }

  onSubmit(){
    const newEntry = new TodolistEntry('', this.todolistForm.value.date, this.todolistForm.value.entry, this.todolistForm.value.status, this.todolistForm.value.priority);

    if(this.editMode){
      newEntry.id = this.paramId;
      this.todolistDataService.onUpdateEntry(this.paramId, newEntry);
    }
    else{
      this.todolistDataService.onAddTodolistEntry(newEntry);
    }
    this.router.navigateByUrl("");
  }

}
