import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from './login';
import { Users } from '../signup/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  private url=window["cfgApiBaseUrl"];
  login(mobile,password):Observable<any>
  {
   
     const formdata=new FormData();
     formdata.append("mobile",mobile);
     formdata.append("password",password);
     const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(mobile + ':' + password) });
    return this.http.post(this.url+"/user/login",formdata,{headers:headers})
  }
}
