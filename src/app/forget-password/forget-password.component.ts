import { Component, OnInit } from '@angular/core';
import { DaywriterServicesService } from '../daywriter-services/daywriter-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  password: any;
  otp: any;

  constructor(
    private daywriterService:DaywriterServicesService,
    private router:Router
  ) { }
  email:string;
  msg:string;
  RequestOtpBtn:string="Request OTP"
  ngOnInit() {
  }
  isvalidEmail()
  {
    localStorage.removeItem("userDetails");
    if(this.email!=null && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email))
    {
        this.RequestOtpBtn="<span class='spinner-border spinner-border-sm'></span><span> Sending...</span>"
        this.daywriterService.isvalidEmail(this.email).subscribe((data)=>{
          this.RequestOtpBtn="Request OTP";
           this.msg=data.sms;
           setTimeout(() => {
            this.msg="";
           }, 3000);
        });
    }
    else{
      this.msg="<span class='text-danger'>Invalid email id</span>"
      setTimeout(() => {
        this.msg="";
      }, 2000);
    }
  }
  changePassword()
  {
    if(this.email!=null || this.password!=null || this.otp!=null)
    {
      if(this.password.length>=6)
      {
        const formdata=new FormData()
        formdata.append("email",this.email)
        formdata.append("password",this.password)
        formdata.append("otp",this.otp)
      this.daywriterService.changePassword(formdata).subscribe((data)=>{
        if(data.sms==='done')
        {
          this.msg="<span class='text-success'>Password change successfully, Login to continue</span>";
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 2000);
        }
        else{
          this.msg=data.sms;
          setTimeout(() => {
            this.msg="";
          }, 3000);
        }
       
      })
      }
      else
      {
        this.msg="<span class='text-danger'>Password length should be minimum 6</span>"
        setTimeout(() => {
          this.msg="";
        }, 3000);
      }
     
    }
    else{
      this.msg="<span class='text-danger'>Invalid credentials</span>"
      setTimeout(() => {
        this.msg="";
      }, 2000);
    }
  }
}