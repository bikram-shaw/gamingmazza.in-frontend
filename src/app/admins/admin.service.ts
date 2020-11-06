import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  hidelogin=new BehaviorSubject<boolean>(true);
  private url: string=window["cfgApiBaseUrl"];
  adminname:String;
  constructor(
    private http:HttpClient
  ) { }
  submitCreategameForm(data):Observable<any>
  {
return this.http.post(this.url+"/admin/createGame",data);
  }
  roomDetails(formdata:FormData):Observable<any>
  {
    return this.http.post(this.url+"/admin/postRoomDetails",formdata);
  }
  getJoinPlayer(gameid):Observable<any>
  {
return this.http.get(this.url+"/user/getJoinPlayer/"+gameid);
  }
  insertResult(data):Observable<any>
  {
  return this.http.post(this.url+"/admin/insertResult",data);
  }
  resultComplete(gameid):Observable<any>
  {
    return this.http.get(this.url+"/admin/resultComplete/"+gameid);
  }
  withdrawRequest():Observable<any>
  {
    return this.http.get(this.url+"/admin/withdrawRequestByUser");
  }
  withdrawDone(id)
  {
    return this.http.get(this.url+"/admin/withdrawDone/"+id);
  }
  login(mobile,password):Observable<any>
  {
   
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(mobile + ':' + password) });
    const formdata=new FormData();
    formdata.append("mobile",mobile)
    return this.http.post(this.url+"/admin/login",formdata,{headers:headers,responseType: 'text' as 'json'});
  }
  isAuthenticated():Observable<any>
  {
    return this.http.get(this.url+"/admin/authenticate");
  }
  
  

}
