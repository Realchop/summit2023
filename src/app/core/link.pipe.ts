import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'link'
})
export class LinkPipe implements PipeTransform {

  transform(text: string): string {
    const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    const regex = new RegExp(expression);

    return text.replace(regex, (value) => `<a target='_blank' rel='noreferrer' href=${value}>link</a>`);
  }

}
