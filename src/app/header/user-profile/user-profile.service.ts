import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private url:string= window["cfgApiBaseUrl"];
  constructor(private http:HttpClient) { }
  getUserDetails(userid):Observable<any>
  {
    let user=JSON.parse(localStorage.getItem("userDetails"));
    return this.http.get(this.url+"/user/userProfileDetails/"+userid+"/"+user.userid);
  }
  fetchUserPost(userid,limit):Observable<any>
  {
    return this.http.get(this.url+"/user/fetchUserPost/"+userid+"/"+limit);
  }
  follow(userid):Observable<any>
  {
    const formdata=new FormData();
    let user=JSON.parse(localStorage.getItem("userDetails"));
    formdata.append("followBy",user.userid);
    formdata.append("followTo",userid);
   
return this.http.post(this.url+"/user/follow",formdata);
  }
  countFollowers(userid)
  {
    return this.http.get(this.url+"/user/countFollowers/"+userid);
  }
}
