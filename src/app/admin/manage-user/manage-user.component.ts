import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { UserService } from "src/app/shared/user.service";
import { Inject } from "@angular/core";
import { HotelManage } from "src/app/admin/manage-hotel/manage-hotel.component";


export class UserManage{
  userID:number;
  userFullName: string;
  userEmail:string;
  userPhone:string;
  rewardPoints:number;
}


@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {
  userList:UserManage[]=[];
  //name:string;
  rewards:number;
   constructor(private hotelService:UserService,public dialog: MatDialog) { }
 
   dataSource:any;
    receiveUser(){
      this.hotelService.fetchUser().subscribe(data=>{
       this.dataSource = new MatTableDataSource(data);
     })
       
    }

    deleteUser(id:number){
      if(confirm('Are you sure to delete this record?')==true){
      this.hotelService.deleteUser(id).subscribe(x=>{
        this.receiveUser()
      });
      }
      }
      datas = new UserManage();
      rewardPoints:number;
      userId:number;
      id:number;
      //rewards:number;
      name:string;
      editUser(element:any){
  
        alert("Are you sure?");
        const dialogRef = this.dialog.open(DialogUserEdit, {
          width: '350px',
          data: {id:element.userID , userFullName: element.userFullName, rewardPoints: element.rewardPoints }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.rewardPoints = result;
          this.userId=element.userID;
          this.functionForEdit();
        });  
      }
      functionForEdit()
      {
         //Hitting function for API
        this.datas.rewardPoints=this.rewardPoints;
        this.datas.userID=this.userId;
        this.hotelService.editUser(this.datas).subscribe(x=>{
          this.receiveUser()
        });
      }
    displayedColumns: string[] = ['userID', 'userFullName','userEmail','userPhone','rewardPoints','edit','delete'];
    //dataSource = new MatTableDataSource();
  
   applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  
   //@ViewChild(MatSort) sort: MatSort;
  
 
      
    
   ngOnInit() {
  //  this.receiveUser();
   //this.dataSource.sort = this.sort;
   }
  }

  // =================================HOTEL EDIT DIALOG BOX=====================================
  
@Component({
  selector: 'dialog-userEdit-dialog',
  template: `
  <h1 mat-dialog-title>Hello Admin!<br> Manage {{data.userFullName}}'s Reward Points:</h1>
<div mat-dialog-content>
  <h4>Currently:{{data.rewardPoints}}</h4>
  <p>Click + / - to change the reward points</p>
  
  <button (click)="subtractRewardPoints()">-</button>
  {{data.rewardPoints+rewardsPoints}}
  <button (click)="addRewardPoints()">+</button>
  <br>

</div>
<div mat-dialog-actions>
  <button mat-button (click)="onNoClick()">No Thanks</button>
  <button mat-button [mat-dialog-close]="data.rewardPoints+rewardsPoints" cdkFocusInitial>Ok</button>
</div>
  `,
})
export class DialogUserEdit {

  constructor(
    public dialogRef: MatDialogRef<DialogUserEdit>,
    @Inject(MAT_DIALOG_DATA) public data: UserManage) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  rewardsPoints:number = 0;
  
  addRewardPoints(){
    
        return this.rewardsPoints += 25;
    }
    subtractRewardPoints(){
      if(this.rewardsPoints>0){
      return this.rewardsPoints -= 25;
      }
    }

}