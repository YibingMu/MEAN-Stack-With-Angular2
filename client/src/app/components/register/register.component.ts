import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form;
  message;
  messageClass;
  processing = false;
  emailValid = true;
  emailMessage;
  usernameValid = true;
  usernameMessage;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
  }

  createForm(){
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        this.validateUsername
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.validateEmail
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35),
        this.validatePassword
      ])],
      confirm: ['', Validators.required]
    }, {validator: this.matchingPasswords('password','confirm')})
  }

  disableForm(){
    this.form.controls['username'].disable();
    this.form.controls['email'].disable();
    this.form.controls['password'].disable();
    this.form.controls['confirm'].disable();
  }

  enableForm(){
    this.form.controls['username'].enable();
    this.form.controls['email'].enable();
    this.form.controls['password'].enable();
    this.form.controls['confirm'].enable();
  }

  validateEmail(controls){
    const regExp = new RegExp(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/);
    if (regExp.test(controls.value)){
        return null;
    } else {
        return {'validateEmail': true}
    }
  }

  validateUsername(controls){
    const regExp = new RegExp(/^[a-zA-Z0-9_-]{3,15}$/);
    if (regExp.test(controls.value)){
      return null;
    } else {
      return {'validateUsername': true}
    }
  }

  validatePassword(controls){
    const regExp = new RegExp(/^[a-zA-Z0-9_-]{6,16}$/);
    if (regExp.test(controls.value)){
      return null;
    } else {
      return {'validatePassword': true}
    }
  }

  matchingPasswords(password, confirm){
    return (group: FormGroup) => {
      if (group.controls[password].value === group.controls[confirm].value){
        return null;
      } else {
        return {'matchingPasswords': true}
      }
    }
  }

  onRegisterSubmit(){
    this.processing = true;
    this.disableForm();
    const user = {
      email: this.form.get('email').value,
      username: this.form.get('username').value,
      password: this.form.get('password').value,
    }

    this.authService.registerUser(user).subscribe(data => {
      console.log(data);
      if (!data['success']) {
        this.messageClass = 'alert alert-danger';
        this.message = data['message'];
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data['message'];
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000)
      }
    });
  }

  checkEmail(){
    this.authService.checkEmail(this.form.controls['email'].value).subscribe(data => {
      if (!data['success']) {
        this.emailValid = false;
        this.emailMessage = data['message'];
      } else {
        this.emailValid = true;
        this.emailMessage = data['message'];
      }
    });
  }

  checkUsername(){
    this.authService.checkUsername(this.form.controls['username'].value).subscribe(data => {
      if (!data['success']) {
        this.usernameValid = false;
        this.usernameMessage = data['message'];
      } else {
        this.usernameValid = true;
        this.usernameMessage = data['message'];
      }
    });
  }


  ngOnInit() {
  }

}
