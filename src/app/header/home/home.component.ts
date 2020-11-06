import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HomeService } from './home.service';
import { CommentService } from './comment/comment.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';
import { AppService } from 'src/app/app.service';
import { NgxImageCompressService } from 'ngx-image-compress';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  commentData: any;
  public imageSrc;
  selectImage: boolean = false;
  successSms: string;
  failedSms: string;
  userPost: FormGroup;
  PostData = [];
  loginUser;
  postImage: string;
  limit: number = 0;
  notScrolly = true;
  notEmptyPost = true;
  formdata: FormData;
  load: boolean = false;
  nomorepost: boolean = false;
  url = window["cfgApiBaseUrl"];

  postSpinner: boolean = true;
  winnerslist: any;
  image;
  constructor(private router: Router,
    private homeService: HomeService,
    private commentService: CommentService,
    private spinner: Ng4LoadingSpinnerService,
    private lightbox: Lightbox,
    private appservice: AppService,
    private imageCompress:NgxImageCompressService
  ) {


  }

  ngOnInit() {
    this.appservice.isLoggedIn();
    this.spinner.show();
    this.loginUser = JSON.parse(localStorage.getItem("userDetails"));
    this.FetchUsersPost();
    this.userPost = new FormGroup({
      "description": new FormControl(null, Validators.required),
    })
    this.winners()
  }
  //Fetching timeline post when user login
  FetchUsersPost() {
    var formdata = new FormData();
    formdata.append("userid", this.loginUser.userid);
    formdata.append("limit", String(this.limit));
    formdata.append("game", this.loginUser.game);
    this.homeService.getUserPost(formdata).subscribe(data => {

      if (data != null) {
        this.spinner.hide();
        this.PostData = data;
        this.limit += 6;
      }
      else {
        alert("no post found")
      }

    })
  }
  onScroll() {
    if (this.notEmptyPost && this.notScrolly) {
      this.load = true;
      this.notScrolly = false;
     
        this.loadMorePost();
     
    }
  }
  loadMorePost() {
    var formdata = new FormData();
    formdata.append("userid", this.loginUser.userid);
    formdata.append("limit", String(this.limit));
    formdata.append("game", this.loginUser.game);
    this.homeService.getUserPost(formdata).subscribe(data => {
      const loadPost = data;
      this.limit += 6;
      this.load = false;

      if (loadPost.length === 0) {
        this.nomorepost = true;
        this.notEmptyPost = false;
      }
      else {
        this.PostData = this.PostData.concat(loadPost);
        this.notScrolly = true;
      }

    });
  }

  //when user select an image for post
  onSelectImage() {
    //priview image
    
    this.imageCompress.uploadFile().then(({image, orientation}) => {
    this.selectImage=true;
      this.postImage = image;
      const imageSize=this.imageCompress.byteCount(image);
     if(imageSize>=1048576)
      {
        this.imageCompress.compressFile(image, orientation, 50, 50).then(
          result => {
            this.postImage = result;
          }
        );
      }
      else if(imageSize>153600){
        this.imageCompress.compressFile(image, orientation, 50, 70).then(
          result => {
            this.postImage = result;
          }
        );
      }
      else
      {

      }
    
      
    });
    


  }
  //when user post something
  onSubmitUserPost() {
    const description = this.userPost.value;
    
    if (this.postImage == null && description.description == null) {
      this.failedSms = "Both fields are empty"
      setTimeout(() => {
        this.failedSms="";
      }, 3000);
    }
    else {
      this.postSpinner = false;
      this.failedSms = "";
      var formData = new FormData();
      //Math.random()+"_"+ file.name.replace(/\s/g,"_")
      formData.append('userid', this.loginUser.userid);
      formData.append('description', JSON.stringify(description));
      
      if(this.postImage!=null)
      {
        const filename=this.loginUser.name+"-gamingmazza.in-"+Math.floor(1000 + Math.random() * 9000)
       
        formData.append('image', this.appservice.dataURLtoFile(this.postImage,filename));
      }
     
      formData.append('game', this.loginUser.game);

      this.homeService.saveUserPost(formData).subscribe(response => {
        if (response != null) {
          this.postSpinner = true;
          this.selectImage = false;
          this.userPost.reset();
          this.postImage = null;
          this.successSms = "Post Created";
          setTimeout(() => {
            this.successSms = "";
            setTimeout(() => {
              this.limit = 0;
              this.FetchUsersPost();
            }, 3000)
          }, 2000)
        }
      }, error => {
        this.failedSms = "Something went wrong!";
        this.postSpinner = true;
      }
      )
    }
  }
  

 
  //when user click deslike icon
  onClickDislike(postid, dislikes, i) {
    var dislike = "dislike";
    var likeDislikeData = new FormData();
    likeDislikeData.append("userid", this.loginUser.userid);
    likeDislikeData.append("postid", postid);
    likeDislikeData.append("status", dislike);
    this.homeService.likeDislike(likeDislikeData).subscribe(data => {
     // alert(data);
    });

    if (this.PostData[i].likeStatus != "liked" && this.PostData[i].dislikeStatus != "disliked") {

      this.PostData[i].dislikes = this.PostData[i].dislikes + 1;
      this.PostData[i].dislikeStatus = "disliked";

    }
    else if (this.PostData[i].likeStatus == "liked") {
      if (this.PostData[i].likes > 0) {
        this.PostData[i].dislikes = this.PostData[i].dislikes + 1;
        this.PostData[i].dislikeStatus = "disliked";
        this.PostData[i].likes = this.PostData[i].likes - 1;
        this.PostData[i].likeStatus = "normal";
        this.PostData[i].likeStatus = "";

      }
      else {
        this.PostData[i].dislikes = this.PostData[i].dislikes + 1;
        this.PostData[i].dislikeStatus = "disliked";
        this.PostData[i].likeStatus = "normal";
        this.PostData[i].likeStatus = "";
      }
    }
  }
  //When User click like icon
  onClickLike(postid, likes, i) {

    var like = "like";
    var likeDislikeData = new FormData();
    likeDislikeData.append("userid", this.loginUser.userid);
    likeDislikeData.append("postid", postid);
    likeDislikeData.append("status", like);
    this.homeService.likeDislike(likeDislikeData).subscribe(data => {
     // alert(data);

    });
    if (this.PostData[i].likeStatus != "liked" && this.PostData[i].dislikeStatus != "disliked") {

      this.PostData[i].likes = this.PostData[i].likes + 1;
      this.PostData[i].likeStatus = "liked";

    }
    else if (this.PostData[i].dislikeStatus == "disliked") {
      if (this.PostData[i].dislikes > 0) {
        this.PostData[i].likes = this.PostData[i].likes + 1;
        this.PostData[i].likeStatus = "liked";
        this.PostData[i].dislikes = this.PostData[i].dislikes - 1;
        this.PostData[i].dislikeStatus = "normal";
        this.PostData[i].dislikeStatus = "";

      }
      else {
        this.PostData[i].likes = this.PostData[i].likes + 1;
        this.PostData[i].likeStatus = "liked";
        this.PostData[i].dislikeStatus = "normal";
        this.PostData[i].dislikeStatus = "";
      }
    }
  }
  //when user click comment icon
  onClickComment(index) {
    this.commentService.commentData = this.PostData[index];
  }
  userProfile(userid) {
    this.homeService.userid = userid;
    this.router.navigate(["../userProfile"])
  }

  openLightbox(image, likes, dislikes) {
    this.appservice.lightboxOpen(image, likes, dislikes);
  }
  winners()
  {
    this.spinner.show();
    this.homeService.winners().subscribe((data)=>{
      this.spinner.hide();
      this.winnerslist=data;
    })
  }
}
