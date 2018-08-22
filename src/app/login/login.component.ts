import { Component, OnInit } from '@angular/core';
import { SharedServicesService } from '../shared-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: string;
  password: string;

  constructor( private sharedServicesService: SharedServicesService) { }

  ngOnInit() {
  }

  submitLogin() {
    this.sharedServicesService.navigateToHomePage();
  }

  backToStart() {
    this.sharedServicesService.navigateToHomePage();
  }

}
