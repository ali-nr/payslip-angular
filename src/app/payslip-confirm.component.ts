import { Component, Input, OnInit } from '@angular/core';
import { PayslipService } from './payslip.service';
import { PayslipResultService } from './payslip-result.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payslip-confirm',
  providers: [PayslipResultService],
  templateUrl: 'payslip-confirm.component.html'
})
export class PayslipConfirmComponent implements OnInit {
  // @Input() payslipCreationMessage: string;
  payslip: Object;

  constructor(
    private payslipResultService: PayslipResultService,
    private payslipService: PayslipService,
    private router: Router
  ) {
    console.log('payslip in result component', this.payslipService.payslip);
    this.payslip = this.payslipService.payslip;
  }

  ngOnInit() {
    console.log('payslip in result component', this.payslip);
  }

  pay() {
    this.payslipResultService
      .createPayslip(this.payslip, {
        user: sessionStorage.getItem('currentUsername'),
        token: sessionStorage.getItem('currentSession')
      })
      .then(result => {
        console.log('result', result);
        this.payslipService.payslipCreationMessage = result.message;
        this.router.navigate(['/payslip/result']);
      });
  }
}
