import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

@Component({
  selector: 'app-start-info',
  templateUrl: './start-info.component.html',
  styleUrls: ['./start-info.component.css']
})
export class StartInfoComponent implements OnInit {

  formName: FormGroup;
  formRoomName: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formName = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.formRoomName = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

}
