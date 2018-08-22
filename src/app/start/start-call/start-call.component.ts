import { Component, OnInit } from '@angular/core';
import { SharedServicesService } from '../../shared-services.service';

@Component({
  selector: 'app-start-call',
  templateUrl: './start-call.component.html',
  styleUrls: ['./start-call.component.css']
})
export class StartCallComponent implements OnInit {

  numberOfRoom: string;

  constructor(public sharedServicesService: SharedServicesService) { }

  ngOnInit() {
  }

  joinRoom() {
    this.sharedServicesService.navigateToConversation(this.numberOfRoom);
  }

}
