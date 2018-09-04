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
    L_move: {},
    R_move: {}
  },
  trigger() {//Test处理动画效果
    let Lmove = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 1000,
      timingFunction: "ease",
      delay: 0,
    });
    Lmove.translateX(618).step({
      duration: 1000
    });
    this.setData({
      L_move: Lmove.export()
    })
    let Rmove = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 1000,
      timingFunction: "ease",
      delay: 0,
    });
    Lmove.translateX(-618).step({
      duration: 1000
    });
    this.setData({
      R_move: Rmove.export()
    })
  },




  onLoad: function(options) {
    this.setData({
        _id: options.id,
        bookId: options.bookId
      }),
      this.getBook();
    this.getcatalog();
  },
  getcatalog() {
    fetch.get(`/titles/${this.data.bookId}`).then(res => {
      this.setData({
        catalog: res.data
      })
    })
  },
  getBook() {
    fetch.get(`/article/${this.data._id}`).then(res => {
      let data = app.towxml.toJson(res.data.data.article.content, 'markdown');
      this.setData({
        article: data,
        title: res.data.data.title
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
    })
    this.getBook();
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