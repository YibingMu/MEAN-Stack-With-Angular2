import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class AuthService {

  domain = 'http://localhost:8080';

  constructor(
    private http: HttpClient
  ) { }

  registerUser(user){
    return this.http.post(this.domain + '/authentication/register', user);
  }

  checkUsername(username){
    return this.http.get(this.domain + '/authentication/checkUsername/' + username);
  }

  checkEmail(email){
    return this.http.get(this.domain + '/authentication/checkEmail/' + email);
  }

}
