import { Directive, HostListener, input, output } from '@angular/core';
import { interval, Subscription, take } from 'rxjs';

@Directive({
  selector: '[holdAction]',
})
export class HoldActionDirective {
  holdInterval = input(10);
  holdProgress = output<number>();
  holdComplete = output<void>();
  progressSubscription: Subscription | null = null;

  @HostListener('mousedown')
  startProgress() {
    const emitProgress = interval(this.holdInterval());
    this.progressSubscription = emitProgress.pipe(take(100)).subscribe((x) => {
      this.holdProgress.emit(x + 1);
      if (x + 1 === 100) {
        this.holdComplete.emit();
        this.resetProgress();
      }
    });
  }

  @HostListener('mouseleave')
  @HostListener('mouseup')
  resetProgress() {
    if (this.progressSubscription) {
      this.progressSubscription.unsubscribe();
      this.progressSubscription = null;
    }
    this.holdProgress.emit(0);
  }
}
