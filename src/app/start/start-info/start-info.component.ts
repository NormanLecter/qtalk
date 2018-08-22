import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedServicesService } from '../../shared-services.service';

@Component({
  selector: 'app-start-info',
  templateUrl: './start-info.component.html',
  styleUrls: ['./start-info.component.css']
})
export class StartInfoComponent implements OnInit {

  formName: FormGroup;
  formRoomName: FormGroup;
  numberOfRoom: Number;

  constructor(private _formBuilder: FormBuilder,
    public sharedServicesService: SharedServicesService) { }

  ngOnInit() {
    // TODO: sprawdzenie, czy dany numer-kod nie jest już używany
    this.numberOfRoom = Math.round(Math.random() * 10000);

    this.formName = this._formBuilder.group({
      name: ['', Validators.required]
    });

    this.formRoomName = this._formBuilder.group({
      roomName: ['', Validators.required]
    });
  }
}
