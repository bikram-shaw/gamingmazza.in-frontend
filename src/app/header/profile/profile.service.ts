import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Users } from '../../signup/user';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
 
  
 private url:string=window["cfgApiBaseUrl"];
  constructor(private http:HttpClient) { }
  updateProfile(formdata:FormData):Observable<any>
  {
    //user.setUserid(userid);
     //console.log(user)
   return this.http.put(this.url+"/user/updateProfile",formdata);
  }
  getMyposts(userid: any,page:number):Observable<any> {
    return this.http.get(this.url+"/user/getMyPosts/"+userid+"/"+page);
  }
  deletePost(postid: any) {
   return this.http.delete(this.url+"/user/deletePost/"+postid);
  }
  editPost(formdata:FormData):Observable<any>
  {
    return this.http.put(this.url+"/user/editPost",formdata)
  }
  uploadProfileImage(formdata:FormData):Observable<any>
  {
  return this.http.post(this.url+"/user/uploadProfileImage",formdata);
  }
}
