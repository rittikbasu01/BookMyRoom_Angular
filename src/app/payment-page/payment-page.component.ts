import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,FormControl ,Validators} from '@angular/forms';
import { Form } from "@angular/forms";
import{Router} from'@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css'],
 
})

export class PaymentPageComponent implements OnInit {

  constructor(public router:Router ) { }
  CreditCardNumberPattern="^[0-9]{16}$";
  CvvPattern="^[0-9]{3}$";


  ngOnInit() {
    this.resetCreditForm();
    this.resetDebitForm();
  }


  resetCreditForm(Form?:NgForm)
  {
    if(Form!=null)
      {
        Form.resetForm();
      }
  }

  resetDebitForm(Form2?:NgForm)
  {
    if(Form2!=null)
      {
        Form2.resetForm();
      }
  }
  
  onSubmitCredit(Form:NgForm)
  {
    this.resetCreditForm();
    Swal({
      title: '<strong>Payment Accepted!</strong>',
      type: 'success',
      confirmButtonText:
      '<i class="fa fa-thumbs-up"></i> OK',
    })
    this.router.navigate(['/Search']);
  }

  onSubmitDebit(Form2:NgForm)
  {
    
      this.resetDebitForm();
      Swal({
        title: '<strong>Payment Accepted!</strong>',
        type: 'success',
        confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> OK',
      })
      this.router.navigate(['/Search']);
   
  }
}
