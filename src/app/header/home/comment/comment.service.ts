import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import{Comment} from './comment'
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CommentService {
 commentData;
 private url:string=window["cfgApiBaseUrl"];
  
  constructor(private http:HttpClient) { }
  insertComment(comment:Comment):Observable<any>
  {
   return this.http.post(this.url+"/user/insertComment",comment);
 }
 getComment(formdata:FormData):Observable<any>
 {
   return this.http.post(this.url+"/user/getComments/",formdata);
 }
}
