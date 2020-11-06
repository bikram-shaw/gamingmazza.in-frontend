import { Component, OnInit, TemplateRef } from '@angular/core';
import { GameService } from '../game.service';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-ongoing',
  templateUrl: './ongoing.component.html',
  styleUrls: ['./ongoing.component.css']
})
export class OngoingComponent implements OnInit {
   loginUser=JSON.parse(localStorage.getItem("userDetails"));
  gamename=localStorage.getItem("gamename");
  gamesdata: any;
  noActiveGame: string;
  joinedPlayer: any;
  modalRef: any;
  url="https://gamingmazzafiles.s3.ap-south-1.amazonaws.com/gamesImages";
  
   roomid: any;
   pass: any;
  
  constructor(
    private modalService: BsModalService,
    private gameservice:GameService,
    private router:Router,
    private spinner:Ng4LoadingSpinnerService
  ) { }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,{class: 'modal-dialog-centered'});
  }
  ngOnInit() {
    this.spinner.show();
    if(this.gamename==null)
    {
      this.router.navigate(["acc"]);
    }
    else
    {
      this.ongoingGame();
    }
  }

  ongoingGame()
  {
    this.gameservice.onGoingGame(this.gamename).subscribe((data)=>{
      if(data.length==0)
        {
           this.noActiveGame="No ongoing party found at this moment "
           this.spinner.hide();
        }
        else{
          this.spinner.hide();
          this.gamesdata=data;

          
        }

    })
  }
  joinPlayerList(gameid)
  {
    this.spinner.show();
  this.gameservice.joinPlayerList(gameid).subscribe((data)=>{
    this.spinner.hide();
    this.joinedPlayer=data;

  })
  }
  getRoomIdAndPassword(gameid)
  {
    this.spinner.show();
    this.gameservice.getRoomIdPassword(this.loginUser.userid,gameid).subscribe((data)=>
    {
      if(data!=null)
      {
        this.spinner.hide();
        this.roomid=data.roomid;
        this.pass=data.password;
        
      }
      else{
        this.spinner.hide();
       this.roomid="";
       this.pass="";
      }
     
    })
  }
  load()
  {
    alert("hi")
  }
}
