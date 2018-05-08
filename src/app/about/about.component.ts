import { Component, OnInit } from '@angular/core';
import { SharedServicesService } from '../shared-services.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor( private sharedServicesService : SharedServicesService) { }

  ngOnInit() {
  }

  backToStart(){
    this.sharedServicesService.navigateToHomePage();
  }

}
