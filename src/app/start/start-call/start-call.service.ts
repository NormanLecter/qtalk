import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StartCallService {

  constructor(private http: HttpClient) { }

  joinToRoom(roomNumber): Observable<any> {
    return this.http.post('http://192.168.43.148:3003/api/room/join?number=' + roomNumber, {});
  }
}
