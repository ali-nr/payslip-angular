import { Component, OnInit } from '@angular/core';
import { PayslipService } from './payslip.service';

@Component({
  selector: 'app-payslip-result',
  templateUrl: 'payslip-result.component.html'
})
export class PayslipResultComponent implements OnInit {
  payslipCreationMessage: string;

  constructor(private payslipService: PayslipService) {
    this.payslipCreationMessage = this.payslipService.payslipCreationMessage;
    console.log('payslipCreationMessage', this.payslipCreationMessage);
  }

  ngOnInit() {}
}
