import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Course } from '../../model/course';


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {

 @Input() courses: Course[] = [];
 @Output() add = new EventEmitter(false);
 @Output() edit = new EventEmitter(false);

 readonly displayedColumns = ['_id', 'name', 'category', 'actions'];


 constructor(){
}
  onAdd() {
   this.add.emit(true);
  }

  onEdit(Course: Course) {
    this.edit.emit(Course);
  }
}
