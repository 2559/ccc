Page({
  data: {
    orderId: '',
    formData: {
      customer: '',
      product: '',
      quantity: '',
      deliveryDate: '',
      remark: ''
    },
    errors: {},
    minDate: '',
    submitting: false
  },

  onLoad: function () {
    this.generateOrderId();
    this.setMinDate();
  },

  setMinDate: function () {
    var date = new Date();
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    this.setData({
      minDate: year + '-' + month + '-' + day
    });
  },

  generateOrderId: function () {
    var date = new Date();
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    var dateStr = '' + year + month + day;
    
    var orders = wx.getStorageSync('orders') || [];
    var count = 1;
    
    for (var i = 0; i < orders.length; i++) {
      if (orders[i].id && orders[i].id.substring(3, 11) === dateStr) {
        count++;
      }
    }
    
    var orderId = 'SMT' + dateStr + ('00' + count).slice(-3);
    
    this.setData({
      orderId: orderId
    });
  },

  onInput: function (e) {
    var field = e.currentTarget.dataset.field;
    var value = e.detail.value;
    var formData = this.data.formData;
    formData[field] = value;
    
    var errors = this.data.errors;
    delete errors[field];
    
    this.setData({
      formData: formData,
      errors: errors
    });
  },

  onDateChange: function (e) {
    var value = e.detail.value;
    var formData = this.data.formData;
    formData.deliveryDate = value;
    
    var errors = this.data.errors;
    delete errors.deliveryDate;
    
    this.setData({
      formData: formData,
      errors: errors
    });
  },

  validateForm: function () {
    var formData = this.data.formData;
    var errors = {};
    
    if (!formData.customer || formData.customer.trim() === '') {
      errors.customer = '请输入客户名称';
    }
    
    if (!formData.product || formData.product.trim() === '') {
      errors.product = '请输入产品名称';
    }
    
    if (!formData.quantity || formData.quantity === '') {
      errors.quantity = '请输入数量';
    } else if (isNaN(parseInt(formData.quantity)) || parseInt(formData.quantity) <= 0) {
      errors.quantity = '数量必须为正整数';
    }
    
    if (!formData.deliveryDate || formData.deliveryDate === '') {
      errors.deliveryDate = '请选择交货日期';
    }
    
    this.setData({
      errors: errors
    });
    
    return Object.keys(errors).length === 0;
  },

  onSubmit: function (e) {
    if (this.data.submitting) {
      return;
    }
    
    if (!this.validateForm()) {
      wx.showToast({
        title: '请完善表单信息',
        icon: 'none'
      });
      return;
    }
    
    this.setData({
      submitting: true
    });
    
    var now = this.getCurrentTime();
    var formData = this.data.formData;
    
    var newOrder = {
      id: this.data.orderId,
      customer: formData.customer.trim(),
      product: formData.product.trim(),
      quantity: parseInt(formData.quantity),
      orderDate: now,
      deliveryDate: formData.deliveryDate,
      status: '待生产',
      remark: formData.remark ? formData.remark.trim() : '',
      timeline: [
        {
          status: '待生产',
          time: now
        }
      ]
    };
    
    var orders = wx.getStorageSync('orders') || [];
    orders.unshift(newOrder);
    wx.setStorageSync('orders', orders);
    
    var that = this;
    setTimeout(function () {
      that.setData({
        submitting: false
      });
      
      wx.showToast({
        title: '订单创建成功',
        icon: 'success',
        duration: 1500
      });
      
      setTimeout(function () {
        wx.switchTab({
          url: '/pages/list/list'
        });
      }, 1500);
    }, 500);
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
