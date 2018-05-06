import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

declare let SimpleWebRTC: any; //this is important

@Injectable()
export class WebRtcService {

    webrtc: any; //declare global variable

    //construct the simplewebrtc object as service creation
    constructor() {
        this.webrtc = new SimpleWebRTC({
            // url: 'your signal server url here',
            socketio: {},
            connection: null,
            debug: false,
            localVideoEl: 'local-video',
            remoteVideosEl: 'remote-video',
            autoRequestMedia: true,
            adjustPeerVolume: true,
            media: {
                video: true, audio: true
            }
        });
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

    onVideoRemoved() {
        return new Observable<any>(observer => {
            this.webrtc.on('videoRemoved', (video, peer) => {
                observer.next({ video: video, peer: peer});
            });
        });
    }

}