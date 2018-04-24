import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { SharedServicesService } from './shared-services.service';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule, MatFormFieldModule, MatCardModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StartInfoComponent } from './start/start-info/start-info.component';
import { ButtonModule } from 'primeng/primeng';
import { StartCallComponent } from './start/start-call/start-call.component';
import { InputTextModule }  from 'primeng/inputtext';
import { MatSelectModule } from '@angular/material/select'
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ConversationWindowComponent } from './conversation-window/conversation-window.component';

const appRoutes: Routes = [
  {
    path: 'start',
    component: StartComponent,
    data: { title: 'Start - QTalk' }
  },
  { path: 'conversation-window',
    component: ConversationWindowComponent,
    data: { title: 'Okno rozmowy - QTalk' }
  },
  { path: '',
    redirectTo: '/start',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    StartInfoComponent,
    StartCallComponent,
    ConversationWindowComponent
  ],
  imports: [
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    ButtonModule,
    InputTextModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatStepperModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [SharedServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
