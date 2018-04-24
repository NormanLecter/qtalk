import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class SharedServicesService {

  numberOfRoom : Number;
  name : string = '';
  roomName : string = '';

  constructor(private router : Router) { }

  navigateToConversation(numberOfRoom : number, name? : string, roomName? : string){
    this.numberOfRoom = numberOfRoom;
    if(name && roomName){
      this.name = name;
      this.roomName = roomName;
    }
    this.router.navigate(['/conversation-window']);
  }

}
