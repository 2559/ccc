App({
  onLaunch: function () {
    this.initSampleData();
  },

  initSampleData: function () {
    var orders = wx.getStorageSync('orders');
    
    if (!orders || orders.length === 0) {
      var sampleOrders = [
        {
          id: 'SMT20240515001',
          customer: '华为技术有限公司',
          product: '5G通信模块 PCB板',
          quantity: 500,
          orderDate: '2024-05-15 09:30',
          deliveryDate: '2024-05-25',
          status: '生产中',
          remark: '加急订单，优先处理',
          timeline: [
            { status: '待生产', time: '2024-05-15 09:30' },
            { status: '生产中', time: '2024-05-16 10:00' }
          ]
        },
        {
          id: 'SMT20240512001',
          customer: '中兴通讯股份有限公司',
          product: '芯片贴片组件 A型',
          quantity: 200,
          orderDate: '2024-05-12 14:20',
          deliveryDate: '2024-05-22',
          status: '已完成',
          remark: '要求严格按工艺流程生产',
          timeline: [
            { status: '待生产', time: '2024-05-12 14:20' },
            { status: '生产中', time: '2024-05-13 08:30' },
            { status: '已完成', time: '2024-05-18 17:45' }
          ]
        }
      ];
      
      wx.setStorageSync('orders', sampleOrders);
    }
  },

  globalData: {
    orderCounter: wx.getStorageSync('orderCounter') || 0
  }
})
