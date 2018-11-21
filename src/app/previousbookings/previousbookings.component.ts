
import { History } from 'src/app/shared/history';
import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/shared/user.service";
import { Router } from "@angular/router";
import  Swal  from 'sweetalert2';
import { User } from "src/app/shared/user.model";
const swal= require('sweetalert2');
@Component({
  selector: 'app-previousbookings',
  templateUrl: './previousbookings.component.html',
  styleUrls: ['./previousbookings.component.css']
})
export class PreviousbookingsComponent implements OnInit {

  public today: Date = new Date();
  public date: number = this.today.getDate();
  public month: number = this.today.getMonth()+1; 
 

  constructor( private userService: UserService,private router: Router) { }
  hotelnew: History = new History();
  historyData: Array<History>
  minDate = new Date();
  Loggeduser:User;
  Disable: boolean=false;
  public todayDate: string = (new Date()).toISOString().split("T")[0];
  ngOnInit() {
    this.hello();

  }
  hello(){
  this.Loggeduser=JSON.parse (localStorage.getItem('currentuser'));
    this.userService.bookings(this.Loggeduser.userId).subscribe((data:History[]) => {
      this.historyData = data;
      if(this.historyData.length==0)
        {
          Swal("No Bookings Yet");
        }
      this.Disable=true;
  });
}
clear(bid: any){
  swal({
    timer:10000,
    title:'Cancelling in process..',
    onOpen: () =>
    {
      swal.showLoading();
    }
  });

  this.userService.cancel(bid).subscribe(
    x=>{
      this.hello();
      if(x)
        {
          Swal("Your Booking is Cancelled Successfully");
        }
    }

  );

}
 
onReview(hid: number){
  sessionStorage.setItem('hotelId',JSON.stringify(hid));
  this.router.navigate(['/review']);
}
}



