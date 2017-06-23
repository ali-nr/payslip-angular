import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  providers: [LoginService],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginFailureMessage: string;

  constructor(private loginService: LoginService, private router: Router) {
    console.log('I am the login component constructor bitch!!!');
    // this.router.navigate(['/payslip']);
  }
  login(username: string, password: string): void {
    this.loginService.login(username, password).then(result => {
      if (result.error) {
        this.loginFailureMessage = result.message;
      } else {
        console.log('result', result);
        sessionStorage.setItem('currentSession', result.session);
        sessionStorage.setItem('currentUsername', username);
        this.router.navigate(['/payslip/entry']);
      }
    });
  }
}
