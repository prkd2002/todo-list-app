import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent implements OnInit {
  taskArray = [{taskName: 'Plan Your Tasks', isCompleted:false, isEditable:false}]

  constructor() {
  }

  ngOnInit(): void {
    this.getFromLocalStorage();

  }

  onSubmit(form:NgForm):void{
    console.log(form);
    this.taskArray.push({
      taskName: form.controls['task'].value,
      isCompleted: false,
      isEditable: false
    })
    form.reset();
    this.saveToLocalStorage();
  }



  saveToLocalStorage(){
    let stringJSON = JSON.stringify(this.taskArray)
    localStorage.setItem('todolist',stringJSON);
  }

  getFromLocalStorage(){
    let itemsJSONString = localStorage.getItem('todolist');
    if(itemsJSONString != null){
      this.taskArray = JSON.parse(itemsJSONString);
    }
  }
  onDelete(index:number):void{
    console.log(index);
    this.taskArray.splice(index, 1);
    this.saveToLocalStorage();
  }

  onCheck(index:number):void{
    console.log(this.taskArray);
    this.taskArray[index].isCompleted= !this.taskArray[index].isCompleted;
    this.saveToLocalStorage();
  }

  onEdit(i: number) {
    this.taskArray[i].isEditable = true;
    this.saveToLocalStorage();

  }

  onSave(i: number, newTask: string) {

    this.taskArray[i].taskName = newTask;
    this.taskArray[i].isEditable = false;
    this.saveToLocalStorage();

  }
}
