import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { BillsComponent } from './bills/bills.component';
import { BroadbandComponent } from './broadband/broadband.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ModalComponent } from './_common/modal/modal.component';
import { PhoneComponent } from './phone/phone.component';
import { MobileComponent } from './mobile/mobile.component';
import { TvComponent } from './tv/tv.component';

const routes: Routes = [
    {
      path: '',
      redirectTo: '/dashboard',
      pathMatch: 'full'
    },
    {
      path: 'dashboard',
      component: DashboardComponent
    },
    {
      path: 'account',
      component: AccountComponent
    },
    {
      path: 'bills',
      component: BillsComponent,
      children: [
        {
          path: ':id',
          component: BillsComponent
        }
      ]
    },
    {
      path: 'broadband',
      component: BroadbandComponent
    },
    {
      path: 'phone',
      component: PhoneComponent
    },
    {
      path: 'mobile',
      component: MobileComponent
    },
    {
      path: 'tv',
      component: TvComponent
    }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
