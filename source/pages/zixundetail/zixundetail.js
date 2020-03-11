// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { ZixunApi } from "../../apis/zixun.api.js";
var WxParse = require('../../wxParse/wxParse');
import { ApiUtil } from "../../apis/apiutil.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    // options.id=1;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    this.getzixun();
  }
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '详情',
    })
  }
  getzixun() {

    var api = new ZixunApi;
    var that = this;
    api.zixundetail({ id: this.Base.options.id }, (zixundetail) => {
      zixundetail.content = ApiUtil.HtmlDecode(zixundetail.content);

      WxParse.wxParse('content', 'html', zixundetail.content, that, 10);
      zixundetail.shijian = that.getriyue(zixundetail.shijian);
  
      this.Base.setMyData({ zixundetail })
    })
  }
  getriyue(date) {
    date = date.slice(5, 10);
    date = date.replace('-', '月');
    date = date + '日';
    return date
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.gettype = content.gettype;
body.getzixun = content.getzixun;
body.getriyue = content.getriyue;
Page(body)