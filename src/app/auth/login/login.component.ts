import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SharingService } from 'src/app/shared/sharing.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild(NgForm) registerForm: NgForm | undefined
  errormsg!: string
  show = false

  get isValid(): boolean{
    return this.registerForm?.valid ? true : false
  }

  userCredentials = {
    email: '',
    password: ''
  }
  constructor(private _as:AuthService, private router: Router, private _ds: SharingService) { }

  ngOnInit(): void {
  }

  loginUser(){
    if(this.isValid){
      this.show = true
      this._as.loginUser(this.userCredentials).subscribe(
         (res) => {
          
          console.log(res)
          this._ds.isUserLoggedIn.next(true)
          let user = this.userDetails(res.load)
          localStorage.setItem('user', JSON.stringify(user));
          this.show = true;
          this.router.navigate(['/book'])

        },
        err => {
          this.errormsg = err.message;
          this.show = false;
        },
        () => {

        }
      )
    }
  }

  register(){
    this.router.navigate(['/auth/register'])

  }


    userDetails(data:any){
    return{
      token:data.token,
      fullname : `${data.firstname}`,
      admin: data.admin
    }
  }


}
