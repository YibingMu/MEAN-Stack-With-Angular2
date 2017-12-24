import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
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
    console.log(this.form);
  }

  ngOnInit() {
  }

}
