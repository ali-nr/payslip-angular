import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { PayslipComponent } from './payslip.component';
import { PayslipConfirmComponent } from './payslip-confirm.component';
import { PayslipResultComponent } from './payslip-result.component';
import { PayslipPreviousComponent } from './payslip-previous.component';

import { HttpModule } from '@angular/http';

import { LoggedInGuard } from './logged-in.guard';
import { PayslipGuard } from './payslip.guard';
import { LoginService } from './login.service';
import { PayslipService } from './payslip.service';
import { PayslipResultService } from './payslip-result.service';
import { PayslipPreviousService } from './payslip-previous.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PayslipComponent,
    PayslipConfirmComponent,
    PayslipResultComponent,
    PayslipPreviousComponent
  ],
  providers: [LoginService, LoggedInGuard, PayslipGuard, PayslipService, PayslipResultService, PayslipPreviousService],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent,
        pathMatch: 'full'
      },
      {
        path: 'payslip/entry',
        component: PayslipComponent,
        canActivate: [LoggedInGuard]
      },
      {
        path: 'payslip/confirm',
        component: PayslipConfirmComponent,
        canActivate: [LoggedInGuard, PayslipGuard]
      },
      {
        path: 'payslip/result',
        component: PayslipResultComponent,
        canActivate: [LoggedInGuard, PayslipGuard]
      },
      {
        path: 'payslip/previous',
        component: PayslipPreviousComponent,
        canActivate: [LoggedInGuard]
      }
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
