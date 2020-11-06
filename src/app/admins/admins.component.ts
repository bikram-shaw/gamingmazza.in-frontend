import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {
username:string;
password:string;
  hidelogin: boolean;
 
  constructor(
    private adminservice:AdminService,
    private router:Router
  ) { 
    this.adminservice.hidelogin.subscribe(data=>{
      this.hidelogin=data;
    })
  }

  ngOnInit() {
    
  }
adminlogin()
{
  
  this.adminservice.login(this.username,this.password).subscribe((data)=>{
  
    if(data!=null)
    {
      this.adminservice.adminname=data;
      let authString = 'Basic ' + btoa(this.username + ':' + this.password);
      localStorage.setItem("basicauth",authString);
      this.router.navigate(["../adminsb&a@/home"])
      this.adminservice.hidelogin.next(false);
    }
  },error=>{
    alert("You are not an 'ADMIN'")
  })
}

}
