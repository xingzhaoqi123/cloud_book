import {
  fetch
} from "../../utils/util.js"
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    _id: "",
    bookId: "",
    article: {},
    title: "",
    isShow: false,
    catalog: [],
    isloading: false,
    font: 40,
    index: ""
  },

  onLoad: function(options) {
    this.setData({
        _id: options.id,
        bookId: options.bookId,
      }),
      this.getBook();
    this.getcatalog();
  },
  getcatalog() {
    fetch.get(`/titles/${this.data.bookId}`).then(res => {
      this.setData({
        catalog: res.data.data
      })
    })
  },
  getBook() {
    this.setData({
      isloading: true
    })
    fetch.get(`/article/${this.data._id}`).then(res => {
      this.setData({
        article: res.data.data.article.content,
        title: res.data.data.title,
        isloading: false,
        index: res.data.data.article.index
      })
    }).catch(err => {
      this.setData({
        isloading: false
      })
    })
  },

  toggleCatalog() {
    let isShow = !this.data.isShow;

    this.setData({
      isShow: isShow
    })
  },

  handleGet(event) {
    const id = event.currentTarget.dataset.id;
    this.setData({
      _id: id,
      isShow: false
    })
    this.getBook();
  },

  fontBig() {
    if (this.data.font > 46) {
      wx.showToast({
        title: '字体过大',
      })
    } else {
      this.setData({
        font: this.data.font + 2
      })
    }

  },
  fontsmall() {
    if (this.data.font < 34) {
      wx.showToast({
        title: '字体过小',
      })
    } else {
      this.setData({
        font: this.data.font - 2
      })
    }
  },
  jumpNext() {
    let catalog = this.data.catalog;
    if (catalog[this.data.index + 1]) {
      this.setData({
        _id: catalog[this.data.index + 1]._id
      })
      this.getBook()
    } else {
      wx.showToast({
        title: '最后一章',
      })
    }
  },
  jumpPrev() {
    let catalog = this.data.catalog;
    if (this.data.index - 1 < 0) {
      wx.showToast({
        title: '第一章',
      })
    } else {
      this.setData({
        _id: catalog[this.data.index - 1]._id
      })
      this.getBook()
    }
  },
  jumphome() {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})