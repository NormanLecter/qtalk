import { Component, OnInit } from '@angular/core';
import { SharedServicesService } from '../shared-services.service';
import { WebRtcService } from '../__services/web-rtc.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-conversation-window',
  templateUrl: './conversation-window.component.html',
  styleUrls: ['./conversation-window.component.css']
})
export class ConversationWindowComponent implements OnInit {

  microphones : any;
  selectedMic : String;

  constructor(private sharedServicesService : SharedServicesService,
  private webRtcService : WebRtcService) { 

    webRtcService.onError().subscribe(error => {
      console.warn(error);
  });

  webRtcService.onRoomReady().subscribe(state => {
      console.log(state);
  });

  webRtcService.onReadyToCall().subscribe(() => {
      console.log('ready');
      webRtcService.webrtc.joinRoom('your awesome room name');

  });

  webRtcService.onVideoAdded().subscribe(data => {
      console.log(data);
  });

  }

  ngOnInit() {
    this.selectedMic = 'Wybierz mikrofon z listy..';
    this.microphones = [
      {value : 'Tracer STUDIO 43948'},
      {value : 'Tracer Classic'},
      {value : 'ATR3350'}
    ]
  }

}