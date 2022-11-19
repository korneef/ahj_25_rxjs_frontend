import { ajax } from 'rxjs/ajax';
import {
  map, switchMap, interval, fromEvent,
} from 'rxjs';
import insertMessages from './insertMessages';

const url = 'https://ahj-25-rxjs-backend.herokuapp.com/messages/unread';
const refreshInterval = 3000;

interval(refreshInterval)
  .pipe(
    switchMap(() => ajax.getJSON(url)
      .pipe(
        map((v) => {
          const timestamp = Date.now() - refreshInterval;
          return v.filter((item) => item.date > timestamp);
        }),
      )),
  ).subscribe({
    next: (value) => {
      insertMessages(value);
    },
    // eslint-disable-next-line no-console
    error: () => console.log('error'),
  });

fromEvent(document, 'DOMContentLoaded')
  .pipe(
    switchMap(() => ajax.getJSON(url)),
  ).subscribe({
    next: (value) => {
      insertMessages(value);
    },
    // eslint-disable-next-line no-console
    error: () => console.log('error'),
  });
