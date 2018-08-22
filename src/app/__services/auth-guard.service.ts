import { Injectable } from '@angular/core';
import { Router, CanActivate, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

constructor(private router: Router) { }

  canActivate() {
    if (sessionStorage.getItem('canGoToConversationWindow') === 'true') {
      return true;
      } else {
      return false;
    }
  }

}
