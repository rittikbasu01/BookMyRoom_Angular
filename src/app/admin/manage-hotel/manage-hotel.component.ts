import  Swal  from 'sweetalert2';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import { UserService } from "src/app/shared/user.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


export class HotelManage{
  hotelID:number;
  hotelName: string;
  hotelCity:string;
  hotelRating:number;
}



@Component({
  selector: 'app-manage-hotel',
  templateUrl: './manage-hotel.component.html',
  styleUrls: ['./manage-hotel.component.css']
})
export class ManageHotelComponent implements OnInit {

  hotelID:number;
  hotelName:string;
  hotelCity:string;
  hotelRating:string;
  
  constructor(private hotelService2:UserService,public dialog: MatDialog) { }

  dataSource:any;


  receiveHotel(){
    this.hotelService2.fetchHotels().subscribe(data=>{
     this.dataSource = new MatTableDataSource(data);
   })
     
  }

  deleteHotel(id:number){
    if(confirm('Are you sure to delete this record?')==true){
    this.hotelService2.deleteHotel(id).subscribe(x=>{
      this.receiveHotel()
    });
    }
    }


    hotelPrice:number;
   displayedColumns: string[] = ['hotelID', 'hotelName','hotelCity','hotelRating','delete'];

  //dataSource = new MatTableDataSource();

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //@ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    //this.receiveHotel();
   // this.dataSource.sort = this.sort;
  }

}


// =================================HOTEL EDIT DIALOG BOX=====================================

