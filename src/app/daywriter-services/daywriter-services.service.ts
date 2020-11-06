import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../signup/user';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DaywriterServicesService {

  constructor(private http:HttpClient) { }
  private url=window["cfgApiBaseUrl"];
  addUser(user:Users):Observable<any>
  {
    
      return this.http.post(this.url+"/addUser",user);
  }
  uploadProfileImage(formdata:FormData):Observable<any>
  {
    return this.http.post(this.url+"/addProfileImage",formdata);
  }
  isvalidEmail(email):Observable<any>
  {
    const data=new FormData()
    data.append("email",email)
    return this.http.post(this.url+"/isvalidEmail",data);
  }
  changePassword(formdata:FormData):Observable<any>
  {
    return this.http.post(this.url+"/changePassword",formdata);
  }
}
