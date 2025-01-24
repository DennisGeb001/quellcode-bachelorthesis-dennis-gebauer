import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  standalone: true,
  name: 'upperSnakeCaseToTitleCaseWithSpace'
})
export class UpperSnakeCaseToTitleCaseWithSpacePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    return value
      .toLowerCase()
      .split('_')
      .map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(' ');
  }
}
