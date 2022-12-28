import { Course } from './../../model/course';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  form = this.formBuilder.group({
    name: [''],
    category: ['']
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {
    const course: Course = this.route.snapshot.data['course'];
      this.form.setValue({
        name: course.name,
        category: course.category
      });
  }

  onSubmit() {
    console.log(this.form.value);
    this.service.save(this.form.value)
    .subscribe(
      (result) => this.onSucess(),
      (error) => this.onError()
    );
  }

  onCancel() {
    this.location.back();
  }

  private onSucess() {
    this.snackBar.open('Curso salvo com sucesso!', '', { duration: 5000 });
    this.onCancel;
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso.', '', { duration: 5000 });
  }
}
