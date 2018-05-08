import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SharedServicesService } from '../shared-services.service';

declare let SimpleWebRTC: any; //this is important

@Injectable()
export class WebRtcService {

    webrtc : any; 
    room : any;

    constructor(private sharedServicesService : SharedServicesService) {

        this.webrtc = new SimpleWebRTC({
            localVideoEl: 'local-video',
            remoteVideosEl: '',
            autoRequestMedia: true, 
            autoRemoveVideos: true,
            debug: false,
            detectSpeakingEvents: true,
            enableDataChannels : true   
        });

        let room = location.search && location.search.split('?')[1];

        if(sharedServicesService.numberOfRoom != ''){
            let numberOfRoom =  sharedServicesService.numberOfRoom + '=';
            this.webrtc.createRoom(numberOfRoom, function (err, name) {
                var newUrl = location.pathname + '?' + name;
                if (!err) {
                    history.replaceState({foo: 'bar'}, null, newUrl);
                } else {
                    console.log('Error! : ' + err);
                }
            });
        }
    }

    //use webrtc functions as observables
    onError() {
        return new Observable<any>(observer => {
            this.webrtc.on('error', error => {
                observer.next(error);
            });
        });
    }

    onRoomReady() {
        return new Observable<any>(observer => {
            this.webrtc.connection.on('message', data => {
                if(data.type == 'roomReady') {
                    observer.next(data.payload);
                }
            });
        });
    }

    onConnectionReady() {
        return new Observable<any>(observer => {
            this.webrtc.on('connectionReady', sessionId => {
                observer.next(sessionId);
            });
        });
    }

    onReadyToCall() {
        return new Observable<any>(observer => {
            this.webrtc.on('readyToCall', () => {
                observer.next();
            });
        });
    }

    onVideoAdded() {
        return new Observable<any>(observer => {
            this.webrtc.on('videoAdded', (video, peer) => {
                observer.next({ video: video, peer: peer});
            });
        });
    }

    onVolumeChange()  {
        return new Observable<any>(observer => {
            this.webrtc.on('volumeChange', function (volume, treshold) {
                observer.next(volume);
            });
        });
    }

    onVideoRemoved() {
        return new Observable<any>(observer => {
            console.log('video removed'!);
            this.webrtc.on('videoRemoved', (video, peer) => {
                observer.next({ video: video, peer: peer});
            });
        });
    }

    onChannelMessage() {
        return new Observable<any>(observer => {
            this.webrtc.on('channelMessage', function (peer, label, data) {
                if (data.type == 'volume') {
                    observer.next({peer  : peer, data : data, kick : false, owner : false});
                }
                if (data.type == 'kickHost') {
                    observer.next({peer  : peer, data : data, kick : true, owner :  false});
                }
                if (data.type == 'ownerLeave') {
                    observer.next({peer  : peer, data : data, kick : false, owner :  true});
                }
            });
        })
    }

    onVideoRemove(){
        return new Observable<any>(observer => {
            this.webrtc.on('videoRemoved', function (video, peer) {
                observer.next({video : video, peer : peer});
            });
        })
    }

    onLeftRoom(){
        return new Observable<any>(observer => {
            this.webrtc.on('leftRoom', function (roomName)  {
                observer.next(roomName);
            });
        })
    }
}