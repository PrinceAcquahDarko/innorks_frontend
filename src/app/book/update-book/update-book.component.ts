import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.scss']
})
export class UpdateBookComponent implements OnInit {
  errormsg = ''
  show = false;
  book:any
  bookId:any
  filedetails = {
    title: '',
    author: '',
    category: '',
    Image: ''
  }

  selectImage(event: any){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.filedetails.Image = file;
    }
  }
  constructor(private _bs:BookService,private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get("bookId")
    this.getBook();
  }

  
  getBook(){
    return this._bs.getBookById(this.bookId).subscribe(
       res => {
        console.log(res, 'from update')
         if(res.book){
         this.filedetails.author = res.book.author;
          this.filedetails.title = res.book.title;
          this.filedetails.category = res.book.category;
         }
       },
       err => console.log(err)
     )
 }

 updateBook(){
   this.show = true
   if(this.filedetails.Image){
     const formdata = new FormData()
     formdata.append('Image', this.filedetails.Image)
     formdata.append('title', this.filedetails.title)
     formdata.append('author', this.filedetails.author)
     formdata.append('category', this.filedetails.category)
     this._bs.updateBook(formdata, this.bookId).subscribe(
       res => {
        console.log(res)

         this.show = false;
       this.router.navigateByUrl('/')

 
       },
       err => {
         this.errormsg = err.message;
         this.show = false;
       }
     )
   }else{
     this._bs.updateBook(this.filedetails, this.bookId).subscribe(
       res => {
        console.log(res)
         this.show = false;
       this.router.navigateByUrl('/')

 
       },
       err => {
         this.errormsg = err.message;
         this.show = false;
       }
     )
   }
  
   

 }

}
