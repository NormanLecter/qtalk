import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedServicesService } from '../shared-services.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StartComponent implements OnInit {

  formName: FormGroup;
  formRoomName: FormGroup;

  constructor(private _formBuilder: FormBuilder,
  public sharedServicesService: SharedServicesService) {
    sessionStorage.setItem('ownerKey', '');
    sessionStorage.setItem('roomNumber', '');
    sessionStorage.setItem('canGoToConversationWindow', 'false');
   }

  ngOnInit() {
    this.formName = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.formRoomName = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  goToAbout() {
    this.sharedServicesService.navigateToAbout();
  }

  goToRoomsHistory() {
    this.sharedServicesService.navigateToRoomsHistory();
  }

}
