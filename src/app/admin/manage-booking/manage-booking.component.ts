import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import { UserService } from "src/app/shared/user.service";

export class BookingManage{
  userName:string;
  bookingDate:string;
  combinedDate:string;
   amount :number;
  hotelName:string;
  cityName:string;
  
}

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.css']
})
export class ManageBookingComponent implements OnInit {

  constructor(private hotelService:UserService) { }

  dataSource:any;
  receiveBooking(){
    this.hotelService.fetchBookings().subscribe(data=>{
     this.dataSource = new MatTableDataSource(data);
   })
     
  }
  deleteBooking(id:number){
    if(confirm('Are you sure to delete this record?')==true){
    this.hotelService.deleteBookings(id).subscribe(x=>{
      this.receiveBooking()
    });
    }
    }

  displayedColumns: string[] = ['bookingId','name', 'bookingDate','combinedDate','amount','hotelName','cityName','delete'];
  //dataSource = new MatTableDataSource();

 applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

 //@ViewChild(MatSort) sort: MatSort;


    
  
 ngOnInit() {
//  this.receiveBooking();
 //this.dataSource.sort = this.sort;
 }

}
