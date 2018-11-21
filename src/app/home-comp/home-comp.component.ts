import  Swal  from 'sweetalert2';
import { History } from './../shared/history';
import { User } from 'src/app/shared/user.model';
import { UserService } from 'src/app/shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmserviceService } from "src/app/shared/confirmservice.service";

@Component({
  selector: 'app-home-comp',
  templateUrl: './home-comp.component.html',
  styleUrls: ['./home-comp.component.css']
})
export class HomeCompComponent implements OnInit {
LoggedUser:User;
socialprofile:boolean=false;
  constructor(private router: Router,public auth:ConfirmserviceService,public userservice: UserService) { }
name:any;
ngOnInit() {
 
  
  if(localStorage.getItem('loggingdetails')!=null)
    {
      this.userservice.LoggedUserDetails();
      this.socialprofile=true;
    }
    else{
      this.socialprofile=false;
    }
    if(localStorage.getItem('currentuser')!=null)
      {
        
        this.LoggedUser = JSON.parse(localStorage.getItem('currentuser'));
        this.name=this.LoggedUser.name.toString();
      }
      else{
        if(this.name==null || this.name==""){
          this.LoggedUser = JSON.parse(localStorage.getItem('currentuser'));
          this.name=this.LoggedUser.name;
        }
        else{
        this.name="Guest";
        }
      }
 
}

CheckUser()
{
if(this.name=="Guest"){
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
Profile()
{
  this.auth.provide_access(true);
  this.router.navigate(['/userProfile']);
}
  HistoryList()
  {
    this.auth.provide_access(true);
  this.router.navigate(['/previous']);
  }
  GoFav()
  {
    this.auth.provide_access(true);
    this.router.navigate(['/favlist']);
  }
go()
{
  this.auth.provide_access(true);
  this.router.navigate(['/Search']);
}
  Logout() {
    localStorage.removeItem('loggingdetails');
    localStorage.removeItem('currentuser');
    localStorage.removeItem('bookinghotel');
    localStorage.removeItem('socialuser');
   this.router.navigate(['/BookMyRoom']);
  
  }

}
