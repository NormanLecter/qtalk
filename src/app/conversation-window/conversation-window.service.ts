import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConversationWindowService {

  constructor(private http: HttpClient) { }

  removeRoom(roomNumber, roomKey): Observable<any> {
    return this.http.post('http://192.168.43.148:3003/api/room/remove?number=' + roomNumber + '&key=' + roomKey, {});
  }

  leaveRoom(roomNumber): Observable<any> {
    return this.http.post('http://192.168.43.148:3003/api/room/leave?number=' + roomNumber, {});
  }

}
