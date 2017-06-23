import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PayslipService {
  payslip: Object = {};
  payslipCreationMessage: string;

  constructor(private http: Http) {
    console.log('its payslip service bitch!!!');
  }

  logout(currentUsername: string) {
    const headers = new Headers({
      'Content-type': 'application/json'
    });
    const options = new RequestOptions({ headers: headers });
    const data = {
      user: currentUsername
    };

    return this.http
      .post('http://localhost:8080/api/logout', data, options)
      .toPromise()
      .then(response => {
        console.log('response', response.json());
        return response.json() as any;
      })
      .catch(this.handleError);
  }

  isEmptyObject() {
    console.log('isEmptyObject');
    return Object.keys(this.payslip).length === 0;
  }

  payslipExists() {
    return this.payslip !== undefined;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
