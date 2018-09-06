import {
  fetch
} from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookId: "",
    bookData: {},
    isloading: false,
   isCollect:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
        bookId: options.id,
      }),
      this.getData()
  },
  getData() {
    this.setData({
      isloading: true
    })
    fetch.get(`/book/${this.data.bookId}`).then(res => {
      this.setData({
        bookData: res,
        isloading: false,
        isCollect: res.isCollect
      })
      console.log(res);
    }).catch(err => {
      this.setData({
        isloading: false
      })
    })
  },
  jumpCatalog() {
    wx.navigateTo({
      url: `/pages/catalog/catalog?id=${this.data.bookId}`,
    })
  },
  onShareAppMessage(res) {
    if (res.from == "button") {
      console.log(res.target)
    }
    return {
      title: this.data.bookData.data.title,
      path: `/pages/index/index?id=${this.data.bookId}`,
      imageUrl: this.data.bookData.data.img
    }
  },
  handclick(){
    this.setData({
      isCollect:1
    })
    console.log(this.data.isCollect);
  }
})