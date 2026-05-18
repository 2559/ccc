Page({
  data: {
    orders: [],
    filteredOrders: [],
    currentFilter: '全部'
  },

  onLoad: function () {
    
  },

  onShow: function () {
    this.loadOrders();
  },

  loadOrders: function () {
    var orders = wx.getStorageSync('orders') || [];
    this.setData({
      orders: orders
    });
    this.filterOrders();
  },

  onFilterChange: function (e) {
    var status = e.currentTarget.dataset.status;
    this.setData({
      currentFilter: status
    });
    this.filterOrders();
  },

  filterOrders: function () {
    var orders = this.data.orders;
    var filter = this.data.currentFilter;
    
    if (filter === '全部') {
      this.setData({
        filteredOrders: orders
      });
    } else {
      var filtered = orders.filter(function (order) {
        return order.status === filter;
      });
      this.setData({
        filteredOrders: filtered
      });
    }
  },

  goToDetail: function (e) {
    var orderId = e.currentTarget.dataset.orderId;
    wx.navigateTo({
      url: '/pages/detail/detail?orderId=' + orderId
    });
  },

  getStatusClass: function (status) {
    var statusMap = {
      '待生产': 'status-waiting',
      '生产中': 'status-producing',
      '已完成': 'status-completed',
      '已发货': 'status-shipped'
    };
    return statusMap[status] || '';
  }
})
