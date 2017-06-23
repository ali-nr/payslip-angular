import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {
  private loggedIn = false;
  constructor(private http: Http) {
    console.log('I am the login service constructor bitch!!!');
  }

  login(username: string, password: string) {
    const headers = new Headers({
      'Content-type': 'application/json'
    });
    const options = new RequestOptions({ headers: headers });
    const data = {
      user: username,
      pass: password
    };

    return this.http
      .post('http://localhost:8080/api/login', data, options)
      .toPromise()
      .then(response => {
        console.log('response', response.json());
        return response.json() as any;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
