import { HttpClient } from "@angular/common/http";
import { Injectable} from "@angular/core";
import { map, Subject} from "rxjs";
import { TodolistEntry } from "./todolist-entry.model";


@Injectable({providedIn:"root"})
export class TodolistDataService{

    public maxId: string;

    constructor(private http: HttpClient){}

    public todolistSubject = new Subject<TodolistEntry[]>();

    todolistEntries: TodolistEntry[] = [];

    onDelete(id: string){
        this.http.delete<{message: string}>('http://localhost:3000/remove-entry/' + id).subscribe((jsonData) => {
        console.log(jsonData.message);
        this.getTodolistEntires();
        })
    }

    onAddTodolistEntry(todolistEntry: TodolistEntry){
        this.http.get<{maxId: string}>('http://localhost:3000/max-id').subscribe((jsonData => {
            todolistEntry.id = jsonData.maxId + 1;
            this.http.post<{message: string}>('http://localhost:3000/add-entry', todolistEntry).subscribe((jsonData) => {
                console.log(todolistEntry);
                this.getTodolistEntires();
            })
        }))
    }

    getTodolistEntires(){
        this.http.get<{todolistEntries: any}>('http://localhost:3000/todolist-entries')
        .pipe(map((responseData) => {
            return responseData.todolistEntries.map((entry: {date: string; entry: string; status: string; priority: string; _id: string}) => {
                return {
                    date: entry.date, 
                    entry: entry.entry,
                    status: entry.status,
                    priority: entry.priority,
                    id: entry._id
                }
            })
        }))
        .subscribe((updateResponse) => {
            this.todolistEntries = updateResponse;
            this.todolistSubject.next(this.todolistEntries);

        });
    }

    getTodolistEntry(id: string){
        const index = this.todolistEntries.findIndex(el =>{
            return el.id == id;

        })
        return this.todolistEntries[index];
    }

    onUpdateEntry(id: string, entry: TodolistEntry){
        this.http.put<{message: string}>('http://localhost:3000/update-entry/' + id, entry).subscribe((jsonData) => {
            console.log(jsonData.message);
            this.getTodolistEntires();
        })
    }
}