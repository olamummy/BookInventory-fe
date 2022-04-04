import { Component, OnInit } from '@angular/core';
import { AuthorService } from './author.service';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  authorLists: any = [];
  bookLists: any = [];
  message: string = "";
  anAuthor: any = "";
  first_name: string = "";
  last_name: string = "";
  email: string = "";
  location: string ="";
  id:number = 0;

  constructor(private service: AuthorService) { }

  ngOnInit(): void {
    this.getAuthors();
  }

  getAuthors() {
    this.service.getAuthors()
      .subscribe(
        res => {
          this.authorLists = res;
          console.log("TTTTTTTT  " + this.authorLists);
        })//,
    //error => this.displayError(error));
  }

  getbooks(id: number) {
    this.bookLists = [];
    this.service.getbooks(id)
      .subscribe(
        res => {
          this.bookLists = res;
          console.log("TTTTTTTT  " + this.bookLists);
        })//,
    //error => this.displayError(error));
  }

  onClickSubmit(data: NgForm) {
    this.createAuthor(data);
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

  createAuthor(data: NgForm): void {

    console.log("test" + JSON.stringify(data));

    this.service.createAuthor(data)
      .subscribe(
        data => {
          console.log(data);
          this.displaySuccess();
          this.getAuthors;
        },
        error => {
          console.log(error);
          this.displayError(error);
        })
  }

  updateAuthor(data: NgForm): void {

    this.service.updateAuthor(data, this.id)
      .subscribe(
        data => {
          console.log(data);
          this.displaySuccess();
          this.getAuthors;
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
    this.message = "You have successfully added a comment";
    setTimeout(() => {
      this.message = "";
    }, 5000
    );
  }

}
