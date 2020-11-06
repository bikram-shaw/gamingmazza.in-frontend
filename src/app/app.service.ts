import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private url=window["cfgApiBaseUrl"];
  compressImage: string;
  constructor(private router:Router,
    private http:HttpClient,
    pft:LightboxConfig,
    private lightbox:Lightbox,
   
    ) {
      pft.positionFromTop = 50;
     }
  isLoggedIn()
  {
    this.isUserAuthenticate();
     let userDetails=JSON.parse(localStorage.getItem('userDetails'));
     let basicauth=localStorage.getItem('basicauth');
    
    if(userDetails==null || basicauth==null)
   {
     localStorage.removeItem("userDetails")
     localStorage.removeItem("basicauth")
     this.router.navigate(["login"]);
     
   }
   
  }
  isUserAuthenticate()
  {
    this.http.get(this.url+"/user/userAuthenticate").subscribe((()=>{}),error=>{
      
      if(error.status==401 || error.status==403)
      {
        localStorage.removeItem("userDetails")
        localStorage.removeItem("basicauth")
          this.router.navigate(["login"])
      }
    })
  }
  search(name)
  {
    return this.http.get(this.url+"/user/search/"+name);
  }
  showProfilePic(image)
  {
    const album=[]
 
  const arr={
    src:image,
   
  }
  album.push(arr)
  this.lightbox.open(album,0);
  }
  lightboxOpen(image,likes,dislikes)
  {
    const album=[]
 
  const arr={
    src:image,
    caption:likes+"  Likes  | "+dislikes+"  Dislikes"
  }
  album.push(arr)
  this.lightbox.open(album,0);
  }
  galleryImages(userid,page):Observable<any>
  {
    return this.http.get(this.url+"/user/galleryImages/"+userid+"/"+page);
  }
  
  dataURLtoFile(dataurl, filename) {
 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
}
}
