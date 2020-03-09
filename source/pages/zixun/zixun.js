// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { ZixunApi } from "../../apis/zixun.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({ seq:0})
  }
  onMyShow() {
    var that = this;
    this.gettype();
    this.getzixun();
  }
  gettype(){
    var api = new ZixunApi;
    api.zixuntype({}, (zixuntype)=>{
      zixuntype.unshift({
        seq:0,
        id:0,
        name:'全部'
      })
      this.Base.setMyData({ zixuntype })
    })
  }
  getzixun() {
    var type_id=this.Base.getMyData().type_id;
    var api = new ZixunApi;
    var that = this;
    api.zixunlist({type_id:type_id}, (zixunlist) => {
      for (var i = 0; i < zixunlist.length;i++){
        zixunlist[i].shijian = that.getriyue(zixunlist[i].shijian);
      }
      this.Base.setMyData({ zixunlist })
    })
  }
  getriyue(date){
    date = date.slice(5,10);
    date=date.replace('-','月');
    date=date+'日';
    return date
  }
  xuanrange(e){
    console.log(e);
    var cur = e.currentTarget.id;
    var curid = e.currentTarget.dataset.current;
    this.Base.setMyData({
      seq:cur,
      type_id: curid
    })
    this.getzixun();
  }
  todetail(e){
    var id = e.currentTarget.id;
    var api = new ZixunApi;
    api.addpeople({ id: id }, (addpeople)=>{
      if (addpeople){
        wx.navigateTo({
          url: '/pages/zixundetail/zixundetail?id='+id,
        })
      }
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.gettype = content.gettype;
body.getzixun = content.getzixun;
body.xuanrange = content.xuanrange;
body.getriyue = content.getriyue;
body.todetail = content.todetail;
Page(body)