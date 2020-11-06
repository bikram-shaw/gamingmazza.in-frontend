import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortdescription'
})
export class ShortdescriptionPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if(value==null)
    {
     return null;
    }
    else{
      value=value.replace(new RegExp(/(?:^|\s)(#[a-z0-9]\w*)/gi), "<span class='blue'>"+
      value.match(/(?:^|\s)(#[a-z0-9]\w*)/gi)+"</span>")
      if(value.length<500)
      {
        return value;
      }
      else
      {
        const str='<span class="red"> ... More</span>'
        return value.substr(0,500)+str
      }
    }
     //=value.match(/(?:^|\s)(#[a-z0-9]\w*)/gi)
    

    
  
  }

}
