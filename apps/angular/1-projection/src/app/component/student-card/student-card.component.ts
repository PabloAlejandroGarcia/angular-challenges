import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students()"
      (addItem)="handleAdd()"
      (deleteItem)="handleDelete($event)"
      class="bg-light-green">
      <img
        ngProjectAs="card-header"
        priority
        ngSrc="assets/img/student.webp"
        width="200"
        height="200" />
      <ng-template #itemTemplate let-item="item">
        {{ item.firstName }}{{ item.lastName ? ' ' + item.lastName : '' }}
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  students = this.store.students;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  handleAdd() {
    this.store.addOne(randStudent());
  }

  handleDelete(id: number) {
    this.store.deleteOne(id);
  }
}
