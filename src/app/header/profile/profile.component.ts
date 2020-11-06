import { Component, OnInit, TemplateRef, Inject } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UserProfileService } from '../user-profile/user-profile.service';
import { CommentService } from '../home/comment/comment.service';
import { AppService } from 'src/app/app.service';
import { NgxImageCompressService } from 'ngx-image-compress';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  uploadbtn="Upload";
   loginUser;
  modalRef: BsModalRef;
  dob:any;
  gender: any;
  UpdateInfo: FormGroup;
  PostData=[];
  page: number=0;
  morePost: boolean=true;
  spinner:boolean=false;
  notpostanything:boolean=false;
  data: { "postid": any; "i": any;"description":any; };
   url=window["cfgApiBaseUrl"];
  followers: Object;
  profileImage: string;
  imageSrc: string | ArrayBuffer;
  afterChooseImage:boolean=true;
  constructor(
   
    private spinners:Ng4LoadingSpinnerService,
    private modals:BsModalService,
    private service:ProfileService,
    private userprofileservice:UserProfileService,
   private commentService:CommentService,
   private appservice:AppService,
   private imageCompress:NgxImageCompressService,

  ) { }

  ngOnInit() {
    
    this.spinners.show();
    this.loginUser=JSON.parse(localStorage.getItem("userDetails"));
    
    this.getMyPosts();
    this.countFollowers();
    const dob=this.loginUser.dob;
    
    this.dob=dob.substr(5,2)+"/"+dob.substr(8,2)+"/"+dob.substr(0,4);
    this.dob=new Date(dob);
    this.UpdateInfo=new FormGroup({
      
      'name':new FormControl(this.loginUser.name,[Validators.required,Validators.minLength(2)]),
      'dob':new FormControl( this.dob,Validators.required),
      'gender':new FormControl(this.loginUser.gender,Validators.required),
     
      'mobilestatus':new FormControl(this.loginUser.mobilestatus,Validators.required)
     

    })

  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modals.show(template,
      {class: 'modal-lg modal-dialog-centered', ignoreBackdropClick: true, keyboard: false});
  }
  hideModal()
  {
    this.modalRef.hide();
  }
  Updateprofile()
  {
    this.spinners.show();
    
    let user=this.UpdateInfo.value;
    let formdata=new FormData();
    formdata.append("userid",this.loginUser.userid);
    formdata.append("user",JSON.stringify(user));
    this.service.updateProfile(formdata).subscribe((data)=>{
      this.spinners.hide();
      localStorage.removeItem("userDetails");
      localStorage.setItem("userDetails",JSON.stringify(data));
      this.page=0;
      this.ngOnInit();
      this.modalRef.hide();
     
      
     
    })
  }
  getMyPosts()
  {
   
    this.service.getMyposts(this.loginUser.userid,this.page).subscribe((data)=>{
      if(data.length===0)
      {
        this.spinners.hide();
        this.morePost=false;
        this.spinner=false;
        this.notpostanything=true;
      }
      else
      {
        
        this.spinners.hide();
        if(data.length<6)
        {
          this.morePost=false;
        }
        this.PostData=data;
        this.page++;
        
      }
    
    })
  }
  loadMorePost()
  {
    this.morePost=false;
    this.spinner=true;
    this.service.getMyposts(this.loginUser.userid,this.page).subscribe((data)=>{
      if(data.length===0 )
      {
        this.morePost=false;
        this.spinner=false;
      
      }
      else
      {
        setTimeout(() => {
          this.PostData=this.PostData.concat(data);
          this.spinner=false;
          if(data.length>6)
        {
          this.morePost=true;
        }
          
          this.page++;
        }, 2000);
       
        
        
      }
    
    })
  }
  onShown(postid,i,description)
  {
     this.data={"postid":postid,"i":i,"description":description};
   
  }
  editPost(editdata)
  {
    let formdata=new FormData();
    formdata.append("postid",this.data.postid)
    formdata.append("description",editdata.value)
    this.service.editPost(formdata).subscribe((data)=>{
   this.PostData[this.data.i].description=data.description;
   this.modalRef.hide()
    })
  }
  deletePost()
  {
    this.spinners.show();
     this.service.deletePost(this.data.postid).subscribe(()=>{
      
        this.PostData.splice(this.data.i,1);
        this.modalRef.hide();
        this.spinners.hide();
     })
  }
  countFollowers()
  {
    this.userprofileservice.countFollowers(this.loginUser.userid).subscribe((data)=>{
      this.followers=data;
    })
    
    
  }
  onClickComment(index){
   
    this.commentService.commentData=this.PostData[index];
    this.commentService.commentData.profilepic=this.loginUser.profileimage;
    this.commentService.commentData.name=this.loginUser.name;
    }
    chooseImage()
    {
       
    this.imageCompress.uploadFile().then(({image, orientation}) => {
      this.profileImage=image;
      this.afterChooseImage=false;
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
    uploadProfileImage()
    {
      this.uploadbtn="&nbsp;&nbsp;<span  class='spinner-border  spinner-border-sm' ></span> &nbsp;&nbsp;"
      const formdata=new FormData();
      formdata.append("image",this.appservice.dataURLtoFile(this.profileImage,this.loginUser.name+"_ProfilePicture"));
      formdata.append("userid",this.loginUser.userid);
  
      this.service.uploadProfileImage(formdata).subscribe((data)=>{
        this.modalRef.hide();
        this.uploadbtn="Upload"
        if(data.sms!="")
        {
          localStorage.removeItem("userDetails");
          this.loginUser.profileimage=data.sms;
           localStorage.setItem("userDetails",JSON.stringify(this.loginUser));
         }
        else{
         this.uploadbtn="Upload"
          alert("Something is wrong!")
        }
      })
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
