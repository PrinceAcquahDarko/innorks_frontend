import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, tap, throwError } from 'rxjs';
import { BookService } from '../book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userInfo = JSON.parse(localStorage.getItem('user')!)
  
  nav:any
  errormsg!:string

  allBooks$ = this._bs.getAllBooks().pipe(
    map(x => x.allbooks),
    tap(x => console.log(x)),
    catchError(err => {
      this.errormsg = 'an unexpected error occured please try again later'
      return throwError(err)
    })
  );
  constructor(private _bs:BookService, private router:Router,) { }

  ngOnInit(): void {
  

  }

  bookdetail(id:string){
    if(this.userInfo){
      return this.router.navigate(['bookdetail', {bookId: id}])
    }
    return this.router.navigate(['auth'])
  }

}
