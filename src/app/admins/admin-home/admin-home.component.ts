import { Component, OnInit, TemplateRef, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { GameService } from 'src/app/game-zone/game.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { EventEmitter } from 'protractor';
import { error } from 'util';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  creategameform:FormGroup;
    
   pubgmap=["Erangel","Miramar","Shanhok","Vikendi"];
  freefiremap=["Bermuda","Purgatory","Random"];
  selectedgame: any;
  noActiveGame: string;
  gamesdata: any;
  modalRef: BsModalRef;
  roomForm: FormGroup;
   gameid: any;
  ongoinggamesdata: any;
  withdrawRequestData=[];
  url="https://gamingmazzafiles.s3.ap-south-1.amazonaws.com/gamesImages";
  adminname: String;
  
  
  constructor(
    private adminservice:AdminService,
    private gameservice:GameService,
    private modalService: BsModalService,
    private router:Router
  ) { 
    this.adminname=this.adminservice.adminname;
  }
  

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  ngOnInit() {
   
    if(!localStorage.getItem("basicauth"))
    {
this.router.navigate(["adminsb&a@"])
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
    
    
  this.creategamemethod();
  this.roomForm=new FormGroup({
    'roomid':new FormControl("",Validators.required),
    'password':new FormControl("",Validators.required)
  })
  }

  creategamemethod()
  {
    this.creategameform=new FormGroup({
      'gamename':new FormControl(Validators.required),
     
      'mode':new FormControl("SOLO",Validators.required),
      'date':new FormControl("",Validators.required),
      'time':new FormControl("",Validators.required),
      'entryFee':new FormControl("",[Validators.required,Validators.pattern("^[0-9]*$")]),
      'perKill':new FormControl("",[Validators.required,Validators.pattern("^[0-9]*$")]),
      'winAmount':new FormControl("",[Validators.required,Validators.pattern("^[0-9]*$")]),
      'map':new FormControl("",Validators.required),
      'spot':new FormControl("",[Validators.required,Validators.pattern("^[0-9]*$")]),
      'status':new FormControl("active",Validators.required),
      'image':new FormControl("",Validators.required)
      })
  }
  selectedGame(event)
  {
    
    if(event.target.value=="FREEFIRE")
    {
      this.selectedgame=this.freefiremap;
    }
    else{
      this.selectedgame=this.pubgmap;
    }
    
  }
  onSubmitCreateGameForm()
  {
    let myForm=this.creategameform.value;
    this.adminservice.submitCreategameForm(myForm).subscribe((data)=>{
     if(data==true)
     {
       alert("Game Created Successfully");
       this.creategameform.reset();
     }
     else{
       alert("Something went wrong !");
     }
    })
    
  }
  activeFreefireGames()
  {
    let gamename="FREEFIRE";
    this.gameservice.fetchGames(gamename).subscribe((data)=>{
       
      if(data.length==0)
      {
        alert("No active #FREEFIRE game right now")
      }
      else{
        this.gamesdata=data;
        
      }
     
  })
}
  activePubgGames()
  {
    let gamename="PUBG";
    this.gameservice.fetchGames(gamename).subscribe((data)=>{
       
      if(data.length==0)
      {
         alert("No active #PUBG game right now")
      }
      else{
        this.gamesdata=data;
        
      }
    })
}
roomFormdata(gameid)
{
this.gameid=gameid;
}
onSubmitRoomForm()
{
  console.log(this.roomForm.value)
  const formdata=new FormData();
  formdata.append("roomdetails",JSON.stringify(this.roomForm.value));
  formdata.append("gameid",this.gameid);
  this.adminservice.roomDetails(formdata).subscribe((data)=>{
    this.modalRef.hide();
    this.activeFreefireGames();
alert(data.sms);
  })
}
ongoingFreefireGames()
{
  let gamename="FREEFIRE";
  this.gameservice.onGoingGame(gamename).subscribe((data)=>{
    if(data.length==0)
      {
        alert("No ongoing #FREEFIRE game right now")
      }
      else{
        this.ongoinggamesdata=data;
        
      }

  })
}
ongoingPubgGames()
{
  let gamename="PUBG";
  this.gameservice.onGoingGame(gamename).subscribe((data)=>{
    if(data.length==0)
      {
        alert("No active #PUBG game right now")
      }
      else{
        this.ongoinggamesdata=data;
        
      }

  })
}

withdrawRequest()
{
  this.adminservice.withdrawRequest().subscribe((data)=>{
    if(data.length==0)
    {
      alert("No withdraw request  found")
    }
    this.withdrawRequestData=data;
  })
}
withdrawDone(id,i)
{
  this.adminservice.withdrawDone(id).subscribe((data)=>{
    if(data!=false)
    {
      alert("Completed")
      this.withdrawRequestData.splice(i,1);
    }
    else{
      alert("Something Went Wrong!")
    }

  })
}
adminLogout()
{
localStorage.removeItem("basicauth");
this.router.navigate(["adminsb&a@"])
this.adminservice.hidelogin.next(true);
}
isAuthorized()
{
  //this.adminservice.isAuthorized().subscribe((data))
}

}
