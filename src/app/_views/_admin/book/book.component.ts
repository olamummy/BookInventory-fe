import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  authorLists: any = [];
  bookLists: any = [];
  commentLists: any = [];
  message: string = "";
  aBook: any = "";
  title: string = "";
  author_id: number = 0;
  id: number = 0;

  constructor(private service: BookService) { }

  ngOnInit(): void {
    this.getBooks();
    this.getAuthors()
  }

  getBooks() {
    this.service.getBooks()
      .subscribe(
        res => {
          this.bookLists = res;
        })//,
    //error => this.displayError(error));
  }

  getAuthors() {
    this.service.getAuthors()
      .subscribe(
        res => {
          this.authorLists = res;
        })//,
    //error => this.displayError(error));
  }

  onClickSubmit(data: NgForm) {
    this.createBook(data);
  }

  getABook(id: number) {
    this.service.getABook(id)
      .subscribe(
        res => {
          this.aBook = res;
          this.author_id = this.aBook.author_id;
          this.title = this.aBook.title;
          this.id = this.aBook.id;
        })//,
    //error => this.displayError(error));
  }

  getComments(id: number) {
    this.commentLists = [];
    this.service.getComments(id)
      .subscribe(
        res => {
          this.commentLists = res;
        })//,
    //error => this.displayError(error));
  }

  createBook(data: NgForm): void {

    this.service.createBook(data)
      .subscribe(
        data => {
          console.log(data);
          this.displaySuccess();
          this.getBooks();
        },
        error => {
          console.log(error);
          this.displayError(error);
        })
  }

  updateBook(data: NgForm): void {

    this.service.updateBook(data, this.id)
      .subscribe(
        data => {
          console.log(data);
          this.displaySuccess();
          this.getBooks();
        },
        error => {
          console.log(error);
          this.displayError(error);
        })
  }

  displayError(error: Response) {
    this.message = "Contact the administrator",// error['message'] || "";//this._router.navigate(['/']); 
      setTimeout(() => {
        this.message = "";
      }, 5000
      );
  }

  displaySuccess() {
    this.message = "Successfully!!";
    setTimeout(() => {
      this.message = "";
    }, 5000
    );
  }

}
