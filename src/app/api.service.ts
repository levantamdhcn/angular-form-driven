import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  validateUsername(username: string): Observable<boolean> {
    console.log(`Trigger API ${username}`);
    let existedUsers = ['tamlv', 'hoanpx', 'phuongvh'];
    let isValid = !existedUsers.includes(username);

    return of(isValid).pipe(delay(500));
  }
}
