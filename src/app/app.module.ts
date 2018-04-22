import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { StartInfoComponent } from './start/start-info/start-info.component';
import { ButtonModule } from 'primeng/primeng';
import { StartCallComponent } from './start/start-call/start-call.component';
import {InputTextModule} from 'primeng/inputtext';

const appRoutes: Routes = [
  {
    path: 'start',
    component: StartComponent,
    data: { title: 'Start - QTalk' }
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
    StartCallComponent
  ],
  imports: [
    ButtonModule,
    InputTextModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
