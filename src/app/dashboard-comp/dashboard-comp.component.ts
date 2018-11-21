import { User } from 'src/app/shared/user.model';
import { ConfirmserviceService } from 'src/app/shared/confirmservice.service';
  import { Component, OnInit } from '@angular/core';
  import { Router, ActivatedRoute } from '@angular/router';
  import { UserService } from '../shared/user.service';
  import { NgForm } from '@angular/forms';
  import Swal from 'sweetalert2';
  const swal= require('sweetalert2');
  import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
  import {
    AuthService,
    SocialUser,
    FacebookLoginProvider,
    GoogleLoginProvider
  } from 'angularx-social-login';

  @Component({
    selector: 'app-dashboard-comp',
    templateUrl: './dashboard-comp.component.html',
    styleUrls: ['./dashboard-comp.component.css'],
    providers: [UserService]
  })
  export class DashboardCompComponent implements OnInit {

    private user: SocialUser;
    private socialuser:User;
    public email:string;
    public username:string;
    public authorized: boolean = false;
social_to_Normal:User;
    constructor(public spinnerService: Ng4LoadingSpinnerService, public userService: UserService, private router: Router, private route: ActivatedRoute, public socialAuthService: AuthService, public confirm:ConfirmserviceService, public auth: ConfirmserviceService) { }

    //===============================================SIGNUP====================================================//
    emailPattern="^[A-Za-z0-9_]+(?:\\.[a-z0-9A-Z]+)*@[A-Za-z]+\\.[A-Za-z]{2,64}$";
    agePattern = "^(1[89]|[2-9][0-9])$";
    genders: string[];
    mobPattern = "[6789][0-9]{9}";
    userPattern = "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{3,15}$";
    passwordPattern = "((?=.*\\d)(?=.*[a-z])(?=.*[@#$%!&'()*+,-./:;<=>?{}|~^]).{6,15})"; 
    // passwordPattern = "((?=.*\\d)(?=.*[a-z])(?=.*[!#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{6,15})";
    fullnamePattern = "([A-Za-z]+)\\s*([A-Za-z]+)\\s*([A-Za-z]+)";
    ngOnInit() {
      localStorage.removeItem('loggingdetails');
      localStorage.removeItem('currentuser');
      localStorage.removeItem('bookinghotel');
      localStorage.removeItem('socialuser');
      this.resetForm();

      this.genders = ['Male', 'Female', 'Others'];

    }
    resetForm(form?: NgForm) {
      if (form != null)
        form.resetForm();
      this.userService.selectedUser = {
        userId: null,
        name: '',
        userName: '',
        email: '',
        password: '',
        gender: '',
        age: null,
        mobileNo: '',
        rewardPoints: null,
        profilepic:''

      }
      this.social_to_Normal = {
        userId: 0,
        name: '',
        userName: '',
        email: '',
        password: '',
        gender: '',
        age: 0,
        mobileNo: '',
        rewardPoints: 0,
        profilepic:''
      }

    }
    onSubmit(form: NgForm) {
      swal({
        timer:4000,
        title:'Keep Calm!',
        onOpen: () =>
        {
          swal.showLoading();
        }
      });



      this.userService.postUser(form.value) .subscribe((data) => {
          if (data) {
            this.resetForm(form);
            Swal({
              title: '<strong>Registration Successful</strong>',
              type: 'success',
              html: '<b> You can now go and Login </b>',
    
              focusConfirm: false,
              confirmButtonText:
              '<i class="fa fa-thumbs-up"></i> OK',
              confirmButtonAriaLabel: 'Thumbs up, great!',
    
    
            })
          } })
        }
  
    

    openLogin() {
      document.getElementById("login_modal").style.display = "block";
    }

    openAdmin() {
      document.getElementById("admin_modal").style.display = "block";
    }
  
    adminSubmit(form: NgForm) {
      swal({
        timer: 15000,
        title: 'Verifying..',
        onOpen: () => {
          swal.showLoading();
        }
      });
  
      this.userService.adminValidate(form.value).subscribe(data => {
  
        if (data) {
         // localStorage.setItem('loggingdetails', JSON.stringify(form.value));
          //this.userService.LoggedUserDetails();
          this.auth.provide_access(true);
          this.resetForm(form);
  
          Swal({
            title: '<strong> Access Granted !</strong>',
            type: 'success',
  
            confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> OK',
            confirmButtonAriaLabel: 'Thumbs up, great!',
          })
            .then((result) => {
              if (result.value) {
                this.auth.provide_access(true);
                this.router.navigate(['/admin']);
                document.getElementById("admin_modal").style.display = "none";
              }
            });
        }
      })
    }
  

    //==================================Social Login=====================================//
    public socialSignIn(socialPlatform: string) {
      
      var socialPlatformProvider;
      if (socialPlatform == "facebook") {
        socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
      } 
      if (socialPlatform == "google") {
        socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
      }
      this.spinnerService.show();
      this.socialAuthService.signIn(socialPlatformProvider).then(
        (userData) => {
          
          console.log(socialPlatform + " sign in data : ", userData);
          
         this.social_to_Normal.email=userData.email.toString();
         this.social_to_Normal.userName=userData.name.toString();
         this.social_to_Normal.age=20;
         this.social_to_Normal.gender="Male";
         this.social_to_Normal.mobileNo="9876543299";
         this.social_to_Normal.name=userData.firstName;
         this.social_to_Normal.rewardPoints=10;
         this.social_to_Normal.password="BookMyRoom@123";
        this.userService.SocialloginUser(this.social_to_Normal).subscribe((x: User) => {
            localStorage.setItem('currentuser', JSON.stringify(x));
            this.router.navigate(['/Search']);
            this.confirm.provide_access(true);
           
            this.spinnerService.hide();
           
        })
         
         
       
         

        }
      );
    }
GuestMode()
{
  this.router.navigate(['/Search']);
  this.confirm.access=true;
}
  

  }
