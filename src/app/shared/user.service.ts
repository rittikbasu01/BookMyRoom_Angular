import { History } from './history';
import { element } from 'protractor';
import { Injectable, ErrorHandler } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { User } from './user.model';
import { HttpHeaders, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { vaLogin } from "src/app/shared/login.model";
import { Store } from "src/app/store.model";
import { ConfirmBooking } from "src/app/shared/confirm-booking.model";

import { SocialUser } from "angularx-social-login";
import { Fav } from "src/app/showfavlist/showfavlist.component";
import { ProfileName, ProfilePhnum, ProfilePass } from "src/app/user-profile/userProfile.model";
import { UserManage } from "src/app/admin/manage-user/manage-user.component";
import { HotelManage } from "src/app/admin/manage-hotel/manage-hotel.component";
import { CityHotelDetailsFromAdmin } from "src/app/admin/add-hotel/hotel.component";
import { BookingManage } from "src/app/admin/manage-booking/manage-booking.component";
import { Review } from "src/app/shared/Review";


@Injectable({
  providedIn: 'root'
})
export class UserService implements ErrorHandler {
  Newuser: User;
  logindetails: User;
  admindetails: User;
  Bookingnumber:any;
 otp:string;
 emailID:string;
 handleError(error: HttpErrorResponse) {
  // if (error instanceof HttpErrorResponse) {


    if (error.status == 401)  // Error for Unauthorized
    {
      Swal({
        title: '<strong>Invalid Credentials !</strong>',
        type: 'warning',
      })
    }
    if (error.status == 409)   // Error for conflict
    {
      if (this.Newuser != null) {
        Swal({
          type: 'error',
          title: 'Oops...',
          text: 'UserName/Email already exists'
        });
      }
      else {
        Swal({
          type: 'error',
          title: 'Oops...',
          text: 'Please Give Correct Values'
        });
      }
    }
    if (error.status == 500) {
      Swal({
        type: 'error',
        title: 'Oops...',
        text: 'Internal Server Error'
      });

    }
    if (!navigator.onLine)    //Error for Server Error
    {
      Swal({
        type: 'error',
        title: 'Oops...',
        text: 'No Internet Connection!!!!!'
      });
    }
    if (error.status==406)    //Not Accepatable
      {
        Swal({
          type: 'error',
          title: 'Oops...',
          text: 'Room Already Booked'
        });
      }
      if (error.status==203)    //Not Accepatable
        {
          Swal({
            type: 'error',
            title: 'Oops...',
            text: 'Access Denied'
          });
        }
if(error.status==404)
{
  if(this.Bookingnumber!=0)
    {
      Swal({
        type: 'info',
        title: 'Oops...',
        text: 'You Didnot Make Any Bookings Yet.........!'
      });
    }
else{  Swal({
    type: 'error',
    title: 'Oops...',
    text: 'Particular Details NotFound'
  });
}
}
if (error.status==400)    //Bad Request
  {
    Swal({
      type: 'error',
      title: 'Oops...',
      text: 'UnAuthorized to move further'
    });
  }
   //}
}
  SearchUser: User;
  historyList: History[];
  booking: ConfirmBooking;
  selectedStore: Store = new Store;
  storeList: Store[];
  Loggeduser: User;
//rootUrl = 'https://bookmyroomfinalqajul18.azurewebsites.net';
  readonly rootUrl = 'http://localhost:57447';
  selectedUser: User = {
    userId: null,
    name: '',
    userName: '',
    email: '',
    password: '',
    gender: '',
    age: null,
    mobileNo: '',
    rewardPoints: 0,
    profilepic:''
  };
  selectedReview: Review = {
    rating: null,
    review: '',
    hotelId: null
  }


  constructor(private http: HttpClient) { }
  postUser(user: User) {

    this.Newuser = user;
    return this.http.post(this.rootUrl + '/api/UserDetails', user).pipe(catchError(this.handleError.bind(this)));

  }
  postImage(data:FormData)
  {
 
return this.http.post(this.rootUrl+'/api/UserDetails/SaveImage',data);
  }
  validate(logindetails: User) {

    this.logindetails = logindetails;
    return this.http.post(this.rootUrl + '/api/UserDetails/Validate', logindetails).pipe(catchError(this.handleError.bind(this)));
  }

  adminValidate(admindetails: User) {
    this.admindetails = admindetails;
    return this.http.post(this.rootUrl + '/api/UserDetails/CheckAdmin', admindetails).pipe(catchError(this.handleError.bind(this)));
    } 

  loggeduser: User;
  LoggedUserDetails() {
    this.loggeduser = JSON.parse(localStorage.getItem('loggingdetails'));

    this.http.post(this.rootUrl + '/api/UserDetails/LoggedUser', this.loggeduser).pipe(catchError(this.handleError.bind(this))).subscribe((x: User) => {
      this.Loggeduser = x;
      localStorage.setItem('currentuser', JSON.stringify(x));
    })
  }
  Searching(strnew: Store): Observable<Array<Store>> {

    return this.http.put<Array<Store>>(this.rootUrl + '/api/BookMyRoom', strnew).pipe(catchError(this.handleError.bind(this)));

  }
  Confirmbooking(obj: ConfirmBooking) {

    return this.http.post(this.rootUrl + '/api/BookMyRoom', obj).pipe(catchError(this.handleError.bind(this)));

  }
  RoomBookingMapping(obj: ConfirmBooking) {
    
    return this.http.post(this.rootUrl + '/api/BookMyRoom/RoomBokingMapping', obj).pipe(catchError(this.handleError.bind(this)));
    
 }
  updaterewards(obj: User) {
    return this.http.post(this.rootUrl + '/api/UserDetails/UpdateRewards', obj).pipe(catchError(this.handleError.bind(this)));
  }
  bookings(id: number) {
this.Bookingnumber=id;
    return this.http.get(this.rootUrl + '/api/BookingHistory/' + id).pipe(catchError(this.handleError.bind(this)));
  }
  cancel(bid: any): Observable<any> {
    
    return this.http.delete(this.rootUrl + '/api/BookingHistory/Cancel/' + bid).pipe(catchError(this.handleError.bind(this)));
  }
  putUserName(userName:ProfileName):Observable<ProfileName>
  {
  return this.http.put<ProfileName>(this.rootUrl+ '/api/UserDetails/UserProfileName',userName);
  }
  
  putUserPhone(userName:ProfilePhnum):Observable<ProfilePhnum>
  {
  return this.http.put<ProfilePhnum>(this.rootUrl+ '/api/UserDetails/UserProfilePhone',userName);
  }
  
  putUserPassword(userPass:ProfilePass):Observable<ProfilePass>
  {
  return this.http.put<ProfilePass>(this.rootUrl+ '/api/UserDetails/UserProfilePasssword',userPass);
  }
  SocialloginUser(social_to_user:User):Observable<any>
  {

return this.http.post(this.rootUrl+'/api/UserDetails/PostSocialuser',social_to_user);
  }

  AddFavlist(fav:Fav)
  { 
  return this.http.post(this.rootUrl+'/api/BookMyRoom/AddFavlist',fav);
  }
  DeletFav(data:number)
  {
  return this.http.delete(this.rootUrl+'/api/BookMyRoom/DeletFav/'+data);
  }
  showFav(data:number) : Observable<any>
  {
  return this.http.get(this.rootUrl+'/api/BookMyRoom/showFav/'+data);
  } 
  
  verifyEmail(email:string)
  {
   const params = new HttpParams().set('mail', email);
    return this.http.get(this.rootUrl+'/api/UserDetails/verifyMail', { params });
  }
  generateOTP(email:string)
  {
    const params= new HttpParams().set('mail',email);
    return this.http.get(this.rootUrl+'/api/UserDetails/GenerateOTP',{params});
  }

  UpdatePasswordByOTP(obj:User)
  {
    return this.http.post(this.rootUrl+'/api/UserDetails/UpdatePassword',obj);
  }

 
 fetchHotels(){
  return this.http.get<HotelManage[]>(this.rootUrl+'/api/Admin/ListOfHotelsForAdmin');
}
deleteHotel(id:number){
 return this.http.delete(this.rootUrl+'/api/Admin/DeleteHotel/'+id);
} 
fetchUser(){
  return this.http.get<UserManage[]>(this.rootUrl+'/api/Admin/ListOfUsers');
}
deleteUser(id:number){
 return this.http.delete(this.rootUrl+'/api/Admin/DeleteUser/'+id);
 } 
 editUser(data:UserManage){
   return this.http.put(this.rootUrl+'/api/Admin/EditUser',data);
 }
 fetchBookings(){
   return this.http.get<BookingManage[]>(this.rootUrl+'/api/Admin/ListOfBookings');
 }
 deleteBookings(id:number){
   return this.http.delete(this.rootUrl+'/api/Admin/DeleteBooking/'+id);
   }
   fetchListOfCity()
   {
   return this.http.get(this.rootUrl+'/api/Admin/ListOfCities');
   }
   
   fetchListOfHotelsNames()
   {
   return this.http.get(this.rootUrl+'/api/Admin/ListOfHotel');
   }
   
   addNewHotels(obj:CityHotelDetailsFromAdmin){
   return this.http.post(this.rootUrl+'/api/Admin/AddHotel',obj);
   } 
   postReview(rev: Review) {
   rev.hotelId = JSON.parse(sessionStorage.getItem('hotelId'));
   return this.http.post(this.rootUrl + '/api/BookingHistory/PostReview', rev).pipe(catchError(this.handleError.bind(this)));
   }
   UpdateHotel(form:FormData)
   {
     return this.http.put(this.rootUrl+'/api/Admin/UploadHotelImage',form);
   }
   showReview(data:number) : Observable<any>
   {
   return this.http.get(this.rootUrl+'/api/BookingHistory/showReview/'+data);
   }   
    
   

  
}
