Page({
  data: {
    order: null,
    statusClass: '',
    showAction: false,
    actionButton: null
  },

  onLoad: function (options) {
    var orderId = options.orderId;
    this.loadOrder(orderId);
  },

  loadOrder: function (orderId) {
    var orders = wx.getStorageSync('orders') || [];
    var order = null;
    
    for (var i = 0; i < orders.length; i++) {
      if (orders[i].id === orderId) {
        order = orders[i];
        break;
      }
    }
    
    if (order) {
      this.setData({
        order: order,
        statusClass: this.getStatusClass(order.status),
        showAction: this.shouldShowAction(order.status),
        actionButton: this.getActionButton(order.status)
      });
    } else {
      wx.showToast({
        title: '订单不存在',
        icon: 'none'
      });
      setTimeout(function () {
        wx.navigateBack();
      }, 1500);
    }
  },

  getStatusClass: function (status) {
    var statusMap = {
      '待生产': 'status-waiting',
      '生产中': 'status-producing',
      '已完成': 'status-completed',
      '已发货': 'status-shipped'
    };
    return statusMap[status] || '';
  },

  shouldShowAction: function (status) {
    return status !== '已发货';
  },

  getActionButton: function (status) {
    var actionMap = {
      '待生产': { text: '开始生产', action: 'start', class: 'btn-start' },
      '生产中': { text: '完成生产', action: 'finish', class: 'btn-finish' },
      '已完成': { text: '发货', action: 'ship', class: 'btn-ship' }
    };
    return actionMap[status] || null;
  },

  handleAction: function (e) {
    var action = e.currentTarget.dataset.action;
    var order = this.data.order;
    var orders = wx.getStorageSync('orders') || [];
    var now = this.getCurrentTime();
    
    var newStatus = '';
    var timelineText = '';
    
    if (action === 'start') {
      newStatus = '生产中';
      timelineText = '开始生产';
    } else if (action === 'finish') {
      newStatus = '已完成';
      timelineText = '完成生产';
    } else if (action === 'ship') {
      newStatus = '已发货';
      timelineText = '已发货';
    }
    
    for (var i = 0; i < orders.length; i++) {
      if (orders[i].id === order.id) {
        orders[i].status = newStatus;
        orders[i].timeline.push({
          status: timelineText,
          time: now
        });
        break;
      }
    }
    
    wx.setStorageSync('orders', orders);
    
    wx.showToast({
      title: '状态已更新',
      icon: 'success',
      duration: 1500
    });
    
    var that = this;
    setTimeout(function () {
      that.loadOrder(order.id);
    }, 1500);
  },

  getCurrentTime: function () {
    var date = new Date();
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    var hours = ('0' + date.getHours()).slice(-2);
    var minutes = ('0' + date.getMinutes()).slice(-2);
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;
  }
})
