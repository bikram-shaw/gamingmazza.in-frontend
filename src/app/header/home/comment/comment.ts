export class Comment
{
     postid:number;
     userid:any;
     description:string;
    constructor(postid:number, userid:any,description:string)
    {
        this.postid=postid;
        this.userid=userid;
        this.description=description;
    }
       public getPostid():number
       {
           return this.postid;
       }
       public setPostid(postid)
       {
           this.postid=postid;
       }
       public getUserid():any
       {
           return this.userid;
       }
       public setUserid(userid)
       {
           this.userid=userid;
       }
       public getDescription():string
       {
           return this.description;
       }
       public setDescription(description)
       {
           this.description=description;
       }
}