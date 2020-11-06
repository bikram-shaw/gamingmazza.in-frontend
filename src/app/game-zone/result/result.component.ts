import { Component, OnInit, TemplateRef } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { GameService } from '../game.service';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  gamename=localStorage.getItem("gamename");
  url="https://gamingmazzafiles.s3.ap-south-1.amazonaws.com/gamesImages";
  noActiveGame: string;
  gamesdata: any;
  resultData: any;
  modalRef: any;
  constructor(
    private modalService: BsModalService,
    private gameservice:GameService,
    private router:Router,
    private spinner:Ng4LoadingSpinnerService
  ) { }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  ngOnInit() {
    this.spinner.show();
    if(this.gamename==null)
    {
      this.router.navigate(["acc"]);
    }
    else
    {
      this.gameResult();
    }
  }
  

  gameResult()
  {
this.gameservice.gameResult(this.gamename).subscribe((data)=>{
  if(data.length==0)
  {
     this.noActiveGame="No party result found at this moment "
     this.spinner.hide();
  }
  else{
   
    this.spinner.hide();
    this.gamesdata=data;
  }
})
  }
  playerListResult(gameid)
  {
    this.gameservice.playerListResult(gameid).subscribe((data)=>{
      this.resultData=data;
      
    })
  }
}
