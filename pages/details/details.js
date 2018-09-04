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
    isloading: false
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
        bookData: res.data,
        isloading: false
      })
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
})