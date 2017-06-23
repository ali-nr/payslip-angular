import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PayslipResultService {
  constructor(private http: Http) {}

  createPayslip(payslip: any, headerData: { user: string; token: string }): Promise<any> {
    const headers = new Headers({
      'Content-type': 'application/json',
      'myob-user': headerData.user,
      'myob-token': headerData.token
    });
    const options = new RequestOptions({ headers: headers });
    const data = {
      first_name: payslip.firstname,
      last_name: payslip.lastname,
      pay_date_month: payslip.payDate.getMonth(),
      pay_date_year: payslip.payDate.getFullYear(),
      pay_frequency: payslip.payFrequency,
      annual_income: payslip.annualIncome,
      gross_income: payslip.grossIncome,
      income_tax: payslip.incomeTax,
      netIncome: payslip.netIncome,
      super: payslip.superAnnuation,
      pay: payslip.actualPay
    };

    return this.http
      .post('http://localhost:8080/api/payslip', data, options)
      .toPromise()
      .then(response => {
        console.log('payslip created', response.json());
        return response.json() as any;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
