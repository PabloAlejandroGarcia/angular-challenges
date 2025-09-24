import { Component } from '@angular/core';
import {
  HeavyComputationAltPipe,
  HeavyComputationPipe,
} from './heavyComputation.pipe';

@Component({
  selector: 'app-root',
  imports: [HeavyComputationPipe, HeavyComputationAltPipe],
  template: `
    <p>
      @for (person of persons; track person; let index = $index) {
        {{ person | heavyComputation: index }}
      }
    </p>
    <p>
      {{ persons | heavyComputationAlt }}
    </p>
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
