import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RoomsHistoryService {

  constructor(private http: HttpClient) { }

  deleteHistory(password): Observable<any> {
    return this.http.delete('http://192.168.43.148:3003/api/connections-history?password=' + password);
  }

  getHistory(password): Observable<any> {
    return this.http.get('http://192.168.43.148:3003/api/connections-history?password=' + password);
  }

}
