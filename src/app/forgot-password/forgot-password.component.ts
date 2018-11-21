import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from "@angular/router";
import { Form } from "@angular/forms";
import {Validators,FormGroup,FormControl,FormBuilder} from '@angular/forms';
import { UserService } from "src/app/shared/user.service";
import Swal from 'sweetalert2';
import { User } from "src/app/shared/user.model";
import { ConfirmserviceService } from "src/app/shared/confirmservice.service";
const swal = require('sweetalert2');
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
regex="^[A-Za-z0-9_]+(?:\\.[a-zA-Z0-9]+)*@[A-Za-z]+\\.[A-Za-z]{2,64}$";
//email=new FormControl('');
email: '';
emailForm: FormGroup;
result:User[];
constructor(private router: Router, public emailBuild: FormBuilder,public userService: UserService, public auth:ConfirmserviceService) {
 this.emailForm=emailBuild.group({ 
    'email':new FormControl(null,[Validators.required,Validators.pattern(this.regex)])
 });

   }

   verifyMail(form: FormGroup)
   {
    swal({
      timer:10000,
      title:'Verifying your Email ID..',
      onOpen: () =>
      {
        swal.showLoading();
      }
    });

    this.userService.verifyEmail(form.value.email).subscribe((data:any) =>
    {
    sessionStorage.setItem('forgotpassword',JSON.stringify(data));
   

    if(data!=null)
    {
      Swal({
        title: '<strong>OTP sent to your mail!</strong>',
        type: 'success',
  
        confirmButtonText:
        'OK',
        confirmButtonAriaLabel: 'Thumbs up, great!',
  
      })
      this.userService.emailID=form.value.email;
      this.userService.generateOTP(form.value.email).subscribe((data:any) =>
    {
      this.userService.otp=data;
    
    });
   
      this.router.navigate(['/VerifyOTP']);
      this.auth.provide_access(true);
    }
    else
      {
        Swal({
          title: '<strong>Email ID is not registered</strong>',
          type: 'warning',
  
          confirmButtonText:
          'OK',
          confirmButtonAriaLabel: 'Thumbs up, great!',
 
        })
         this.emailForm.reset();
      }
    });
   
   }

  ngOnInit() {
  }

}
