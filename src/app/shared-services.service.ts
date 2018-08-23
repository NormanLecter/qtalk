import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SharedServicesService {

  numberOfRoom: string;
  name = '';
  roomName = '';
  roomOwner = false;

  constructor(private router: Router, private http: HttpClient,
    private messageService: MessageService) { }

  navigateToConversation(numberOfRoom, name?, roomName?): void {
    sessionStorage.setItem('canGoToConversationWindow', 'true');
    this.numberOfRoom = numberOfRoom;
    // tworca pokoju, jemu numer doda się po wejściu
    if (name && roomName) {
      this.name = name;
      this.roomName = roomName;
      this.roomOwner = true;
      this.checkRoomStatus(this.numberOfRoom).subscribe(res => {
        console.log(res);
        if (res.status === 'free') {
          this.createRoom(this.numberOfRoom, name, roomName).pipe(
            tap(response => {
              console.log(response);
              console.log(response.key);
              sessionStorage.setItem('ownerKey', response.key);
              sessionStorage.setItem('roomNumber', this.numberOfRoom);
              this.router.navigate(['/conversation-window']);
            }),
            catchError((err, caught) => {
              console.log(err);
              console.log(caught);
              this.messageService.add(
                {severity: 'error',
                summary: 'Problem',
                detail: 'Pokój nie mógł zostać stworzony - spróbuj ponownie',
                key: 'qtalkMessages'
              });
              return Observable.empty();
              })
            ).subscribe();
        } else {
            this.messageService.add(
              {severity: 'warn',
              summary: 'Uwaga',
              detail: 'Pokój o danym numerze jest już zajęty - kliknij przycisk Resetuj i spróbuj ponownie',
              key: 'qtalkMessages'
            });
        }
      });
    } else {
      // osoba dochodzaca do pokoju
      const addr = '/conversation-window?' + this.numberOfRoom;
      this.router.navigateByUrl(addr);
    }
  }

  checkRoomStatus(roomNumber): Observable<any> {
    return this.http.get('http://192.168.43.148:3003/api/room/status?number=' + roomNumber);
  }

  createRoom(numberOfRoom, name, roomName): Observable<any> {
    const data = {
      'number': numberOfRoom.toString(),
      'name': roomName.toString(),
      'ownerName': name.toString()
    };

    return this.http.post('http://192.168.43.148:3003/api/room/create', data);
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
