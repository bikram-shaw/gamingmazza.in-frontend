import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './signup/signup.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DaywriterServicesService } from './daywriter-services/daywriter-services.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginService } from './login/login.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppService } from './app.service';
import { CommentComponent } from './header/home/comment/comment.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { CommentService } from './header/home/comment/comment.service';
import { ScrollDispatchModule} from '@angular/cdk/scrolling';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { ProfileService } from './header/profile/profile.service';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { AdminService } from './admins/admin.service';
import { NgMarqueeModule } from 'ng-marquee';
import { MatIconRegistry, MatIconModule } from '@angular/material';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { UserProfileService } from './header/user-profile/user-profile.service';
import { HeaderModule } from './header/header.module';
import { LightboxModule } from 'ngx-lightbox';
import { BasicAuthHtppInterceptorService } from './daywriter-services/basic-auth-htpp-interceptor.service';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FrontNotificationComponent } from './front-notification/front-notification.component';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { HostTournamentComponent } from './host-tournament/host-tournament.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
   NotFoundComponent,
    CommentComponent,
    ForgetPasswordComponent,
    FrontNotificationComponent,
   
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    Ng4LoadingSpinnerModule.forRoot(),
    FormsModule,
    ScrollDispatchModule,
    ModalModule,
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    TabsModule.forRoot(),
    TimepickerModule.forRoot(),
    NgMarqueeModule,
    MatIconModule,
    CarouselModule.forRoot(),
    HeaderModule,
    LightboxModule,
    AlertModule.forRoot(),
    TooltipModule.forRoot(),
    LoadingBarRouterModule,
    AccordionModule.forRoot(),
    ],
  providers: [
    DaywriterServicesService,
    LoginService,
    AppService,
    CommentService,
    BsModalService,
    ProfileService,
    AdminService,
    UserProfileService,
    {
      provide:HTTP_INTERCEPTORS,useClass:BasicAuthHtppInterceptorService,multi:true
    }
    
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer){
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('assets/mdi.svg')); // Or whatever path you placed mdi.svg at
  
   
  }
 }
