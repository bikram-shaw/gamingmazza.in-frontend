import { Component, OnInit } from '@angular/core';
import { Router,Params, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  userid: any;
  name: any;
  images: any;
  url=window["cfgApiBaseUrl"];
 galleryItems=[]
  empty: boolean=false;
  page:number=0;
  loadmore: boolean=true;
  i:number;
  constructor(
    private router:Router,
    private activeroute:ActivatedRoute,
    private appservice:AppService,
    private spinner:Ng4LoadingSpinnerService,
    private lightbox:Lightbox,
    private lbc:LightboxConfig
  ) { 
this.lbc.alwaysShowNavOnTouchDevices=true;

  }

  ngOnInit() {
    
   
    this.spinner.show();
    this.activeroute.params.subscribe((params:Params)=>{
      this.userid=params['userid']
      this.name=params['name']
      
    })
    this.galleryImages();
  }
  galleryImages(){
    
    this.appservice.galleryImages(this.userid,this.page).subscribe((data)=>{
      if(data!=null)
      {
        if(data.length!=0)
        {
          if(data.length<8)
          {
            this.loadmore=false;
          }
          this.images=data;
          this.spinner.hide();
          this.page++;
        }
        else
        {
          this.loadmore=false;
          this.spinner.hide();
          this.empty=true;
          
        }
      }
      else
      {
        this.loadmore=false;
        this.spinner.hide();
        this.empty=true;
      }
      
    })
  }
  loadMoreImage()
  {
    this.spinner.show();
    this.appservice.galleryImages(this.userid,this.page).subscribe((data)=>{
      if(data!=null)
      {
              if(data.length<8)
              {
                this.loadmore=false;
              }
              
        this.images=this.images.concat(data);
        this.page++;
        
        this.spinner.hide();
      }
      
    })
  }

  open(j:number)
  {
    for(this.i=0;this.i<this.images.length;this.i++)
    {
     
      const image={
        src:this.images[this.i].image,
     
        caption:this.images[this.i].description
      }
   
      this.galleryItems.push(image)
    }
    this.lightbox.open(this.galleryItems,j);
  }

}
