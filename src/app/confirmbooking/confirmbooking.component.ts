import { User } from 'src/app/shared/user.model';
import { ConfirmBooking } from './../shared/confirm-booking.model';
import { ConfirmserviceService } from './../shared/confirmservice.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from "@angular/forms";
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
import { Store } from "src/app/store.model";
import { EventEmitter } from "@angular/core";
import { Output } from "@angular/core";
import { CardComponent } from "src/app/card/card.component";
import { UserService } from "src/app/shared/user.service";
const swal= require('sweetalert2');

@Component({
  selector: 'app-confirmbooking',
  templateUrl: './confirmbooking.component.html',
  styleUrls: ['./confirmbooking.component.css']
})
export class ConfirmbookingComponent implements OnInit {
  confirmpagedata: Store;
  LoggedUser: User;
  public booking:ConfirmBooking={
    userId:null,
     roomId :null,
     bookingDate:'',
     checkInDate:null,
      checkOutDate :null,
      bookingAmount :null,
     discountAmount :null,
}
  
  constructor( private route: Router, public userservice: UserService,public auth:ConfirmserviceService) {

  }

 
  diff: any; //to find date difference
  increment:number;
  Roomcost: number;
  sum: number;
  RoomType = '';
  UserewardsDiscount: boolean;//button to disable use rewards
disableRewards:boolean;
 bookingbutton:boolean=true;
 public nameId: any;//to show number of guests
public  rewardsum:number;
latestrewards:number=0;
Loggeduser:User;  //Replacing serveice logged user;
  ngOnInit() {
    
this.bookingbutton=true;// Button is abled in ngoninit
    this.receivingValue(); // for accessing search page components

this.increment=0;
    this.GetRewardsPoint(); // calling function for service
     this.sum = this.nameId * this.diff * this.Roomcost; //Initiallly the sum
    // this.discount = 0;

this.rewardsum=0; // Rewards point to amount 
this.disableRewards=false;
  }
  dataupdate:any;//No use just used in subscribe
  public userrewardsupdate:User; // updating user rewards
  public book: ConfirmBooking; // object for sending values to webapi
 public RewardPoints: number=0; // used for storing rewards
 confirm() //confirm booking 
 {
 //
 this.book = new ConfirmBooking();
 this.book.discountAmount = this.booking.discountAmount;
 this.book.bookingAmount = this.booking.bookingAmount;
 this.book.checkInDate = this.booking.checkInDate;
 this.book.checkOutDate = this.booking.checkOutDate;
 this.book.roomId = this.confirmpagedata.roomId;
 this.book.userId=this.LoggedUser.userId;
 if(this.book.bookingAmount>100)
 {
 this.latestrewards= this.RewardPoints+(this.confirmpagedata.hotelPrice/100);
 }
 this.disableRewards=false;
 this.Loggeduser.rewardPoints=Math.round(this.latestrewards);

 Swal({
 title: 'Are you sure you want to book?',
 text: "You won't be able to revert this!",
 type: 'warning',
 showCancelButton: true,
 confirmButtonColor: '#3085d6',
 cancelButtonColor: '#d33',
 confirmButtonText: 'Yes, book it!'
 }).then((result) => {
 if (result.value) {
 this.userservice.Confirmbooking(this.book).subscribe(data => {
 if (data) {
   this.userservice.RoomBookingMapping(this.book).subscribe();
    
  this.userservice.updaterewards(this.Loggeduser).subscribe();
  this.bookingbutton=false;
 Swal({
 title: 'Booking is Confirmed',
 type: 'success',
 confirmButtonColor: '#3085d6',
 confirmButtonText: 'Ok'
 }).then((result) => {
 if (result.value) {
 if(localStorage.getItem('loggingdetails')!=null)
 {
 this.userservice.LoggedUserDetails();
 }
 else{
 this.userservice.SocialloginUser(this.Loggeduser).subscribe((x: User) => {
 localStorage.setItem('currentuser', JSON.stringify(x));
 })
 }
 this.route.navigate(['/Payment']);
 this.auth.access=true;
 }
 })
 }
 else{
 Swal("Booking is failed");
 this.route.navigate(['/Search']);
 }
 })
 }
 })
 } 
  GetRewardsPoint() //function to get reward points from service
  {
  
   this.LoggedUser=JSON.parse(localStorage.getItem('currentuser'));
  this.Loggeduser=JSON.parse(localStorage.getItem('currentuser'));
   this.RewardPoints=this.LoggedUser.rewardPoints;
    if (this.RewardPoints <25) {
      this.UserewardsDiscount = false;  // if no reward points we make button disable
    }

    else {
      this.UserewardsDiscount = true;
    }

  }


  public receivingValue() //  accessing previous page data
  {
    this.confirmpagedata =  JSON.parse(localStorage.getItem('bookinghotel'));
   // this.userservice.LoggedUserDetails();
    this.nameId = 1; 
    this.booking.checkInDate=new Date(new Date(this.confirmpagedata.hotelFromDate).getTime() + 86400000).toISOString().split("T")[0];
    this.booking.checkOutDate=new Date(new Date(this.confirmpagedata.hotelToDate).getTime() + 86400000).toISOString().split("T")[0];
    this.diff = Math.floor((Math.abs(new Date(this.confirmpagedata.hotelToDate).getTime() - new Date(this.confirmpagedata.hotelFromDate).getTime())/(1000 * 60 * 60  * 24)));
     this.Roomcost = this.confirmpagedata.hotelPrice;
     this.RoomType = this.confirmpagedata.hotelRoomType;
     this.booking.discountAmount=0;
   // this.booking.bookingAmount=this.nameId* this.diff * this.Roomcost;
   this.booking.bookingAmount= this.diff * this.Roomcost;
    

  }
  GuestAddition() //Function to add number of guests
  {
    if(this.nameId==2)
      {
    this.booking.bookingAmount=(( this.diff * this.Roomcost)+this.Roomcost/2) - this.booking.discountAmount;
   // this.booking.bookingAmount=this.nameId * this.diff * this.Roomcost - this.booking.discountAmount;
  }
  else{
    this.booking.bookingAmount=this.nameId * this.diff * this.Roomcost - this.booking.discountAmount;
  }
}
  UseRewards() //To use rewards 
  {  this.increment=this.increment+1;
    this.RewardPoints=this.RewardPoints-25;
    
    this.booking.discountAmount = this.booking.discountAmount+250;
    
    this.booking.bookingAmount=this.booking.bookingAmount-250;
if(this.RewardPoints<25 || this.booking.bookingAmount==0 ||this.increment==2)
    {
    this.UserewardsDiscount = false;
    if(this.increment==2)
      {
    this.disableRewards=true;
      }
      else
        {
          this.disableRewards=false;
        }
    }
    else{
      this.UserewardsDiscount=true;
    }
  }
  NotUseRewards()
  {
    this.increment=0;
   
    this.RewardPoints=this.RewardPoints+50;    
    this.booking.bookingAmount=this.booking.bookingAmount+500;
      this.booking.discountAmount=0;
    if((this.booking.discountAmount)<=0)
      {
        this.disableRewards=false;
        this.UserewardsDiscount=true;
      }
      }

  }


