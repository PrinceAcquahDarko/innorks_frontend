import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-bookdetail',
  templateUrl: './bookdetail.component.html',
  styleUrls: ['./bookdetail.component.scss']
})
export class BookdetailComponent implements OnInit {
  deletedmsg!:string
  userInfo:any;
  book:any
  bookId: any
  constructor(private route: ActivatedRoute, private _bs:BookService, private router:Router) { }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get("bookId")
    this.getBook();
  }

  updateBook(){
    this.router.navigate(['book/update', {bookId: this.bookId}])

  }


  deleteBook(){
    return this._bs.deletebook(this.bookId).subscribe(
      res => {
        // this.de
        this.router.navigateByUrl('/book', {state: {res:this.bookId}})


      },
      err => {
        this.deletedmsg = err.message
      }
    )
  
  }

  getBook(){
    return this._bs.getBookById(this.bookId).subscribe(
       res => {
         if(res.book){
          console.log(res)
         this.book = {...res.book}
         }else{
          this.book = res
         }
       },
       err => console.log(err)
     )
 }







}
