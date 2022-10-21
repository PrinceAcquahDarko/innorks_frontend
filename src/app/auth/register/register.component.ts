import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharingService } from 'src/app/shared/sharing.service';
import { AuthService } from '../auth.service';


function passwordMatcher(c: AbstractControl): { [key:string]: boolean } | null {

  const passwordControl = c.get('password');
  const confirmPassword = c.get('confirmPassword');

  if (passwordControl?.pristine || confirmPassword?.pristine){
    return null;
  }
  if (passwordControl?.value === confirmPassword?.value){
    return null
  }
  return {'match': true}
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {
  show = false;
  errormsg!: string

  registerForm: FormGroup = this.fb.group({

    firstname: ['', [Validators.required]],

    lastname: ['', [Validators.required]],

    email: ['', [Validators.required, Validators.email]],

    passwordGroup: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],

      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {validators: passwordMatcher}),

  })
  constructor(private fb: FormBuilder,private _as: AuthService,
     private router:Router, private _ds:SharingService) { }

  ngOnInit(): void {
  }

  registerUser(){
    if(this.registerForm?.valid){
      this.show = true;
      let data = this.formatValue()
      this._as.registerUser(data).subscribe(
        res => {
          this._ds.isUserLoggedIn.next(true)
          let user = this.userDetails(res.load)
          localStorage.setItem('user', JSON.stringify(user));
          this.show = false;
          this.router.navigate(['/'])
        },
        err => {
          console.log(err)
          this.errormsg = err.message;
          this.show = false

        }
      )
    }
  }

   formatValue(){
    return {
      firstname : this.registerForm.value.firstname,
      lastname : this.registerForm.value.lastname,
      email : this.registerForm.value.email,
      password : this.registerForm.value.passwordGroup.password
    }
  }

  userDetails(data:any){
    return{
      token:data.token,
      fullname : `${data.firstname}`,
      admin: data.admin
    }
  }

}
