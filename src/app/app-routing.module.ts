import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodolistFormComponent } from './todolist-form/todolist-form.component';
import {TodolistComponent} from './todolist/todolist.component';


const routes: Routes = [
  {path:"", component: TodolistComponent},
  {path:"data-entry", component: TodolistFormComponent},
  {path:'edit/:id', component:TodolistFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
