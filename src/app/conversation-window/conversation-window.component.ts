import { Component, OnInit } from '@angular/core';
import { SharedServicesService } from '../shared-services.service';

@Component({
  selector: 'app-conversation-window',
  templateUrl: './conversation-window.component.html',
  styleUrls: ['./conversation-window.component.css']
})
export class ConversationWindowComponent implements OnInit {

  microphones : any;
  selectedMic : String;

  constructor(private sharedServicesService : SharedServicesService) { }

  ngOnInit() {
    this.selectedMic = 'Wybierz mikrofon z listy..';
    this.microphones = [
      {value : 'Tracer STUDIO 43948'},
      {value : 'Tracer Classic'},
      {value : 'ATR3350'}
    ]
  }

}
