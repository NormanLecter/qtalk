import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { SharedServicesService } from './shared-services.service';
import { WebRtcService } from './__services/web-rtc.service';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule, MatFormFieldModule, MatCardModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StartInfoComponent } from './start/start-info/start-info.component';
import { ButtonModule } from 'primeng/primeng';
import { StartCallComponent } from './start/start-call/start-call.component';
import { InputTextModule } from 'primeng/inputtext';
import { GrowlModule } from 'primeng/growl';
import { TableModule } from 'primeng/table';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MessageService } from 'primeng/components/common/messageservice';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ConversationWindowComponent } from './conversation-window/conversation-window.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { MatTableModule } from '@angular/material/table';
import { RegisterComponent } from './register/register.component';
import { WebsocketService } from './__services/websocket.service';
import { StartCallService } from './start/start-call/start-call.service';
import { SignalService } from './__services/signal.service';
import { RoomsHistoryComponent } from './rooms-history/rooms-history.component';
import { RoomsHistoryService } from './rooms-history/rooms-history.service';
import { ConversationWindowService } from './conversation-window/conversation-window.service';
import { AuthGuard } from './__services/auth-guard.service';
import { routing } from './app.routes';

import { LOCALE_ID } from '@angular/core';
import localePl from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localePl, 'pl');

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    StartInfoComponent,
    StartCallComponent,
    ConversationWindowComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    RoomsHistoryComponent
  ],
  imports: [
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    ButtonModule,
    InputTextModule,
    BrowserModule,
    GrowlModule,
    FormsModule,
    HttpClientModule,
    MatStepperModule,
    MatButtonModule,
    MatTableModule,
    TableModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    routing
  ],
  providers: [
    SharedServicesService,
    WebRtcService,
    MessageService,
    StartCallService,
    WebsocketService,
    RoomsHistoryService,
    ConversationWindowService,
    SignalService,
    AuthGuard,
    {provide: LOCALE_ID, useValue: 'pl'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
