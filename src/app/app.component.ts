import { Component, OnInit } from '@angular/core';
import { SignalService } from './__services/signal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(private signalService: SignalService) { }

  ngOnInit(): void {
    this.signalService.messages.subscribe(msg => {
      console.log(msg);
    });
    this.signalService.sendMsg('test message');
  }
}
