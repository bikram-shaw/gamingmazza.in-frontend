import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AdminService } from '../../admin.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-result',
  templateUrl: './admin-result.component.html',
  styleUrls: ['./admin-result.component.css']
})
export class AdminResultComponent implements OnInit {
 

  gameid: any;
 
  joinPlayerdata=[];
 

   i=0;
  resultForm: FormGroup;
  res: boolean=true;
  msg: any;
  playername: any;
  userid: any;
 

  constructor(
    private router:Router,
    private activeRoute:ActivatedRoute,
    private adminservice:AdminService
  ) { }

  ngOnInit() {
    
    if(!localStorage.getItem("basicauth"))
    {
this.router.navigate(["/adminsb&a@"])
    }
    else
    {
      this.adminservice.isAuthenticated().subscribe((data=>{
        this.adminservice.hidelogin.next(false);
      }),error=>{
        
        if(error.status==401 || error.status==403)
        {
            this.router.navigate(["/adminsb&a@"])
        }
      })
    }

    this.activeRoute.params.subscribe((data:Params)=>{
      this.gameid=data['gameid'];
      this.getJoinPlayer();
      
     
    })
    this.result()
  }
  getJoinPlayer()
  {
    this.adminservice.getJoinPlayer(this.gameid).subscribe((data)=>
    {
      this.joinPlayerdata=data;
    })
   
  }

  result()
  {
    this.resultForm=new FormGroup({
      'userid':new FormControl(),
      'gameid':new FormControl(),
      'playername':new FormControl(),
      'kill':new FormControl('',Validators.required),
      'amount':new FormControl('',Validators.required),
      'status':new FormControl("loss",Validators.required),
    }
      
    )
  }
  onSubmitResultDetails()
  {
   
    this.adminservice.insertResult(this.resultForm.value).subscribe((data)=>{
      if(data!=null)
      {
      this.msg=data.sms;
      this.joinPlayerdata.splice(0,1);
      this.resultForm.get('kill').reset();
      this.resultForm.get('amount').reset();
      if(this.joinPlayerdata.length==0)
      {
        this.res=false;
      }
      setTimeout(() => {
        this.msg="";
      }, 2000);
    }
    else
    {
      alert("Data is not available")
    }
    });
  
    
    
  }
  ResultComplete()
  {
    this.adminservice.resultComplete(this.gameid).subscribe((data)=>{
      if(data==true)
      {
         alert("completed");
         this.router.navigate(['../adminsb&a@/adminHome']);
      }
      else{
        alert("Something Went Wrong! Try Again");
      }
    })
  }


}
