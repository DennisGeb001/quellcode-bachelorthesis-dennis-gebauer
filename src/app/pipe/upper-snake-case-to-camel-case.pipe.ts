import {Pipe, PipeTransform} from '@angular/core';
import {upperSnakeCaseToCamelCase} from "../util/upperSnakeCaseToCamelCase";

@Pipe({
  standalone: true,
  name: 'upperSnakeCaseToCamelCase'
})
export class UpperSnakeCaseToCamelCasePipe implements PipeTransform {
  transform(value: string): string {
    return upperSnakeCaseToCamelCase(value);
  }
}
