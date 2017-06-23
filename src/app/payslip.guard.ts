import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PayslipService } from './payslip.service';

@Injectable()
export class PayslipGuard implements CanActivate {
  constructor(private payslipService: PayslipService, private router: Router) {
    console.log('I am the payslip guard  bitch');
    // this.router.navigate(['/payslip']);
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('guards canActivate');
    console.log('this.payslipService.payslip', this.payslipService.payslip);
    if (this.payslipService.payslipExists && !this.payslipService.isEmptyObject()) {
      return true;
    }
    this.router.navigate(['/payslip/entry']);
    return false;
  }
  // canActivate(): boolean {
  //   if(this.loginService.isLoggedIn) {}
  //   console.log('it\'s login guard bitch!!!',  this.loginService.isLoggedIn());
  //   // this.router.navigate(['/payslip']);
  //   return this.loginService.isLoggedIn();
  // }
}
