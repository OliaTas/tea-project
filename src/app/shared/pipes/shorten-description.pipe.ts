import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenDescription'
})
export class ShortenDescriptionPipe implements PipeTransform {

  transform(value: string): string {
    if (value && value.length > 250) {
      return value.substring(0, 250) + '...';
    }

    return value;
  }

}
