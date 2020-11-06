import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { DaywriterServicesService } from 'src/app/daywriter-services/daywriter-services.service';

@Component({
  selector: 'app-game-zone',
  templateUrl: './game-zone.component.html',
  styleUrls: ['./game-zone.component.css']
})
export class GameZoneComponent implements OnInit {
  

  constructor(private _dservice:DaywriterServicesService,
    private service:AppService) {
    
   }

  ngOnInit() {
    this.service.isLoggedIn();
   }
  

}
