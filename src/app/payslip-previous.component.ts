import { Component, OnInit } from '@angular/core';
import { PayslipPreviousService } from './payslip-previous.service';

@Component({
  selector: 'app-payslip-previous',
  providers: [PayslipPreviousService],
  templateUrl: 'payslip-previous.component.html'
})
export class PayslipPreviousComponent implements OnInit {
  payslips: Array<Object>;
  constructor(private payslipPreviousService: PayslipPreviousService) {
    this.loadPrevPayslips();
  }

  loadPrevPayslips(): void {
    this.payslipPreviousService
      .getPrevPayslips({
        user: sessionStorage.getItem('currentUsername'),
        token: sessionStorage.getItem('currentSession')
      })
      .then(result => {
        this.payslips = result;
      });
  }
  ngOnInit() {}
}
