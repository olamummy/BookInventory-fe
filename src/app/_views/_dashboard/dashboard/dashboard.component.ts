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

  onClickSubmit(data: NgForm) {
    this.createCompany(data);
  }

  createCompany(data: NgForm): void {

    console.log("test" + JSON.stringify(data));

    this.service.createCompany(data, 1)
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
