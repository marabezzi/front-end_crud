import { ActivatedRoute, Router, Routes } from '@angular/router';
import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';

import { Course } from './../model/course';
import { CoursesService } from './../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent{

courses$: Observable<Course[]>;

constructor(private CoursesService: CoursesService,
            private dialog: MatDialog,
            private router: Router,
            private route: ActivatedRoute){

  this.courses$ = this.CoursesService.list()
  .pipe(
    catchError(error => {
      this.onError('Erro ao carregar cursos.')
      return of([])
    })
  );
 }
 onError(errorMsg: string){
  this.dialog.open(ErrorDialogComponent, {
    data: errorMsg
  });
 }

 onAdd() {
  this.router.navigate(['new'], {relativeTo: this.route});
 }
}
