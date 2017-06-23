import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PayslipPreviousService {
  constructor(private http: Http) {}

  getPrevPayslips(headerData: { user: string; token: string }) {
    console.log('headerData', headerData);
    const headers = new Headers({
      'Content-type': 'application/json',
      'myob-user': headerData.user,
      'myob-token': headerData.token
    });
    const options = new RequestOptions({ headers: headers });
    return this.http
      .get('http://localhost:8080/api/payslips', options)
      .toPromise()
      .then(response => {
        return response.json() as any;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
