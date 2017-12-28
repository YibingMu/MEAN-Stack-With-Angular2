import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class AuthService {

  domain = 'http://localhost:8080';
  authToken;
  user;

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

  login(user){
    return this.http.post(this.domain + '/authentication/login', user);
  }

  storeUserData(token, user){
    localStorage.setItem('token',token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
}
