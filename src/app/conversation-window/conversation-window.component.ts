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

  constraints = {
    audio: false,
    video: true
  };

  room = location.search && location.search.split('?')[1];

  constructor(private sharedServicesService : SharedServicesService,
    private webRtcService : WebRtcService) { 

    webRtcService.onError().subscribe(error => {
        console.warn(error);
    });

    webRtcService.onRoomReady().subscribe(state => {
        console.log(state);
    });

    webRtcService.onReadyToCall().subscribe(() => {
      if (this.room) webRtcService.webrtc.joinRoom(this.room);
    });

    webRtcService.onVideoAdded().subscribe(data => {
        var remotes = document.getElementById('remote-video-container');
          if (remotes) {
              let d = document.createElement('div');
              d.className = 'videoContainer';
              d.id = 'container_' + webRtcService.webrtc.getDomId(data.peer);
              d.appendChild(data.video);
              var vol = document.createElement('div');
              vol.id = 'volume_' + data.peer.id;
              vol.className = 'volume_bar';
              vol.setAttribute('style', 'position: absolute; width: 8px; margin-left: 30px; margin-top: 10px; background-color: yellow; height: 0px;');
              data.video.style = 'margin-bottom: 25px; float: right; height: 120px; border-radius: 20px;'  + 
              '-webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);' + 
              'moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75); box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);';
              d.appendChild(vol);
              remotes.appendChild(d);
          }
    });
  
    webRtcService.onVolumeChange().subscribe(volume => {
      this.showVolume(document.getElementById('localVolume'), volume);
    });

    webRtcService.onChannelMessage().subscribe(data => {
      if(!data.kick && !data.owner){
        this.showVolume(document.getElementById('volume_' + data.peer.id), data.data.volume);
      }
      if(data.kick && !data.owner){
        this.endConnection();
      }
      if(!data.kick && data.owner){
        this.removeRemotes();
      }
    });

    webRtcService.onVideoRemove().subscribe(data => {
      var remotes = document.getElementById('remote-video-container');
      var el = document.getElementById('container_' + webRtcService.webrtc.getDomId(data.peer));
      if (remotes && el) {
          remotes.removeChild(el);
      }
    });

    webRtcService.onLeftRoom().subscribe(roomName  => {
      console.log();  
    })
  }

  ngOnInit() {
    this.initStaticData();
  }

  initStaticData(){
    this.selectedMic = 'Wybierz mikrofon..';
    this.microphones = [
      {value : 'Tracer STUDIO 43948'},
      {value : 'Tracer Classic'},
      {value : 'ATR3350'}
    ];
  }

  showVolume(el, volume) {
    if (!el) return;
    if (volume < -45) { // wartosci miedzy -45 a -20
        el.style.height = '0px';
    } else if (volume > -20) {
        el.style.height = '100%';
    } else {
        el.style.height = '' + Math.floor((volume + 100) * 100 / 25 - 220) + '%';
    }
  }

  endConnection(){
    this.webRtcService.webrtc.sendDirectlyToAll('leave', 'ownerLeave', {'foo' :  'bar'});
    this.webRtcService.webrtc.leaveRoom();
    this.sharedServicesService.navigateToHomePage();
  }

  kickPersons(){
    this.webRtcService.webrtc.sendDirectlyToAll('kick', 'kickHost', {'foo' :  'bar'});
    this.removeRemotes();
  }

  removeRemotes(){
    var remotes = document.getElementById('remote-video-container');
    while (remotes.firstChild) {
      remotes.removeChild(remotes.firstChild);
    }
  }

}