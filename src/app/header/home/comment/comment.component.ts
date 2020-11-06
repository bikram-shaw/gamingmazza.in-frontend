import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommentService } from './comment.service';
import{Comment} from './comment'
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  url=window["cfgApiBaseUrl"];
  commentData: any;
  textarea:String="";
  allComment=[];
  page:number=0;
   loginUser=JSON.parse(localStorage.getItem("userDetails"));
  morecmt: boolean=true;
post="<b>Post</b>"
btnDisabled=false;
  constructor(
    private commentService:CommentService,
    private router:Router
  ) { 
  
 }
  ngOnInit() {
   
  if(this.commentService.commentData==null)
  {
    this.router.navigate(["acc"]);
  }
  else
   this.commentData=this.commentService.commentData;
   this.getComments();
   
}
onSubmitComment(description:string)
{
  if(description!="")
  {
    this.post="&nbsp;&nbsp;<span  class='spinner-border  spinner-border-sm' ></span> &nbsp;&nbsp;"
    this.btnDisabled=true;
    var postid=this.commentData.postid;
    var userid=this.loginUser.userid;
    let comment=new Comment(postid,userid,description);
     this.commentService.insertComment(comment).subscribe((data)=>{
      this.textarea="";
      this.post="Post"
      
      setTimeout(() => {
        this.page=0;
         
        this.getComments();
        this.btnDisabled=false;
         
      }, 2000);
    })
 }
 
}
getComments()
{
  var formdata=new FormData();
 var postid=this.commentData.postid;
 formdata.append("postid",postid);
 formdata.append("page",String(this.page));
 this.commentService.getComment(formdata).subscribe((data)=>
  {
    this.allComment=data;
    this.page+=1;
   
    if(this.allComment.length<=3)
    {
      this.morecmt=false;
    }
    else
    this.morecmt=true;
    
  })
}
loadMoreComment()
{
  var formdata=new FormData();
  var postid=this.commentData.postid;
  formdata.append("postid",postid);
  formdata.append("page",String(this.page));
  this.commentService.getComment(formdata).subscribe((data)=>
   {
     const morecomment=data;
     if(morecomment.length!=0){
     this.allComment=this.allComment.concat(morecomment);
     this.page+=1;
     this.morecmt=true;
     }
     else{
      this.morecmt=false;
     }
     
   })
}

}
