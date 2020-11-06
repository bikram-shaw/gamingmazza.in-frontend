import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../../signup/user';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  userid;
  private url:string= window["cfgApiBaseUrl"];
  constructor(private http:HttpClient) { }
  saveUserPost(formData:FormData):Observable<any>
  {
    
  return this.http.post(this.url+"/user/saveUserPost",formData);
  
  }
  getUserPost(formdata:FormData):Observable<any>
  {
    
  return this.http.post(this.url+"/user/getUserPost/",formdata);
  
  }
  likeDislike(data:FormData):Observable<any>
  {
    return this.http.post(this.url+"/user/likeDislikePost",data);
  }
  winners():Observable<any>
  {
    return this.http.get(this.url+"/user/winners");
  }

}
