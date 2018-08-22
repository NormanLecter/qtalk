import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RoomsHistoryService {

  constructor(private http: HttpClient) { }

  deleteHistory(): Observable<any> {
    // TODO: http delete do API - usuniecie calej historii
    return this.http.delete('https://jsonplaceholder.typicode.com/todos/1');
  }

  getHistory(): Observable<any> {
    // TODO: http get do API - pobranie calej historii
    return this.http.get('https://jsonplaceholder.typicode.com/todos/1');
  }

}
