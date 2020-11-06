import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CommentComponent } from './header/home/comment/comment.component';
import { UserProfileComponent } from './header/user-profile/user-profile.component';
import { GalleryComponent } from './header/gallery/gallery.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';


const routes: Routes = [
  {path:"", redirectTo:'login' ,pathMatch:"full"},
  {path:"login", component:LoginComponent},
  {path:"signup",component:SignupComponent},
 {path:"userProfile",component:UserProfileComponent},
 {path:"gallery/:name/:userid",component:GalleryComponent},
 {path:"comment",component:CommentComponent},
 {path:"gamezone",loadChildren:"./game-zone/gamezone.module#GamezoneModule"},
 {path:"adminsb&a@",loadChildren:"./admins/admin.module#AdminModule"},
 {path:"password",component:ForgetPasswordComponent}




];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
