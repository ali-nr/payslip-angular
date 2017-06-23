import { Component, OnInit } from '@angular/core';
import { PayslipService } from './payslip.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payslip',
  providers: [],
  templateUrl: './payslip.component.html'
})
export class PayslipComponent implements OnInit {
  // payslipCreationMessage: string;
  payslip: object;
  annualSalary: number;
  superRate: number;
  firstname: string;
  lastname: string;

  constructor(private payslipService: PayslipService, private router: Router) {
    this.payslipService.payslipCreationMessage = null;
    this.payslipService.payslip = {};
    // console.log('payslip is empty?', Object.keys(this.payslip).length === 0);
  }

  ngOnInit() {}

  generatePayslip() {
    console.log('I am in generate payslip');
    const date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    const lastDay = new Date(y, m + 1, 0);

    const payPeriod = lastDay;
    const grossIncome = Math.round(this.annualSalary / 12);
    const incomeTax = this.calculateTax(grossIncome, this.annualSalary);
    const netIncome = Math.round(grossIncome - incomeTax);
    const superAnnuation = Math.round(grossIncome * (this.superRate / 100));
    const actualPay = Math.round(netIncome - superAnnuation);

    this.payslipService.payslip = {
      firstname: this.firstname,
      lastname: this.lastname,
      payDate: payPeriod,
      payFrequency: 'monthly',
      annualIncome: this.annualSalary,
      grossIncome: grossIncome,
      incomeTax: incomeTax,
      netIncome: netIncome,
      super: superAnnuation,
      pay: actualPay
    };
    console.log('payslip', this.payslipService.payslip);
    this.router.navigate(['/payslip/confirm']);
    // this.payslipHasData = !angular.equals($scope.payslipData, {});
  }

  logout() {
    this.payslipService.logout(sessionStorage.getItem('currentUser')).then(result => {
      sessionStorage.removeItem('currentUsername');
      sessionStorage.removeItem('currentSession');
      this.payslipService.payslipCreationMessage = null;
    });
  }

  calculateTax(grossIncome, annualSalary) {
    if (annualSalary <= 18200) {
      return 0;
    } else if (annualSalary >= 18201 && annualSalary <= 37000) {
      return Math.round((annualSalary - 18200) * (19 / 100) / 12);
    } else if (annualSalary >= 37001 && annualSalary <= 80000) {
      return Math.round((3572 + (annualSalary - 37000) * (32.5 / 100)) / 12);
    } else if (annualSalary >= 80001 && annualSalary <= 180000) {
      return Math.round((17547 + (annualSalary - 80000) * (37 / 100)) / 12);
    } else {
      return Math.round((54547 + (annualSalary - 180000) * (45 / 100)) / 12);
    }
  }
}
