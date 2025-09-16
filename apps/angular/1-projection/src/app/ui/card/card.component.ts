import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
@Component({
  selector: 'app-card',
  template: `
    <ng-content select="card-header"></ng-content>
    <section>
      @for (item of list(); track item) {
        <app-list-item (delete)="deleteItem.emit(item.id)">
          <ng-container
            [ngTemplateOutlet]="itemTemplate"
            [ngTemplateOutletContext]="{ item }"></ng-container>
        </app-list-item>
      }
    </section>

    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="addItem.emit()">
      Add
    </button>
  `,
  imports: [ListItemComponent, NgTemplateOutlet],
  standalone: true,
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
})
export class CardComponent {
  readonly list = input<any[] | null>(null);
  @ContentChild('itemTemplate') itemTemplate?: TemplateRef<any>;

  deleteItem = output<number>();
  addItem = output<void>();
}
