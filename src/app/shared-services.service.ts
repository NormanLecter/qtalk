import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class SharedServicesService {

  numberOfRoom: string;
  name = '';
  roomName = '';
  roomOwner = false;

  constructor(private router: Router) { }

  navigateToConversation(numberOfRoom: string, name?: string, roomName?: string): void {
    this.numberOfRoom = numberOfRoom;
    // tworca pokoju, jemu numer doda się po wejściu
    if (name && roomName) {
      this.name = name;
      this.roomName = roomName;
      this.roomOwner = true;
      this.router.navigate(['/conversation-window']);
    } else {
      // osoba dochodzaca do pokoju
      const addr = '/conversation-window?' + this.numberOfRoom;
      this.router.navigateByUrl(addr);
    }
  }

  navigateToHomePage(): void {
      this.router.navigate(['start']);
  }

  navigateToAbout(): void {
    this.router.navigate(['about']);
}

  navigateToLogin(): void {
    this.router.navigate(['login']);
  }

  navigateToRegister(): void {
    this.router.navigate(['register']);
  }

  navigateToRoomsHistory(): void {
    this.router.navigate(['rooms-history']);
  }

}
