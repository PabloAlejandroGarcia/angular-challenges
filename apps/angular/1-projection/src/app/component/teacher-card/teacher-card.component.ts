import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      (addItem)="handleAdd()"
      (deleteItem)="handleDelete($event)"
      class="bg-light-red">
      <img
        ngProjectAs="card-header"
        priority
        ngSrc="assets/img/teacher.png"
        width="200"
        height="200" />
      <ng-template #itemTemplate let-item="item">
        {{ item.firstName }}{{ item.lastName ? ' ' + item.lastName : '' }}
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgOptimizedImage],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  teachers = this.store.teachers;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }
  handleAdd() {
    this.store.addOne(randTeacher());
  }
  handleDelete(id: number) {
    this.store.deleteOne(id);
  }
}
