import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
 private  url: string=window["cfgApiBaseUrl"];

  constructor(private http:HttpClient) { }
  public addMoney(formdata:FormData):Observable<any>
  {
    return this.http.post(this.url+"/user/addMoney",formdata);
  }
  public getWalletBal(userid):Observable<any>
  {
    const formdata=new FormData();
formdata.append("userid",userid)
return this.http.post(this.url+"/user/fetchWalletBalance",formdata);
  }
  withdrawRequest(formdata:FormData):Observable<any>
  {
    return this.http.post(this.url+"/user/withdrawRequest",formdata);
  }
  getWalletHistory(userid,page):Observable<any>
  {
    return this.http.get(this.url+"/user/getWalletHistory/"+userid+"/"+page);
  }
}
