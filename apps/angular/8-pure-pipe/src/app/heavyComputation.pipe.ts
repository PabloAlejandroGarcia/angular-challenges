import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heavyComputation',
  pure: true,
})
export class HeavyComputationPipe implements PipeTransform {
  transform(name: string, index: number): string {
    // very heavy computation
    return `${name} - ${index}`;
  }
}

@Pipe({
  name: 'heavyComputationAlt',
  pure: true,
})
export class HeavyComputationAltPipe implements PipeTransform {
  transform(persons: string[]): string {
    return persons.reduce((acc, name, index) => {
      // very heavy computation
      return acc + `${name} - ${index} `;
    }, '');
  }
}
