import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { WalletService } from './wallet.service';
import { FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

   loginUser=JSON.parse(localStorage.getItem("userDetails"));
   paytm = {

    MID: "eVExLv25221231925149", // paytm provide
    WEBSITE: "DEFAULT", // paytm provide
    INDUSTRY_TYPE_ID: "Retail", // paytm provide
    CHANNEL_ID: "WAP", // paytm provide
    ORDER_ID:"",
    CUST_ID:this.loginUser.userid, // customer id
    MOBILE_NO: this.loginUser.mobile, // customer mobile number
    EMAIL:this.loginUser.email, // customer email
    CHECKSUMHASH:"",
    TXN_AMOUNT:"",
    CALLBACK_URL: "https://api.gamingmazza.in/user/addMoneyStatus", // Call back URL that i want to redirect after payment fail or success
  };           //http://gamingmazzatest-env.6qvemscwzq.ap-south-1.elasticbeanstalk.com/user/addMoneyStatus

modalRef: BsModalRef;
  ammountVal: any=0;
  msg: boolean;
  loadmorebtn="See More"
  msgval: string;
  confirmbtn: boolean;
   balance: any;
   wallethistorydata=[];
  wallethistorymsg: string;
  page=0;
  withdrawForm:FormGroup;
  loadMoreHistory: boolean=true;
  amountmsg: string;
   url=window["cfgApiBaseUrl"];
  WithdrawSuccessSms: any;
  constructor(
    private walletservice:WalletService,
    private  modalService: BsModalService,
    private spinner:Ng4LoadingSpinnerService,
    private appService:AppService
  ) { }
  myform:FormGroup;
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      {class: 'modal-lg modal-dialog-centered', ignoreBackdropClick: true, keyboard: false});
  }


  ngOnInit() {

    this.spinner.show();
    this.appService.isLoggedIn();
    this.walletBal();
    this.walletHistory();
    this.withdrawForm=new FormGroup({
   'mode':new FormControl("phonepay",Validators.required),
   'mobileUpi':new FormControl("",Validators.required),
   'amount':new FormControl("50",[Validators.required,this.withdrawAmountValidation.bind(this)]),
 })
  }

  withdrawAmountValidation(control:FormControl)
  {
   let amount=control.value;

   if(amount<50 )
   {
        this.amountmsg="Minimum withdraw amount is 50";

   }
   else
   {
     this.amountmsg="";
    }
  }
  onSubmitWithdrawForm()
  {
    this.spinner.show();
    if(this.withdrawForm.valid)
    {
 let withdrawform=this.withdrawForm.value;
 let formdata=new FormData();
 formdata.append("withdrawform",JSON.stringify(withdrawform));
 formdata.append("userid",this.loginUser.userid);
  this.walletservice.withdrawRequest(formdata).subscribe((data)=>{
    this.spinner.hide();
    this.WithdrawSuccessSms=data.sms;
    setTimeout(() => {
      this.modalRef.hide();
      this.WithdrawSuccessSms="";
   this.page=0;
  this.ngOnInit();
    }, 5000);


  })
}
else
{
  alert("Invalid Field")
}
  }
  walletBal()
  {
    this.walletservice.getWalletBal(this.loginUser.userid).subscribe((data)=>{
      this.spinner.hide();
     this.balance=data.balance;

    })
  }
  walletHistory()
  {
    this.walletservice.getWalletHistory(this.loginUser.userid,this.page).subscribe((data)=>{
      if(data.length==0)
      {
        this.wallethistorymsg="You do not make any transaction yet"
      }
      if(data.length<6)
      {
this.loadMoreHistory=false;
      }
      this.wallethistorydata=data;
      this.page++;
    })
  }
  loadMoreWalletHistory()
  {
    this.loadmorebtn="<b class='spinner-border spinner-border-sm text-secondary'></b>"
    this.walletservice.getWalletHistory(this.loginUser.userid,this.page).subscribe((data)=>{
      if(data.length<6)
      {
this.loadMoreHistory=false;
      }
      this.wallethistorydata=this.wallethistorydata.concat(data);
      this.loadmorebtn="See More"
      this.page++;
    })

  }

  ammount(event)
  {

    const val:number=event.target.value;
    if(val>=10 && val<=2000 && val!=null)
    {
      this.msg=false;
      this.ammountVal=Math.round(val);

    }
    else
    {
      this.ammountVal=null;
      this.msg=true;
      this.msgval="Invalid amount (minimum amount 10 and maximum 2000)"
    }


  }
  loadData()
  {
    const formdata=new FormData()
    formdata.append("ammount",this.ammountVal)
    formdata.append("userid",this.loginUser.userid)
   this.walletservice.addMoney(formdata).subscribe((data)=>{
     if(data.orderid=="" && data.checksum=="")
     {

      this.confirmbtn=false;
      alert("Something is wrong! Try again")
     }
     else
     {
      this.paytm.ORDER_ID = data.orderid;
      this.paytm.CHECKSUMHASH = data.checksum;
     this.paytm.TXN_AMOUNT = this.ammountVal;
     this.confirmbtn=true;
     }

      },error=>alert("something went wrong ! try again"))

  }


}
