import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  bookLists: any = [];
  commentLists: any = [];
  message: string = "";

  anAuthor: any = "";
  first_name: string = "";
  last_name: string = "";
  email: string = "";
  location: string ="";
  id:number = 0;

  book_id:number = 0;

  constructor(private service: DashboardService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.service.getBooks()
      .subscribe(
        res => {
          this.bookLists = res;
          console.log("TTTTTTTT  " + this.bookLists);
        })//,
    //error => this.displayError(error));
  }

  getComments(id:number) {
    this.commentLists = [];
    this.service.getComments(id)
      .subscribe(
        res => {
          this.commentLists = res;
          console.log("TTTTTTTT  " + this.commentLists);
        })//,
    //error => this.displayError(error));
  }

  viewComment(id:number) {
    this.book_id = id;
  }

  onClickSubmit(data: NgForm) {
    this.createComment(data);
  }

  createComment(data: NgForm): void {

    console.log("test" + JSON.stringify(data));

    this.service.createCompany(data, this.book_id)
      .subscribe(
        data => {
          console.log(data);
          this.displaySuccess();
        },
        error => {
          console.log(error);
          this.displayError(error);
        })
  }

  getAnAuthor(id: number) {
    this.service.getAnAuthor(id)
      .subscribe(
        res => {
          this.anAuthor = res;
          console.log("TTTTTTTT  " + this.anAuthor);
          this.last_name = this.anAuthor.last_name;
          this.first_name = this.anAuthor.first_name;
          this.location = this.anAuthor.location;
          this.email = this.anAuthor.email;
          this.id = this.anAuthor.id;
        })//,
    //error => this.displayError(error));
  }

  displayError(error: Response) {
    this.message = "Contact the administrator",// error['message'] || "";//this._router.navigate(['/']); 
      setTimeout(() => {
        this.message = "";
      }, 5000
      );
  }

  displaySuccess() {
    this.message = "You have successfully added a comment";
    setTimeout(() => {
      this.message = "";
    }, 5000
    );
  }

}
