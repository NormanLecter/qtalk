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

  microphones: any;
  selectedMic: string;

  constraints = {
    audio: false,
    video: true
  };

  audioDevices = [];
  audioInputs = [];

  muteMic = false;

  // TODO: 0-1
  MicPowerValue = 80;
    // TODO: 0-1
  MicPowerValueBackup = 80;

  room = location.search && location.search.split('?')[1];

  constructor(public sharedServicesService: SharedServicesService,
    private webRtcService: WebRtcService) {

    webRtcService.onError().subscribe(error => {
        console.warn(error);
    });

    webRtcService.onRoomReady().subscribe(state => {
        console.log(state);
    });

    webRtcService.onReadyToCall().subscribe(() => {
      if (this.room) {
        webRtcService.webrtc.joinRoom(this.room);
      }
    });

    webRtcService.onVideoAdded().subscribe(data => {
        const remotes = document.getElementById('remote-video-container');
          if (remotes) {
              const d = document.createElement('div');
              d.className = 'videoContainer';
              d.id = 'container_' + webRtcService.webrtc.getDomId(data.peer);
              d.appendChild(data.video);
              const vol = document.createElement('div');
              vol.id = 'volume_' + data.peer.id;
              vol.className = 'volume_bar';
              // TODO: inne rozwiazanie
              // tslint:disable-next-line:max-line-length
              vol.setAttribute('style', 'position: absolute; width: 8px; margin-left: 30px; margin-top: 10px;background-color: yellow; height: 0px;');
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
      if (!data.kick && !data.owner) {
        this.showVolume(document.getElementById('volume_' + data.peer.id), data.data.volume);
      }
      if (data.kick && !data.owner) {
        this.endConnection();
      }
      if (!data.kick && data.owner) {
        this.removeRemotes();
      }
    });

    webRtcService.onVideoRemove().subscribe(data => {
      const remotes = document.getElementById('remote-video-container');
      const el = document.getElementById('container_' + webRtcService.webrtc.getDomId(data.peer));
      if (remotes && el) {
          remotes.removeChild(el);
      }
    });

    webRtcService.onLeftRoom().subscribe(roomName  => {
      console.log();
    });
  }

  ngOnInit() {
    this.initStaticData();
    this.loadMics();
  }

  onChangeMicVolumePower(event) {
    console.log(event.value / 100);
    this.webRtcService.webrtc.setVolumeForAll(event.value / 100);
  }

  onChangeMutMicSlideToggle() {
    this.muteMic = !this.muteMic;
    if (this.muteMic) {
      this.MicPowerValueBackup = this.MicPowerValue;
      this.MicPowerValue = 0;
      this.webRtcService.webrtc.mute();
    } else {
      this.webRtcService.webrtc.unmute();
      this.MicPowerValue = this.MicPowerValueBackup;
    }
  }

  loadMics() {
    let stream;
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(s => (stream = s), e => console.log(e.message))
    .then(() => navigator.mediaDevices.enumerateDevices())
    .then(devices => {
      devices.forEach(d => {
        if (d.kind === 'audioinput') {
          this.audioDevices.push(d);
          this.audioInputs.push({'value' : d.label, 'viewValue' : d.label});
          if (d.label.includes('Domyślny') || d.label.includes('Default')) {
            this.webRtcService.mediaOptions.audio = {
              // optional: [{sourceId: d.deviceId}]
              deviceId: d.deviceId
            };
            this.selectedMic = d.label;
          }
        }
      });
    })
    .catch(e => console.log(e));
  }

  initStaticData() {
    this.selectedMic = 'Wybierz mikrofon..';
    this.microphones = [];
    this.webRtcService.webrtc.setVolumeForAll(0.8);
  }

  showVolume(el, volume) {
    if (isFinite(volume)) {
      if (!el) { return; }
      if (volume < -45) { // wartosci miedzy -45 a -20
          el.style.height = '0px';
      } else if (volume > -20) {
          el.style.height = '100%';
      } else {
          el.style.height = '' + Math.floor((volume + 100) * 100 / 25 - 220) + '%';
      }
      // po wyciszeniu jest infinite
    } else {
      el.style.height = '0px';
    }
  }

  onChangeMic(event) {
    this.audioDevices.forEach(device => {
      if (device.label === event.value ) {
        this.webRtcService.mediaOptions.audio = {
          deviceId: device.deviceId
        };
      }
    });
  }

  endConnection() {
    this.webRtcService.webrtc.sendDirectlyToAll('leave', 'ownerLeave', {'foo' :  'bar'});
    this.webRtcService.webrtc.leaveRoom();
    this.sharedServicesService.navigateToHomePage();
  }

  kickPersons() {
    this.webRtcService.webrtc.sendDirectlyToAll('kick', 'kickHost', {'foo' :  'bar'});
    this.removeRemotes();
  }

  removeRemotes() {
    const remotes = document.getElementById('remote-video-container');
    while (remotes.firstChild) {
      remotes.removeChild(remotes.firstChild);
    }
  }

}
