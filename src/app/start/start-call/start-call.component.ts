import { Component, OnInit } from '@angular/core';
import { SharedServicesService } from '../../shared-services.service';
import { StartCallService } from './start-call.service';
import { catchError, tap } from '../../../../node_modules/rxjs/operators';
import { Observable } from '../../../../node_modules/rxjs';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-start-call',
  templateUrl: './start-call.component.html',
  styleUrls: ['./start-call.component.css']
})
export class StartCallComponent implements OnInit {

  numberOfRoom: string;

  constructor(public sharedServicesService: SharedServicesService,
  private startCallService: StartCallService, private messageService: MessageService) { }

  ngOnInit() {
  }

  joinRoom() {
    this.startCallService.joinToRoom(this.numberOfRoom).pipe(
      tap(res => {
        // TODO: tutaj przeniesienie do pokoju
        console.log(res);
      }),
      catchError((err, caught) => {
        if (err.statusText === 'Forbidden') {
          this.messageService.add(
            {severity: 'warn',
            summary: 'Uwaga',
            detail: 'Pokój o danym numerze nie istnieje lub jest zajęty',
            key: 'qtalkMessages'
          });
        } else if (err.statusText === 'OK') {
          // TODO: nie jako HttpErrorResponse
          sessionStorage.setItem('roomNumber', this.numberOfRoom);
          this.sharedServicesService.navigateToConversation(this.numberOfRoom);
        } else {
          console.log(err);
          console.log(caught);
          this.messageService.add(
            {severity: 'error',
            summary: 'Problem',
            detail: 'Wystąpił niezany problem - odśwież stronę i spróbuj ponownie',
            key: 'qtalkMessages'
          });
        }

        return Observable.empty();
      })
    ).subscribe();
  }

}
