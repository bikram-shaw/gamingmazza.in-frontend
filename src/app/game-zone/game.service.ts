import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private url: string=window["cfgApiBaseUrl"];
  constructor(
    private http:HttpClient
  ) { }

  fetchGames(gamename):Observable<any>
  {
    return this.http.get(this.url+"/user/fetchGames/"+gamename);
  }
  joinGame(joingame:FormData):Observable<any>
  {
return this.http.post(this.url+"/user/joinGame",joingame);
  }
  joinPlayerList(gameid):Observable<any>
  {
    return this.http.get(this.url+"/user/getJoinPlayerList/"+gameid);
  }
  onGoingGame(data):Observable<any>
  {
    return this.http.get(this.url+"/user/fetchOngoingGame/"+data);
  }
  getRoomIdPassword(userid,gameid):Observable<any>
  {
    let formdata=new FormData();
    formdata.append("userid",userid);
    formdata.append("gameid",gameid);

    return this.http.post(this.url+"/user/getRoomIdAndPassword",formdata);
  }
  gameResult(data):Observable<any>
  {
    return this.http.get(this.url+"/user/fetchGameResult/"+data);
  }
  playerListResult(gameid)
  {
    return this.http.get(this.url+"/user/playerListResult/"+gameid);
  }
 
}
