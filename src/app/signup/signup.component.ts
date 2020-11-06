import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { DaywriterServicesService } from '../daywriter-services/daywriter-services.service';
import { Users } from './user';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AppService } from '../app.service';
import { NgxImageCompressService } from 'ngx-image-compress';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  profilepicdiv: boolean = false;
  signupdiv: boolean = true;
  signupform: FormGroup;
  submit_btn: boolean = false;
  datasave: boolean = false;
  profileImage: string="../assets/icon/user.svg";
  
  userid: any;
  has: boolean;
  constructor(private daywriterService: DaywriterServicesService,
     private router: Router,
    private spinner: Ng4LoadingSpinnerService,
    private appservice:AppService,
    private imageCompress:NgxImageCompressService
    ) { }

  ngOnInit() {
    this.signupform = new FormGroup({
      'name': new FormControl('', [Validators.required, this.nameValidation.bind(this), Validators.minLength(2)]),
      'mobile': new FormControl('', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/), this.mobileValidation.bind(this)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'dob': new FormControl(null, Validators.required),
      'gender': new FormControl("male", Validators.required),
      'password': new FormControl("", [Validators.required, Validators.minLength(6), this.passwordValidation.bind(this)]),
      'game': new FormControl("PUBG", Validators.required)
    })

  }
  invalidName: string;
  invalidPass: string;
  invalidCpass: String;
  invalidMobile: string;
  myclass: string;
  mobileValidation(control: FormControl) {
    let mobile = String(control.value);
    let re: RegExp = /^[6-9]\d{9}$/;
    if (re.test(mobile) || mobile.length == 0) {
      this.invalidMobile = "";

    }
    else {

      this.invalidMobile = "Enter a valid mobile number";
    }

  }
  nameValidation(control: FormControl) {
    let name = String(control.value);

    if (name.length == 0 || name.length > 1) {
      this.invalidName = "";

    }
    else {

      this.invalidName = "Name must contain atleast 2 character";
    }

  }

  passwordValidation(control: FormControl) {
    let pass = String(control.value);


    if (pass.length > 0 && pass.length < 6) {

      this.invalidPass = "Password length should be 6 or greater";
    }
    else {

      this.invalidPass = " ";
    }
  }

  onSubmit() {
    this.spinner.show();
    let user = this.signupform.value;
    this.userRegistration(user);

  }
  opt: {}
  userRegistration(user: Users) {
    this.daywriterService.addUser(user).subscribe(
      (data) => {
        if (data.sms == "has") {
         this.has=true;
         this.spinner.hide();
        }
        else {


          if (data.sms != "") {
            this.spinner.hide();
            this.userid = data.sms;
            this.datasave = true;

            setTimeout(() => {


              this.profilepicdiv = true;
              this.signupdiv = false;
              //this.router.navigate(["login"]);

            }, 1000);
          }
          else {
            alert("Something went wrong! Try again")
          }
        }

      }
    )
  }
  skipImage() {
    alert("Welcome to GamingMazza ! Login to continue")
    this.router.navigate(["login"]);
  }
  uploadProfilePic() {
    this.spinner.show();
    var formdata = new FormData();
    const filename="profile_Image"
    formdata.append("image", this.appservice.dataURLtoFile(this.profileImage,filename));
    formdata.append("userid", this.userid);
    this.daywriterService.uploadProfileImage(formdata).subscribe((data) => {
      this.spinner.hide();
      alert("Welcome to GamingMazza! Login to continue")
      this.router.navigate(["login"]);
    });
  }
  onSelectProfileImage() {
    
    this.imageCompress.uploadFile().then(({image, orientation}) => {
      this.profileImage=image;
     
        const imageSize=this.imageCompress.byteCount(image);
        
        if(imageSize>=307200)
        {
          this.imageCompress.compressFile(image, orientation, 50, 70).then(
            result => {
              this.profileImage=result;
            }
          );
          }
      
        
      });
     
  }
  
}
