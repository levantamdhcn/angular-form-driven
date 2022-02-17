import { delay, Observable, of } from 'rxjs';

export function validateUsername(username: string): Observable<boolean> {
  console.log('Trigger API call');
  let existedUser = ['tamlv', 'hoanpx', 'phuongvh'];
  let isValid = !existedUser.includes(username);

  return of(isValid).pipe(delay(1000));
}
