import {
  ChangeDetectionStrategy,
  Component,
  model,
  ModelSignal,
} from '@angular/core';
import { HoldActionDirective } from './hold-action.directive';

@Component({
  imports: [HoldActionDirective],
  selector: 'app-root',
  template: `
    <main class="flex h-screen items-center justify-center">
      <div
        class="flex w-full max-w-screen-sm flex-col items-center gap-y-8 p-4">
        <button
          class="rounded bg-indigo-600 px-4 py-2 font-bold text-white transition-colors ease-in-out hover:bg-indigo-700"
          holdAction
          [holdInterval]="10"
          (holdProgress)="progress.set($event)"
          (holdComplete)="onSend()">
          Hold me
        </button>

        <progress [value]="progress()" [max]="100"></progress>
      </div>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  progress: ModelSignal<number> = model(0);
  onSend() {
    alert('Data saved!');
  }
}
