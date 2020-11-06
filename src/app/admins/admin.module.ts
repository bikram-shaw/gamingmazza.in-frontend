import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminResultComponent } from './admin-home/admin-result/admin-result.component';
import { AdminsComponent } from './admins.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { NotFoundComponent } from '../not-found/not-found.component';

const adminRoute=[
  
  {path:"", component:AdminsComponent,children:[
   {path:"home",component:AdminHomeComponent},
    {path:"resultDetails/:gameid",component:AdminResultComponent},
   
  ]}, 
]


@NgModule({
  declarations: [
    AdminResultComponent,
    AdminsComponent,
    AdminHomeComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    RouterModule.forChild(adminRoute),
    FormsModule,
    TabsModule,
    ProgressbarModule
    
  ]
})
export class AdminModule { 
  constructor()
  {
    
  }
}
