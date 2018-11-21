import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FormControl } from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject } from "@angular/core";
import { UserService } from "src/app/shared/user.service";
import Swal from 'sweetalert2';
export interface DialogData1 {
  cityName: string;
}
export interface DialogData2 {
  hotelName: string;
}
export class CityHotelDetailsFromAdmin{
  cityName:string;
  hotelName:string;
  hotelRating:number;
  hotelAddress:string;
  numberOfSingleRooms:number;
  priceOfSingleRoom:number;
  numberOfDoubleRooms:number;
  priceOfDoubleRoom:number;
  } 

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {
  myControl = new FormControl();
  cityName: string;
  hotelName:string;
  // cityoptions: string[] = ['Bhubaneswar', 'Mumbai', 'Delhi','Bangalore','Chennai','Kolkata'];
  cityoptions:string[]; 
  // hotelNameOptions:string[]=['Marriot','MayFair','Trident','HotelInn']
  hotelNameOptions:string[]; 
  hotelRatingOptions:number[]=[1,2,3,4,5];
  hotelAddValue = '';
  hotelStar:number;
  citySelect:string;
  hotelAddressValue:string;
  singleAcPrice:number;
  singleNonAcPrice:string;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;



  constructor(private _formBuilder: FormBuilder,public dialog: MatDialog,private hotelService:UserService) {
    this.firstFormGroup = this._formBuilder.group({
      'citySelect': [null, Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      'hotelName': [null, Validators.required],
      'hotelStar':[null, Validators.required],
      'hotelAddressValue':[null, Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      'singleAcPrice':[null],
      'singleNonAcPrice':[null]
    });
  }
    //============================
    recieveDetails(){
      this.recieveCityOptions();
      this.recieveHotelOptions();
      } 
    recieveCityOptions()
    {
    this.hotelService.fetchListOfCity().subscribe((data:string[])=>
    {
    this.cityoptions=data;
    });
    }
    
    recieveHotelOptions()
    {
    this.hotelService.fetchListOfHotelsNames().subscribe((data:string[])=>
    {
    this.hotelNameOptions=data;
    });
    } 
    // =========================
    hotelInfo=new CityHotelDetailsFromAdmin();
    
  
    submitNewHotel(firstFormGroup:FormGroup,secondFormGroup:FormGroup,
      thirdFormGroup:FormGroup){
        if(
          (this.singleAcCount+this.singleNonAcCount)<1||
          (this.singleAcCount>0&&this.thirdFormGroup.get('singleAcPrice').value<=0)||
          (this.singleNonAcCount>0&&this.thirdFormGroup.get('singleNonAcPrice').value<=0)
        ){
          alert("Make sure hotel room has price associated with it");
        }
        else{
         
            this.hotelInfo.cityName=this.firstFormGroup.get('citySelect').value;
            this.hotelInfo.hotelName=this.secondFormGroup.get('hotelName').value;
            this.hotelInfo.hotelRating=this.secondFormGroup.get('hotelStar').value;
            this.hotelInfo.hotelAddress=this.secondFormGroup.get('hotelAddressValue').value;
            this.hotelInfo.numberOfSingleRooms=this.singleAcCount;
            this.hotelInfo.priceOfSingleRoom=this.thirdFormGroup.get('singleAcPrice').value;
            this.hotelInfo.numberOfDoubleRooms=this.singleNonAcCount;
            this.hotelInfo.priceOfDoubleRoom=this.thirdFormGroup.get('singleNonAcPrice').value;
          
          this.hotelService.addNewHotels(this.hotelInfo).subscribe(data=>{
          if(data)
            {
              Swal({
                title: '<strong>Hotel Added Successfully!</strong>',
                type: 'success',
        
                confirmButtonText:
                '<i class="fa fa-thumbs-up"></i> OK',
                confirmButtonAriaLabel: 'Thumbs up, great!',
       
              })
            }
          });
        }
  }
 



  
  // ==========================
  singleAcCount = 0;

  addSingleAcCount(){
      return this.singleAcCount += 1;
  }
  subtractSingleAcCount(){
    if(this.singleAcCount>0){
    return this.singleAcCount -= 1;
    }
  }
  // --------------
  singleNonAcCount = 0;
  addSingleNonAcCount(){
    return this.singleNonAcCount += 1;
  }
  subtractSingleNonAcCount(){
    if(this.singleNonAcCount>0){
    return this.singleNonAcCount -= 1;
  }
}
  // =============================



  ngOnInit() {
    this.recieveDetails();
  }



  cityDialog(): void {
    const dialogRef = this.dialog.open(AddingCityDialog, {
      width: '275px',
      data: {cityName: this.cityName}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.cityName = result;
      this.cityoptions.push(result);
    });
  } 
  hotelNameDialog(){
    const dialogRef = this.dialog.open(AddingHotelNameDialog, {
      width: '275px',
      data: {hotelName: this.hotelName}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.hotelName = result;
      this.hotelNameOptions.push(result);
    });
  }
}
// =================================================================================
// ----------------------------Adding new City Dialog------------------------------
// =================================================================================
@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
  <div mat-dialog-content>
  <p>What's the name of New City?</p>
  <mat-form-field>
    <input matInput [(ngModel)]="data.cityName">
  </mat-form-field>
</div>
<div mat-dialog-actions>
  <button mat-button (click)="onNoClick()">No Thanks</button>
  <button mat-button [mat-dialog-close]="data.cityName" cdkFocusInitial>Ok</button>
</div>  
  `,
})

export class AddingCityDialog {
  constructor(
    public dialogRef: MatDialogRef<AddingCityDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData1) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

// ----------------------------Adding new HotelName Dialog------------------------------
@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
  <div mat-dialog-content>
  <p>What's the name of New Hotel?</p>
  <mat-form-field>
    <input matInput [(ngModel)]="data.hotelName">
  </mat-form-field>
</div>
<div mat-dialog-actions>
  <button mat-button (click)="onNoClick()">No Thanks</button>
  <button mat-button [mat-dialog-close]="data.hotelName" cdkFocusInitial>Ok</button>
</div>  
  `,
})

export class AddingHotelNameDialog {
  constructor(
    public dialogRef: MatDialogRef<AddingHotelNameDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData2) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}