import { Routes }
from '@angular/router';

// =====================================
// AUTH
// =====================================
import { EventsComponent }
from './events.component';

import { CreateEventComponent }
from './create-event.component';
import { RoleComponent }
from './role.component';

import { LoginComponent }
from './login.component';

import { SignupComponent }
from './signup.component';

// =====================================
// DASHBOARDS
// =====================================

import { HomeComponent }
from './home.component';

import { AdminDashboardComponent }
from './admin-dashboard.component';

import { StudentDashboardComponent }
from './services/student-dashboard.component';

import { AlumniDashboardComponent }
from './services/alumni-dashboard.component';

// =====================================
// ALUMNI
// =====================================

import { AlumniListComponent }
from './alumni-list.component';

// =====================================
// PROFILE
// =====================================

import { ProfileComponent }
from './profile.component';

import { EditProfileComponent }
from './edit-profile.component';

// =====================================
// MESSAGING
// =====================================

import { MessagesComponent }
from './messages.component';

import { ChatComponent }
from './chat.component';

// =====================================
// PASSWORD RESET
// =====================================

import { ForgotPasswordComponent }
from './forgot-password.component';

import { VerifyOtpComponent }
from './verify-otp.component';

import { ResetPasswordComponent }
from './reset-password.component';

// =====================================
// NOTIFICATIONS
// =====================================

import { NotificationsComponent }
from './notifications.component';

// =====================================
// ROUTES
// =====================================

export const routes: Routes = [

  // =====================================
  // LANDING PAGE
  // =====================================

  {
    path: '',

    component: RoleComponent
  },

  // =====================================
  // LOGIN
  // =====================================

  {
    path: 'login/:role',

    component: LoginComponent
  },

  // =====================================
  // SIGNUP
  // =====================================

  {
    path: 'signup/:role',

    component: SignupComponent
  },

  // =====================================
  // FORGOT PASSWORD
  // =====================================

  {
    path: 'forgot-password',

    component:
      ForgotPasswordComponent
  },

  // =====================================
  // VERIFY OTP
  // =====================================

  {
    path: 'verify-otp',

    component:
      VerifyOtpComponent
  },
  {
  path: 'events',
  component: EventsComponent
},

{
  path: 'create-event',
  component: CreateEventComponent
},
  // =====================================
  // RESET PASSWORD
  // =====================================

  {
    path: 'reset-password',

    component:
      ResetPasswordComponent
  },

  // =====================================
  // STUDENT DASHBOARD
  // =====================================

  {
    path: 'student-dashboard',

    component:
      StudentDashboardComponent
  },

  // =====================================
  // ALUMNI DASHBOARD
  // =====================================

  {
    path: 'alumni-dashboard',

    component:
      AlumniDashboardComponent
  },

  // =====================================
  // HOME
  // =====================================

  {
    path: 'home',

    component:
      HomeComponent
  },

  // =====================================
  // ALUMNI LIST
  // =====================================

  {
    path: 'alumni-list',

    component:
      AlumniListComponent
  },

  // =====================================
  // PROFILE
  // =====================================

  {
    path: 'profile/:id',

    component:
      ProfileComponent
  },

  // =====================================
  // EDIT PROFILE
  // =====================================

  {
    path: 'edit-profile',

    component:
      EditProfileComponent
  },

  // =====================================
  // INBOX
  // =====================================

  {
    path: 'messages',

    component:
      MessagesComponent
  },

  // =====================================
  // CHAT
  // =====================================

  {
    path: 'chat/:email',

    component:
      ChatComponent
  },

  // =====================================
  // NOTIFICATIONS
  // =====================================

  {
    path: 'notifications',

    component:
      NotificationsComponent
  },

  // =====================================
  // ADMIN
  // =====================================

  {
    path: 'admin-dashboard',

    component:
      AdminDashboardComponent
  },

  // =====================================
  // FALLBACK
  // =====================================

  {
    path: '**',

    redirectTo: ''
  }
];