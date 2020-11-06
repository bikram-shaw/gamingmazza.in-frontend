import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { HeaderComponent } from './header.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { GalleryComponent } from './gallery/gallery.component';
import { ShortdescriptionPipe } from '../pipes/shortdescription.pipe';
import { NotFoundComponent } from '../not-found/not-found.component';
import {NgxImageCompressService} from 'ngx-image-compress';
import { HostTournamentComponent } from '../host-tournament/host-tournament.component';




const headerModule=[
  {path:"acc",component:HeaderComponent,children:[
    {path:"",component:HomeComponent},
    {path:"profile",component:ProfileComponent},
    {path:"search",component:SearchComponent},
    {path:"**",component:NotFoundComponent}
    ]},
]

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    ProfileComponent,
    SearchComponent,
    UserProfileComponent,
    GalleryComponent,
    ShortdescriptionPipe,
    
     
  ],
  imports: [
    CommonModule,
   RouterModule.forChild(headerModule),
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    PopoverModule,
  BsDatepickerModule,
 
  
  ],
  providers: [NgxImageCompressService],
})
export class HeaderModule { 
  constructor()
  {
    
  }
}
