import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';
import { Router } from '@angular/router';
import { UserProfileService } from './user-profile.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { CommentService } from '../home/comment/comment.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
userid;
  userDetail: any;
   url=window["cfgApiBaseUrl"];
  limit: number=0;
  morePost: boolean;
  spinners: boolean;
  userPostData: any;
  notpostanything: boolean;
  isFollow: number;
  followers: Object;
  FOLLOW:string="FOLLOW";

  FOLLOWING:string="FOLLOWING";
  btnDisabled: boolean;
  constructor(
    private homeservice:HomeService,
    private router:Router,
    private userprofileservice:UserProfileService,
    private spinner:Ng4LoadingSpinnerService,
    private commentService:CommentService,
    private appservice:AppService
  ) { 
    
  }

  ngOnInit() {
    this.spinner.show();
    this.userid=this.homeservice.userid;
    if(this.userid==null)
    {   
           this.router.navigate(["acc"])
    }
    else{
      this.fetchUserProfiledetails();
      this.fetchUserPost();
     
      this.countFollowers()
    }
    
     
  }
  fetchUserProfiledetails() {
    this.userprofileservice.getUserDetails(this.userid).subscribe((data)=>{
      this.userDetail=data.userDetails;
      this.isFollow=data.follow;
      this.spinner.hide();

    })
  }
  fetchUserPost() {
    
    this.userprofileservice.fetchUserPost(this.userid,this.limit).subscribe((data)=>{
      this.userPostData=data;
      if(this.userPostData.length==0)
      {
       
        this.morePost=false;
        this.spinners=false;
        this.notpostanything=true;
      }
      else
      {
        if(this.userPostData.length<6)
        {
          this.morePost=false;
        }
        this.limit++;
      }
      
   })
  }
  loadMorePost()
  {
    this.morePost=false;
    this.spinners=true;
    this.spinner.show();
    this.userprofileservice.fetchUserPost(this.userid,this.limit).subscribe((data)=>{
      this.spinner.hide();
      if(data.length===0)
      {
        this.morePost=false;
        this.spinners=false;
      
      }
      else
      {
        setTimeout(() => {
          this.userPostData=this.userPostData.concat(data);
          this.spinners=false;
          if(data.length>6)
        {
          this.morePost=true;
        }
          
          this.limit++;
        }, 2000);
       
        
        
      }
    
    })
  }
  follow()
  {
    this.btnDisabled=true;
    this.FOLLOWING=" &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;<span  class='spinner-border  spinner-border-sm' ></span> &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;"
  this.FOLLOW=" &nbsp;&nbsp; &nbsp;&nbsp;<span  class='spinner-border  spinner-border-sm' ></span> &nbsp;&nbsp; &nbsp;&nbsp;"
    this.userprofileservice.follow(this.userid).subscribe((data)=>{
      this.isFollow=data;
      this.FOLLOW="FOLLOW"
      this.FOLLOWING="FOLLOWING"
      this.btnDisabled=false;
      this.countFollowers();
    })
    
    
  }
  countFollowers()
  {
    this.userprofileservice.countFollowers(this.userid).subscribe((data)=>{
      this.followers=data;
    })
    
    
  }
  onClickComment(index){
    this.commentService.commentData=this.userPostData[index];
    this.commentService.commentData.profilepic=this.userDetail.profileimage;
    this.commentService.commentData.name=this.userDetail.name;
    }
    openLightbox(image,likes,dislikes)
    {
      this.appservice.lightboxOpen(image,likes,dislikes)
    }
    openProfilePic(image)
    {
      this.appservice.showProfilePic(image);

    }

}
