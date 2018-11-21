import { Component, OnInit } from '@angular/core';
import { User } from "src/app/shared/user.model";
import { UserService } from "src/app/shared/user.service";
import { Store } from "src/app/store.model";

import { Router } from "@angular/router";
import { ConfirmserviceService } from "src/app/shared/confirmservice.service"; 
import Swal from 'sweetalert2';
import { Favourites } from "src/app/showfavlist/Favourites";
export  class  Fav {
  hotelId:number;
  userId:number;
  
  } 

@Component({
  selector: 'app-showfavlist',
  templateUrl: './showfavlist.component.html',
  styleUrls: ['./showfavlist.component.css']
})
export class ShowfavlistComponent implements OnInit {
  
  LoggedUser:User;
  objfav:Fav=new Fav;
  userdet1:User =new User();
  userdet2:User =new User();
  userdet:User =new User;
  addfav:any;
  Favdats:Favourites[];
  Favdats1:Store[];
  n:number=0;
  n1:number=0;
  id:number;
  constructor(public user:UserService,private router: Router,public auth:ConfirmserviceService) { }
  name:any;
  ngOnInit() {
    this.Display();
  }
  Display()
  {
  this.userdet=JSON.parse(localStorage.getItem('currentuser'));
  this.n=this.userdet.userId;
  this.user.showFav(this.n).subscribe((x:Favourites[]) =>{ this.Favdats=x;
   console.log(x);
    if(this.Favdats.length==0)
      {
  Swal("No favourites Yet");
      }
  });
  }
  Delete(id:number)
  {
  this.userdet1=JSON.parse(localStorage.getItem('currentuser'));
 
  this.user.DeletFav(id)
  .subscribe(x =>
  {

  this.Display();
  if(x)
    {
      Swal('Delete sucessfully');
    }
  })
  } 
  Logout() {
    localStorage.removeItem('loggingdetails');
    localStorage.removeItem('currentuser');
    localStorage.removeItem('bookinghotel');
    this.router.navigate(['/BookMyRoom']);
    }
    Search()
    {
    this.router.navigate(['/Search']);
    }
    confirmBooking(BookedHotel:Store){
      localStorage.setItem('bookinghotel',JSON.stringify(BookedHotel));
      this.auth.provide_access(true);
        this.router.navigate(['/confirmbooking']);
    }
  }
  