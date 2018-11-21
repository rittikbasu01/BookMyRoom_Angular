import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Form } from "@angular/forms";
import {Validators,FormGroup,FormControl,FormBuilder} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UserService } from "src/app/shared/user.service";
import Swal from 'sweetalert2';
import { User } from "src/app/shared/user.model";
const swal= require('sweetalert2');
@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOTPComponent implements OnInit {
Otp:number;
passwordPattern =  "((?=.*\\d)(?=.*[A-Za-z@#$%!&'()*+,-./:;<=>?{}|~^])(?=.*[@#$%!&'()*+,-./:;<=>?{}|~^]).{6,15})";
newPassword:string='';
GenOtp:string;
OtpError=false;
FieldDisable=true;
ButtonDisable=true;
SmallValue1=true;
SmallValue2=false;
UpdateResult=true;
LoggedUser: User;
OtpField= false;
ForgotUpdate:User;

  constructor(public userService: UserService, public router:Router,public PasswordBuild: FormBuilder) { }

  ngOnInit() {
  
  this.ButtonDisable=true;
 this.SmallValue2=true;
  }

  verifyOTP()
{
  if (this.GenOtp==this.userService.otp)
    {
      this.FieldDisable=false;
      this.ButtonDisable = false; 
      this.OtpError=true;
      Swal({
        title: '<strong>OTP successfully Verified!</strong>',
        type: 'success',
        confirmButtonText:
        'OK',
    
  
      })
    }
    else{
     
      this.OtpField=true;
      Swal({
        title: '<strong>OTP does not match</strong>',
        type: 'error',
        confirmButtonText:
        'OK',
      
  
      })
    
    }
    
}
UpdatePassword()
{
this.ForgotUpdate=JSON.parse(sessionStorage.getItem('forgotpassword'));
this.ForgotUpdate.password=this.newPassword;
  this.userService.UpdatePasswordByOTP(this.ForgotUpdate).subscribe(data =>
  {
    

    if(data)
      {
        this.UpdateResult=false;
        Swal({
          title: '<strong>Password updated successfully! Go ahead and login with New Password!</strong>',
          type: 'success',
          confirmButtonText:
          'OK',
          confirmButtonAriaLabel: 'Thumbs up, great!',
    
        })
        
        this.router.navigate(['/BookMyRoom']);

      }
      else{

        Swal({
          title: '<strong>Password not updated! Please try again!</strong>',
          type: 'warning',
    
          confirmButtonText:
          'OK',
          confirmButtonAriaLabel: 'Thumbs up, great!',
    
        })

      }
  })
}
}
