const baseURL = "https://m.yaojunrong.com";
const fetch = {
  http(url, method, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseURL + url,
        data,
        method,
        header: {
          "content-type": "application/json"
        },
        success(res) {
          resolve(res);
        },
        fail(err) {
          reject(err);
        }
      })
    })
  },
  get(url, data) {
    return this.http(url, 'GET', data)
  }
}
exports.fetch = fetch;