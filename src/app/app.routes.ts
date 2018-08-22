import { Routes, RouterModule } from '@angular/router';
import { StartComponent } from './start/start.component';
import { ConversationWindowComponent } from './conversation-window/conversation-window.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RoomsHistoryComponent } from './rooms-history/rooms-history.component';
import { AuthGuard } from './__services/auth-guard.service';

const appRoutes: Routes = [
  {
    path: 'start',
    component: StartComponent,
    data: { title: 'Start - QTalk' }
  },
  {
    path: 'conversation-window',
    component: ConversationWindowComponent,
    data: { title: 'Okno rozmowy - QTalk' },
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { title: 'About - QTalk' },
  },
  {
    path: 'rooms-history',
    component: RoomsHistoryComponent,
    data: { title: 'Historia pokoi - QTalk' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login - QTalk' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Rejestracja - QTalk' }
  },
  {
    path: '',
    redirectTo: '/start',
    pathMatch: 'full'
  }
  ];

// { enableTracing: true } // <-- do debugowania routingu
export const routing = RouterModule.forRoot(appRoutes);
