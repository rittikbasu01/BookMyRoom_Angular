import { HttpClient } from '@angular/common/http';
import { ConfirmBooking } from './confirm-booking.model';
import { Injectable } from '@angular/core';
import { Store } from "src/app/store.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConfirmserviceService {
 
 public access;
  
  constructor() { }

 provide_access( value:boolean)
 {
   this.access=value;
 }
 
}
