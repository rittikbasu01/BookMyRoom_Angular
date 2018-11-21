import { Component, OnInit, Input } from '@angular/core';
import { Store } from "src/app/store.model";
import { ConfirmbookingComponent } from "src/app/confirmbooking/confirmbooking.component";
import { Router } from "@angular/router";
import { ViewChild } from "@angular/core";
import { ConfirmserviceService } from "src/app/shared/confirmservice.service";
import { UserService } from "src/app/shared/user.service";
import Swal from 'sweetalert2';
import { User } from "src/app/shared/user.model";
import { Fav } from "src/app/showfavlist/showfavlist.component";
import { Review } from "src/app/shared/Review";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(public user:UserService, private route:Router, public auth:ConfirmserviceService) { }
  LoggedUser:User;
 objfav:Fav=new Fav;
 userdet1:User =new User();
 userdet2:User =new User();
 userdet:User =new User;
 addfav:any;
 Favdats:any;
 Favdats1:Store[];
 n:number=0;
 n1:number=0;
 id:number;
 num: number = 0;
 reviewdata: Review[];
 len: number = 0;


  @Input() public hotelInfo;
  ngOnInit() {
    this.LoggedUser = JSON.parse(localStorage.getItem('currentuser'));  
  }

  public Hotel: Store
  confirmBooking(BookedHotel:Store) {
    if(!this.LoggedUser){
      Swal({
        type: 'error',
        title: '<strong>Oops...<strong>',
        text: 'You need to Sign-Up/Login first'
      }).then((result) => {
        if (result.value) {
          this.route.navigate(['/BookMyRoom']);
        }
        }) 
      }
      else{
        localStorage.setItem('bookinghotel', JSON.stringify(BookedHotel));
       this.auth.provide_access(true);
            this.route.navigate(['/confirmbooking']);
      } 
  }



  // addData(event :any)
  // {
  //   if(event.target.checked)
  //     {
  //       if(!this.LoggedUser){
  //         Swal({
  //           type: 'error',
  //           title: '<strong>Oops...<strong>',
  //           text: 'You need to Sign-Up/Login first'
  //         }).then((result) => {
  //           if (result.value) {
  //             this.route.navigate(['/BookMyRoom']);
  //           }
  //           }) 
  //         }
  //         else{

            
  //             Swal({
  //               title: '<strong>Added to your Favorites!</strong>',
  //               type: 'success',
  //               confirmButtonText:
  //               '<i class="fa fa-thumbs-up"></i> OK',
                
  //             });

  //           this.userdet=JSON.parse(localStorage.getItem('currentuser'));
  //        this.objfav.userId=this.userdet.userId;
  //       this.objfav.hotelId = event.target.value;
  //       this.postvalues();
  //    // this.strnew.HotelId=parseInt(this.addFav) ;
  //     }
  //   }
  //     // else
  //     //   {
  //     //   //  this.Delete(this.id);

  //     //   }
  // }
  AddFav(id:number)
  {
    if(!this.LoggedUser){
      Swal({
        type: 'error',
        title: '<strong>Oops...<strong>',
        text: 'You need to Sign-Up/Login first'
      }).then((result) => {
        if (result.value) {
          this.route.navigate(['/BookMyRoom']);
        }
        }) 
      }
      else{

  this.userdet=JSON.parse(localStorage.getItem('currentuser'));
  this.objfav.userId=this.userdet.userId;
  this.objfav.hotelId = id;
  this.postvalues();
  }
}
   
  

postvalues()
{
   this.user.AddFavlist(this.objfav).subscribe(data => {this.addfav=data;},error =>{
     console.log(error);
   })
}

showReview(id:number)
{
this.num=id;
this.user.showReview(this.num).subscribe((x:Review[])=>
{
this.reviewdata=x;
this.len=this.reviewdata.length;
})
} 

}
