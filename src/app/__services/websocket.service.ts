import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
// TODO: inny import nie dziala
// tslint:disable-next-line:import-blacklist
import * as Rx from 'rxjs/Rx';

@Injectable()
export class WebsocketService {

  private socket;

  constructor() { }

  connect(): Rx.Subject<MessageEvent> {
    this.socket = io.connect('http://192.168.0.11:3003');

    const observable = new Observable(obs => {
        this.socket.on('message', (data) => {
          console.log('Received message from Websocket Server');
          obs.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
    });

    const observer = {
        next: (data: Object) => {
            this.socket.emit('message', JSON.stringify(data));
        },
    };

    return Rx.Subject.create(observer, observable);
  }

}
