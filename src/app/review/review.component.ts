import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/user.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Review } from "src/app/shared/Review";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  constructor(public userService: UserService, private router: Router, private route: ActivatedRoute) { }

  rating: number[];
  genders: number[];

  ngOnInit() {
    //this.rating=[1,2,3,4,5];
    this.genders = [1,2,3,4,5];
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.userService.selectedReview =
    {
      rating: null,
      review: '',
      hotelId: null
  }
}
    
    
  revSubmit(form: NgForm) {
    this.userService.postReview(form.value).subscribe((data) => {
      this.resetForm(form);
        if (data) {
          Swal({
            title: '<strong>Thank you for the Review</strong>',
            type: 'success',
            
            focusConfirm: false,
            confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> OK',
            // confirmButtonAriaLabel: 'Thumbs up, great!',
  
  
          })
        } })
      }
}
