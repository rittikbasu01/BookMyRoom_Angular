import  Swal  from 'sweetalert2';
import { Component, OnInit,Inject, ViewEncapsulation } from '@angular/core';
import { UserService } from "src/app/shared/user.service";
import { User } from "src/app/shared/user.model";
import { Router } from "@angular/router";

import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ProfileName, ProfilePhnum, ProfilePass } from "src/app/user-profile/userProfile.model";


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class UserProfileComponent implements OnInit {

  nameForm:FormGroup;
  phoneForm:FormGroup;
  authenticationForm:FormGroup;
  verifyForm:FormGroup;
  matcher = new MyErrorStateMatcher();
  hide1:boolean;
  hide2:boolean;
  hide3:boolean;

  constructor(private userService:UserService,private FormBuild: FormBuilder) 
    {
      this.nameForm=FormBuild.group({
        
            'fName':[null,Validators.compose([Validators.required,Validators.minLength(5),Validators.max(30),
                  ,Validators.pattern("([A-Za-z]+)\\s*([A-Za-z]+)\\s*([A-Za-z]+)")])]

                                        
            // 'lName':[null,Validators.compose([Validators.required,
            //                             Validators.pattern("[a-zA-Z]+")])]
          });
          this.phoneForm=FormBuild.group({
            'phNum':[null,Validators.compose([Validators.required,
                                    Validators.pattern("[6789][0-9]{9}")])]
          });

          this.authenticationForm = this.FormBuild.group({
            'password': [null,Validators.compose([Validators.required,Validators.pattern("((?=.*\\d)(?=.*[a-z])(?=.*[@#$%!&'()*+,-./:;<=>?{}|~^]).{6,15})"),])],
            'confirmPassword': ['']
          }, { validator: this.checkPasswords });
    
          this.verifyForm=FormBuild.group({
            'verifyPassword':['', [Validators.required]]
          });

          // ----------------
    }

    checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  
  userDet:User; //Fetching from local storage
  userDetId:number;
  userDetPh:string;
  fName:string;
  // lName:string;
  y:any;

  ngOnInit() {
    this.ShowUser();

  }

  myFiles: File[] = [];
  isUploading = true; 
getFileDetails (e) {
  console.log (e);
  for (let i = 0; i < e.length; i++) {
  this.myFiles.push(e[i]);
  }
  } 
  uploadFiles () {
    const frmData = new FormData();
    for (let i = 0; i < this.myFiles.length; i++) {
    console.log (this.myFiles[i]);
    frmData.append('Image', this.myFiles[i], this.userDetId.toString());
    }
    
    this.userService.postImage(frmData).subscribe( (data) => {
      this.userService.LoggedUserDetails();
      this.ShowUser();
    console.log('done');
    this.isUploading = false;
    
    Swal({
    position: 'center',
    type: 'success',
    title: 'Success',
    text:  'Profile Picture uploaded successfully',
    showConfirmButton: false,
    timer: 4000
    });
    
    for (let i = 0; i < this.myFiles.length; i++) {
    this.myFiles.pop();
    }
    }); 
  
}
  userImage:any;
  ShowUser()//to show what user's name and phone number is.
  {
  this.userDet=JSON.parse(localStorage.getItem('currentuser'));
  this.userDetId=this.userDet.userId;
  this.userDetPh=this.userDet.mobileNo;
  this.userImage= this.userDet.profilepic;
  }
  myUserName = new ProfileName(); //model class object to pass fName and lName
  //Name Update Button
  editNameDetails(nameForm:FormGroup)
  {
      this.myUserName.fName=this.nameForm.get('fName').value;
      // this.myUserName.lName=this.nameForm.get('lName').value;
      this.myUserName.userId=this.userDetId;
      this.userService.putUserName(this.myUserName).subscribe(z=>
      {
        this.userService.LoggedUserDetails();
        Swal("FullName is Updated Successfully");
      },
    error => {
      Swal("Error occured while updating FullName")
    });
    }
  
    // Phone Update Button
 
    phNum:number;
    myUserPh=new ProfilePhnum();
    editPhoneDetails(phoneForm:FormGroup)
    {
      this.myUserPh.mobileNo=this.phoneForm.get('phNum').value;
      this.myUserPh.userId=this.userDetId;
      
      this.userService.putUserPhone(this.myUserPh).subscribe(z=>
      {
        this.userService.LoggedUserDetails();
        Swal("Phonenumber is successfully updated");
        this.authenticationForm.reset();
      },
    error => {
      Swal("Error occured while updating Phonenumber");
      this.authenticationForm.reset();
    });
    }
    

    myUserPass=new ProfilePass();

    editAuthenticationDetails(authenticationForm:FormGroup){
      
      this.myUserPass.oldPass=this.verifyForm.get('verifyPassword').value;
      this.myUserPass.newPass=this.authenticationForm.get('password').value;
      this.myUserPass.userId=this.userDetId;
this.userService.LoggedUserDetails();
     // console.log(this.myUserPass);
      this.userService.putUserPassword(this.myUserPass).subscribe(z=>
      {
        Swal("Password is successfully updated");
      },
    error => {
      Swal("Error occured while updating password")
    });
    }

}
