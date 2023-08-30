import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { PaymentdetailService } from 'src/app/shared/paymentdetail.service';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styleUrls: ['./payment-detail-form.component.css']
})
export class PaymentDetailFormComponent {
  constructor(public service:PaymentdetailService,private toaster:ToastrService){

  }
  onSubmit(form:NgForm){
    this.service.formSubmitted=true;
    if(form.valid){
      if(this.service.formData.paymentDetailId==0)
      this.insertRecord(form);
    else
    this.updateRecord(form);
 
  }
  }
  insertRecord(form:NgForm){
    this.service.postPaymentDetail()
   .subscribe({
    next:res=>{
     this.service.list=res as PaymentDetail[];
     this.service.resetForm(form);
     this.toaster.success('Inserted successfully','Payment Detail Register');
    },
    error:err=>{console.log(err)}
   });
  }
  updateRecord(form:NgForm){
       this.service.putPaymentDetail()
       .subscribe({
        next:res=>{
          this.service.list=res as PaymentDetail[];
          this.service.resetForm(form);
          this.toaster.info('Updated successfully','Payment Detail Register')
        },
        error:err=>{console.log(err)}
       })
  }
}
