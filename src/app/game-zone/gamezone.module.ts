import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameZoneComponent } from './game-zone.component';
import { GamehomeComponent } from './gamehome/gamehome.component';
import { OngoingComponent } from './ongoing/ongoing.component';
import { WalletComponent } from './wallet/wallet.component';
import { ResultComponent } from './result/result.component';
import { RouterModule } from '@angular/router';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AlertModule } from 'ngx-bootstrap/alert';
import { HostTournamentComponent } from '../host-tournament/host-tournament.component';

const gameRoute=[
  {path:"",component:GameZoneComponent,children:[
    {path:"",component:GamehomeComponent},
    {path:"ongoing",component:OngoingComponent},
    {path:"result",component:ResultComponent},
    {path:"wallet",component:WalletComponent}
  ]},
]
@NgModule({
  declarations: [
    GameZoneComponent,
    GamehomeComponent,
    OngoingComponent,
   WalletComponent,
   ResultComponent,
   HostTournamentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(gameRoute),
    ProgressbarModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule,
    AlertModule
  ]
})
export class GamezoneModule { 
  constructor()
  {
   
  }
}
