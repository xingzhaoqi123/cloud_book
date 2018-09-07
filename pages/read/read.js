import {
  fetch
} from "../../utils/util.js"
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    readData: [],
  },
  getRead() {
    fetch.get("/readList").then(res => {
      var title = [];
      var total = [];
      res.data.forEach(item => {
        title.push(item.title.index);
        total.push(item.title.total);
      })
      var progress = []
      for (var i = 0; i < title.length; i++) {
        progress.push(Math.round(title[i] / total[i] * 10000) / 100.00)
      }
      for (var j = 0; j < res.data.length; j++) {
        res.data[j].pro = progress[j];
      }
      this.setData({
        readData: res.data
      })
      console.log(res.data);
    })
  },

  readCon(event){
    const id = event.currentTarget.id._id;
    const bookId = event.currentTarget.id.bookId;
    const length = event.currentTarget.id.length;

    wx.navigateTo({
      url: `/pages/book/book?id=${id}&bookId=${bookId}&length=${length}`,
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getRead();

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