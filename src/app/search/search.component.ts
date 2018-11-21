import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Store } from "src/app/store.model";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "src/app/shared/user.model";
import { UserService } from "src/app/shared/user.service";
import { DatePipe } from '@angular/common'
const swal= require('sweetalert2');
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  searchfilter: Store = new Store();
bookingperiod:any;
bookingdiffernce:any;
latestone:any;
cityoptions:string[];
  constructor(private userservice: UserService, private router: Router,public datepipe: DatePipe) { 
   
  }
  recieveCityOptions()
  {
  this.userservice.fetchListOfCity().subscribe((data:string[])=>
  {
  this.cityoptions=data;
  });
  }
  socialprofile:boolean=false;
maxstay:number;
  searchData: Array<Store>;
  public todayDate: string = (new Date()).toISOString().split("T")[0];
  public tomorrowDate: string = new Date(new Date().getTime() + 86400000).toISOString().split("T")[0];
  errormsg: string;
  LoggedUser: User;
  name: any;
  maxDate:string=new Date(new Date().getTime() + 7776000000).toISOString().split("T")[0];
myDate = new Date();
  ngOnInit() {
    this.recieveCityOptions();
    if(localStorage.getItem('loggingdetails')!=null)
      {
        this.socialprofile=true;
       this.recieveCityOptions()
      }
   this.searchfilter.hotelCity= this.cityoptions[0];
    this.searchfilter.hotelToDate = this.tomorrowDate;
    this.searchfilter.hotelFromDate = this.todayDate;
    this.searchfilter.hotelRoomType = "Single";
    this.LoggedUser = JSON.parse(localStorage.getItem('currentuser'));
    if(this.LoggedUser)
      this.name = this.LoggedUser.name;
      else{
      this.name ='Guest';
      } 
   
  }

  CheckUser()
  {
  if(!this.LoggedUser){
  Swal({
  type: 'error',
  title: '<strong>Oops...<strong>',
  text: 'You need to Sign-Up/Login first'
  }).then((result) => {
  if (result.value) {
  this.router.navigate(['/BookMyRoom']);
  }
  }) 
  }
}
  show(form: NgForm) {
    this.bookingperiod=Math.floor((Math.abs(new Date(this.searchfilter.hotelToDate).getTime() -new Date(this.searchfilter.hotelFromDate).getTime())/(1000 * 60 * 60  * 24)));
    this.maxstay =new Date( this.searchfilter.hotelToDate).getDate() - new Date(this.searchfilter.hotelFromDate).getDate();
    swal({
      timer:3000,
      title:'Searching..',
      onOpen: () =>
      {
        swal.showLoading();
      }
    });

    this.userservice.Searching(form.value).subscribe(data => {
      this.searchData = data;
      if(this.searchData.length==0 && (this.searchfilter.hotelFromDate > this.searchfilter.hotelToDate))
        {
          Swal("CheckIn Date cannot be prior to CheckOut Date");
        }
      if(this.searchData.length==0 &&(this.bookingperiod)>90)
        {
          Swal("Oops! You cannot book a romm beyond 90 days from today!");
        }
      if (this.searchData.length == 0 && (this.searchfilter.hotelFromDate < this.todayDate)||(this.searchfilter.hotelToDate < this.todayDate) ) {
        Swal("Invalid Check In / Check Out Date");
      }
      if (this.searchData.length == 0 && (this.searchfilter.hotelFromDate == this.searchfilter.hotelToDate) && (this.searchfilter.hotelFromDate != '') && (this.searchfilter.hotelToDate != '')) {
        Swal("Checkout Date and CheckIn date Should not be same");
      }
      if (this.searchData.length == 0 && (this.searchfilter.hotelFromDate == '' || this.searchfilter.hotelToDate == ''  ) )
        Swal("Invalid Check In / Check Out Date");
      if (this.searchData.length == 0 && this.searchfilter.hotelFromDate < this.searchfilter.hotelToDate && this.searchfilter.hotelFromDate != this.searchfilter.hotelToDate && this.searchfilter.hotelFromDate >= this.todayDate && this.bookingperiod<=90 && this.maxstay<=14) {
        Swal("No Rooms Available");
      }
      if(this.searchData.length==0 && this.bookingperiod>14&& (this.searchfilter.hotelFromDate < this.searchfilter.hotelToDate) &&(this.searchfilter.hotelFromDate>=this.todayDate && this.searchfilter.hotelToDate>=this.tomorrowDate))
        {
          Swal("Sorry, your stay is restricted to 2 weeks!");
        }
    });

  }
  Logout() {
    localStorage.removeItem('loggingdetails');
    localStorage.removeItem('currentuser');
    localStorage.removeItem('bookinghotel');
    localStorage.removeItem('socialuser');
    this.router.navigate(['/BookMyRoom']);
  }
  btnClick(){
    this.router.navigate(['/previous']);
  }

}
