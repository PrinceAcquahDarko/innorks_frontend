import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { BookdetailComponent } from '../bookdetail/bookdetail.component';
import { CreateBookComponent } from '../create-book/create-book.component';
import { UpdateBookComponent } from '../update-book/update-book.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';


const routes: Routes = [
 
  {
    path: '', component: HomeComponent
  },
 
  {
    path: 'bookdetail', component: BookdetailComponent
  },
  {
    path: 'create', component: CreateBookComponent
  },
  {
    path: 'update', component: UpdateBookComponent
  },
  

];

@NgModule({
  declarations: [
    HomeComponent,
    BookdetailComponent,
    CreateBookComponent,
    UpdateBookComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),

  ]
})
export class BookModule { }
