import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DaywriterServicesService } from 'src/app/daywriter-services/daywriter-services.service';
import { Router } from '@angular/router';
import { WalletService } from '../wallet/wallet.service';
import { GameService } from '../game.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AppService } from 'src/app/app.service';
import { AccordionConfig } from 'ngx-bootstrap/accordion';
export function getAccordionConfig(): AccordionConfig {
  return Object.assign(new AccordionConfig(), { closeOthers: true });
}
@Component({
  selector: 'app-gamehome',
  templateUrl: './gamehome.component.html',
  styleUrls: ['./gamehome.component.css'],
  providers: [{ provide: AccordionConfig, useFactory: getAccordionConfig }]
})
export class GamehomeComponent implements OnInit,OnDestroy {
   loginUser=JSON.parse(localStorage.getItem("userDetails"));
    gamename=localStorage.getItem("gamename")
  
    
  modalRef: BsModalRef;
  //gamename: string;
  walletBal: any;
  gamesdata: any;
  gameid: any;
  entryFee: any;
  joinedPlayer: any;
  joinspot=89;
  noActiveGame: string;
  enterGameName:string='';
  enterGameName1:string='';
  enterGameName2:string='';
  enterGameName3:string='';
   url="https://gamingmazzafiles.s3.ap-south-1.amazonaws.com/gamesImages";
  joinGame: any;
  audio=new Audio();
  gamesmode: any;
  constructor(
    private modalService: BsModalService,
    private _dservice:DaywriterServicesService,
    private router:Router,
    private walletservice:WalletService,
    private gameservice:GameService,
    private spinner:Ng4LoadingSpinnerService,
    private appService:AppService
    
  ) {
   
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  ngOnDestroy(){
   
   
    this.audio.pause();
  }
   
  ngOnInit() {
    //this.playAudio();
    this.appService.isLoggedIn();
    this.spinner.show();
    
    if(this.gamename==null)
    {
      this.router.navigate(["acc"]);
    }
    else
    {
      this.gameservice.fetchGames(this.gamename).subscribe((data)=>{
       
        if(data.length==0)
        {
           this.noActiveGame= this.gamename+"  PARTY";
           this.spinner.hide();
        }
        else{
          this.gamesdata=data;
          this.spinner.hide();
        }
       
      })
    }
  }
 /*
  playAudio(){
    //let audio = new Audio();
    if(this.gamename=='FREEFIRE')
    {
      this.audio.src = "../assets/audio/Free Fire Theme.mp3";
    }
    else
    {
      this.audio.src = "../assets/audio/pubg theme.mp3";
    }
    
    this.audio.load();
    this.audio.play();
    
  }*/
  
  getWallet(gameid,entryFee)
  {
    this.gameid=gameid;
    this.entryFee=entryFee;
    this.walletservice.getWalletBal(this.loginUser.userid).subscribe((data)=>{
      this.walletBal=data.balance;
      
    })
  }
  joinMatch()
  {
    this.spinner.show();
   if(this.entryFee>this.walletBal)
   {
     alert("Insufficient Amount, Plz add money to wallet")
     this.router.navigate(["gamezone/wallet"])
     this.modalRef.hide();
   }
   else
   {
     if(this.gamesmode=='SOLO')
     {
      if(this.enterGameName=="")
      {
        alert("Enter your gaming name first")
        this.spinner.hide();
      }
    
    
    else{
      var formdata=new FormData();
      formdata.append("userid",this.loginUser.userid)
      formdata.append("gameid",this.gameid)
      formdata.append("balance",this.walletBal)
      formdata.append("playername",this.enterGameName)
      formdata.append("entryfee",this.entryFee)
      
      this.gameservice.joinGame(formdata).subscribe((data)=>{
        this.spinner.hide();
        this.joinGame=data.sms;
        setTimeout(() => {
          this.modalRef.hide();
          
          this.joinGame="";
          this.enterGameName="";
        }, 4000);
       
        
      })
    }
     }
     else if(this.gamesmode=='DUO')
     {
      if(this.enterGameName=="" || this.enterGameName1=='')
      {
        alert("Enter both players gaming name first")
        this.spinner.hide();
      }
     else{
       var playername='(i) '+this.enterGameName+ '<br> (ii) '+this.enterGameName1;
        var formdata=new FormData();
        formdata.append("userid",this.loginUser.userid)
        formdata.append("gameid",this.gameid)
        formdata.append("balance",this.walletBal)
        formdata.append("playername",playername)
        formdata.append("entryfee",this.entryFee)
        
        this.gameservice.joinGame(formdata).subscribe((data)=>{
          this.spinner.hide();
          this.joinGame=data.sms;
          setTimeout(() => {
            this.modalRef.hide();
            
            this.joinGame="";
            this.enterGameName="";
            this.enterGameName1="";
          }, 4000);
         
          
        })
      }
     }
     else if(this.gamesmode=='SQUAD')
     {

      if(this.enterGameName=="" || this.enterGameName1=="" || this.enterGameName2=="" || this.enterGameName3=="")
      
      {
     
        alert("Enter all the four players gaming name first")
        
        this.spinner.hide();
      }
      
      else{
        var playername='(i) '+this.enterGameName+ '<br> (ii) '+this.enterGameName1  +'<br> (iii) '+this.enterGameName2  +'<br> (iv) '+this.enterGameName3;
        var formdata=new FormData();
        formdata.append("userid",this.loginUser.userid)
        formdata.append("gameid",this.gameid)
        formdata.append("balance",this.walletBal)
        formdata.append("playername",playername)
        formdata.append("entryfee",this.entryFee)
        
        this.gameservice.joinGame(formdata).subscribe((data)=>{
          this.spinner.hide();
          this.joinGame=data.sms;
          setTimeout(() => {
            this.modalRef.hide();
            
            this.joinGame="";
            this.enterGameName="";
            this.enterGameName1="";
            this.enterGameName2="";
            this.enterGameName3="";
          }, 4000);
         
          
        })
      }
     }
     else
     {

     }
  
   }
  }

  joinPlayerList(gameid)
  {
    this.spinner.show();
  this.gameservice.joinPlayerList(gameid).subscribe((data)=>{
    this.joinedPlayer=data;
    this.spinner.hide();

  })
  }
  gameMode(val)
  {
     this.gamesmode=val;
  }
  
}
    



