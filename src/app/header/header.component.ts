import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DaywriterServicesService } from '../daywriter-services/daywriter-services.service';
import { HomeService } from './home/home.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  modalRef: BsModalRef;
  searchData: Object;
  public url=window["cfgApiBaseUrl"];
  loadSpinner: boolean=false;
  notFound: any=false;
  constructor(
    private router:Router,
    private service:AppService,
    private modalService:BsModalService,
    private homeService:HomeService
   
    ) { 
    
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  hideModal()
  {
    this.modalRef.hide();
  }

  ngOnInit() {
    
  this.service.isLoggedIn();
  }
  onLogout()
  {
    this.modalRef.hide();
    localStorage.removeItem("userDetails");
    localStorage.removeItem("basicauth");
    this.router.navigate(["login"]);
  }
  Search(event)
  {
    this.loadSpinner=true;
    this.searchData=null;
    if(event.target.value.length>1)
    {
      this.service.search(event.target.value).subscribe((data)=>{
        if(data=="")
        {
          this.loadSpinner=false;
          this.searchData=null;
          this.notFound=true;
          
        }
        else{
          this.notFound=false;
        this.loadSpinner=false;
        this.searchData=data;
      }
  
      })
    }
 
  }
  freefire()
  {
    const gamename="FREEFIRE";
    localStorage.removeItem("gamename");
   localStorage.setItem("gamename",gamename);
    this.modalRef.hide();

   this.router.navigate(["gamezone"]);
  }
  pubg()
  {
    const gamename="PUBG";
    localStorage.removeItem("gamename");
    localStorage.setItem("gamename",gamename);
    this.modalRef.hide();
   
    this.router.navigate(["../gamezone"]);
  }
  userProfile(userid)
{
  this.modalRef.hide();
  this.homeService.userid=userid;
  this.router.navigate(["../userProfile"])
}
}
