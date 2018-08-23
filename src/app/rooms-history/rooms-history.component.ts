import { Component, OnInit } from '@angular/core';
import { SharedServicesService } from '../shared-services.service';
import { History } from './history.interface';
import { RoomsHistoryService } from './rooms-history.service';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-rooms-history',
  templateUrl: './rooms-history.component.html',
  styleUrls: ['./rooms-history.component.css']
})
export class RoomsHistoryComponent implements OnInit {

  ELEMENTS: History[] = [];

  passwordValidate = false;
  showWhenDeleting = true;
  password = '';

  constructor( private sharedServicesService: SharedServicesService,
  private roomsHistoryService: RoomsHistoryService,
  private messageService: MessageService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loadHistory();
  }

  backToStart() {
    this.sharedServicesService.navigateToHomePage();
  }

  checkPasswordButton() {
    if (this.password === 'trytytki') {
      this.passwordValidate = true;
      this.messageService.add(
        {severity: 'success',
        summary: 'Sukces!',
        detail: 'Hasło poprawne - uzyskałeś dostęp do historii stworzonych pokoi',
        key: 'qtalkMessages'
      });
    } else {
      this.messageService.add(
        {severity: 'warn',
        summary: 'Błąd',
        detail: 'Hasło niepoprawne - spróbuj ponownie',
        key: 'qtalkMessages'
      });
    }
  }

  checkPassword(event) {
    if (event.keyCode === 13) {
      if (this.password === 'adammalysz') {
        this.messageService.add(
          {severity: 'success',
          summary: 'Sukces!',
          detail: 'Hasło poprawne - uzyskałeś dostęp do historii stworzonych pokoi',
          key: 'qtalkMessages'
        });
      } else {
        this.messageService.add(
          {severity: 'warn',
          summary: 'Błąd',
          detail: 'Hasło niepoprawne - spróbuj ponownie',
          key: 'qtalkMessages'
        });
      }
    }
  }

  loadHistory() {
    // TODO: to haslo mocno TODO XD
    this.roomsHistoryService.getHistory('trytytki').pipe(
      tap(res => {
        console.log(res);
        this.ELEMENTS = <History[]>res;
      }),
      catchError((err, caught) => {
        console.log(err);
        console.log(err.statusText);
        if (err.statusText === 'OK') {
          // TODO: sprawdzic co tu jest
        } else if  (err.statusText === 'Unauthorized') {
         // TODO: Message ze zle haslo
        } else {
          console.log(err);
          console.log(caught);
        }
        return Observable.empty();
      })
    ).subscribe();
  }

  deleteRoomsHistory() {
    this.showWhenDeleting = false;
    // TODO: to haslo mocno TODO XD
    this.roomsHistoryService.deleteHistory('trytytki').pipe(
      tap(res => {
        // TODO: przeniesienie logiki tu opuszczania
        console.log(res);
      }),
      catchError((err, caught) => {
        console.log(err);
        console.log(err.statusText);
        if (err.statusText === 'OK') {
          this.ELEMENTS = [];
          this.showWhenDeleting = true;
        } else if  (err.statusText === 'Unauthorized') {
         // TODO: Message ze zle haslo
        } else {
          console.log(err);
          console.log(caught);
        }
        return Observable.empty();
      })
    ).subscribe();
  }
}
