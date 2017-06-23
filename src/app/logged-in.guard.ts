import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';
import { PayslipService } from './payslip.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private loginService: LoginService, private payslipService: PayslipService, private router: Router) {
    console.log('I am the guard  bitch');
    // this.router.navigate(['/payslip']);
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('guards canActivate');
    if (sessionStorage.getItem('currentSession')) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
  // canActivate(): boolean {
  //   if(this.loginService.isLoggedIn) {}
  //   console.log('it\'s login guard bitch!!!',  this.loginService.isLoggedIn());
  //   // this.router.navigate(['/payslip']);
  //   return this.loginService.isLoggedIn();
  // }
}
