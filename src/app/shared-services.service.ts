import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class SharedServicesService {

  numberOfRoom : String;
  name : string = '';
  roomName : string = '';
  roomOwner : boolean = false;

  constructor(private router : Router) { }

  navigateToConversation(numberOfRoom : String, name? : string, roomName? : string) : void{
    this.numberOfRoom = numberOfRoom;
    // tworca pokoju, jemu numer doda się po wejściu
    if(name && roomName){
      this.name = name;
      this.roomName = roomName;
      this.roomOwner = true;
      this.router.navigate(['/conversation-window']);
    }
    // osoba dochodzaca do pokoju
    else{
      let addr =  '/conversation-window?' + this.numberOfRoom;
      this.router.navigateByUrl(addr);
    }
  }

  navigateToHomePage() : void{
      this.router.navigate(['start']);
  }

  navigateToAbout() : void{
    this.router.navigate(['about']);
}

  navigateToLogin() : void {
    this.router.navigate(['login']);
  }

  navigateToRegister(): void {
    this.router.navigate(['register']);
  }

}
