import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      (addItem)="handleAdd()"
      (deleteItem)="handleDelete($event)"
      class="bg-light-blue">
      <img
        ngProjectAs="card-header"
        priority
        ngSrc="assets/img/city.png"
        width="200"
        height="200" />
      <ng-template #itemTemplate let-item="item">
        {{ item.name }}, {{ item.country }}
      </ng-template>
    </app-card>
  `,
  imports: [CardComponent, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .bg-light-blue {
        background-color: rgba(0, 0, 255, 0.1);
      }
    `,
  ],
})
export class CityCardComponent {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  cities = this.store.cities;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
  }

  handleAdd() {
    this.store.addOne(randomCity());
  }

  handleDelete(id: number) {
    this.store.deleteOne(id);
  }
}
