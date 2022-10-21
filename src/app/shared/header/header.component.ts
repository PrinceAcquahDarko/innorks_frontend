import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharingService } from '../sharing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedIn!:boolean;

  constructor(private router:Router, private _ds: SharingService) {
    this._ds.isUserLoggedIn.subscribe(val => {
      this.loggedIn = val
    })
  //  this.userInfo =  JSON.parse(localStorage.getItem('user')!) ? 'logout' : 'login'
   }

  ngOnInit(): void {
  }

  home(){
    this.router.navigate([''])

  }

  login(){
    if(!this.loggedIn){
      this.router.navigate(['auth'])
   }else{
    localStorage.clear();
    window.location.reload()

     
   }
  }

  upload(){
    if(!this.loggedIn){
       this.router.navigate(['auth'])
    }else{
     this.router.navigate(['book/create'])
      
    }
  }



}
