import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AppService } from '../app.service';
declare var FB: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  passwordField="password"
  mobile:number;
  password:any;
  loginbtn:string="<b>Log In</b>";
  btnDisabled=false;
  ima: any;
  compressImage: string;
  constructor(private loginservice:LoginService,
    private router:Router,
    private spinner:Ng4LoadingSpinnerService,
    private appservice:AppService,

    ) {

    }

  ngOnInit() {
    this.spinner.hide();
    let userDetails=JSON.parse(localStorage.getItem('userDetails'));
    if(userDetails!=null && localStorage.getItem("basicauth"))
    {

      const gamename=userDetails.game;
      localStorage.removeItem("gamename");
     localStorage.setItem("gamename",gamename);


     this.router.navigate(["gamezone"]);

    }

    (window as any).fbAsyncInit = function() {
      FB.init({
        appId      : '900082823834214',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.1'
      });
      FB.AppEvents.logPageView();
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }
  submitLogin(){
    console.log("submit login to facebook");
    // FB.login();
    FB.login((response)=>
        {
          console.log('submitLogin',response);
          if (response.authResponse)
          {
            //login success
            //login success code here
            //redirect to home page
           }
           else
           {
           console.log('User login failed');
         }
      });

  }
  loginerror:boolean=false;
  login()
  {

    if(this.mobile!=null && this.password!=null)
    {
      this.loginbtn="&nbsp;&nbsp;<span  class='spinner-border  spinner-border-sm' ></span> &nbsp;&nbsp;"
    localStorage.removeItem('userDetails');
    localStorage.removeItem('basicauth');
this.loginservice.login(this.mobile,this.password).subscribe((data)=>
  {
      this.loginbtn="Log In"
      localStorage.setItem('userDetails',JSON.stringify(data));
      let authString = 'Basic ' + btoa(this.mobile + ':' + this.password);
      localStorage.setItem('basicauth',authString);
      const gamename=data.game;
      localStorage.removeItem("gamename");
     localStorage.setItem("gamename",gamename);


     this.router.navigate(["gamezone"]);
      //this.router.navigate(['acc']);

  },()=> {this.loginerror=true ,
  this.loginbtn="Log In"
  })
  }
  else{

    alert("Enter the credentials");
  }
}


}
