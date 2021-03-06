// 设计一个库第一点要考虑的是什么？
// 方便使用：对外提供一个接口
(function (window) {
  function myMobile(selector) {
    return myMobile.prototype._init(selector);
  }
  myMobile.prototype = {
    _init: function (selector) {
      if (typeof selector === 'string') {
        this.ele = window.document.querySelector(selector);
        // this 原型对象
        return this;
      }
    },
    // 单击事件
    // 考虑：点击开始，结束，限制时间
    tap: function (handler) {
      this.ele.addEventListener('touchstart', touchFn);
      this.ele.addEventListener('touchend', touchFn);
      let startTime, endTime; // 性能优化：使用一个let效率会更高，代码逼格也高一些
      function touchFn(e) {
        switch (e.type) {
          case 'touchstart':
            startTime = new Date().getTime();
            break;
          case 'touchend':
            endTime = new Date().getTime();
            // 小于200ms为一个单击事件
            if (endTime - startTime < 200) {
              handler.call(this, e);
            }
            break;
        }
      }
    },
    // 长按事件
    // 需要监听三个事件
    longTap: function (handler) {
      this.ele.addEventListener('touchstart', touchFn);
      this.ele.addEventListener('touchmove', touchFn);
      this.ele.addEventListener('touchend', touchFn);
      let timerId;

      function touchFn(e) {
        switch (e.type) {
          case 'touchstart':
            timerId = setTimeout(function () {
              handler.call(this, e);
            }, 2000);
            break;
          case 'touchmove':
            clearTimeout(timerId);
            break;
          case 'touchend':
            clearTimeout(timerId);
            break;
        }
      }
    },
    // 左侧滑动
    // 滑动时间、滑动幅度
    slideLeft: function (handler) {
      this.ele.addEventListener('touchstart', touchFn);
      this.ele.addEventListener('touchend', touchFn);
      let startX, startY, endX, endY;

      function touchFn(e) {
        let firstTouch = e.changedTouches[0]; // changedTouches:数组，触摸点的坐标
        switch (e.type) {
          case 'touchstart':
            startX = firstTouch.pageX;
            startY = firstTouch.pageY;
            break;
          case 'touchend':
            endX = firstTouch.pageX;
            endY = firstTouch.pageY;
            // 确定是横向滑动还是竖向滑动，是否滑动超过一定距离
            if (Math.abs(endX - startX) >= Math.abs(endY - startY) && startX - endX >= 25) {
              handler.call(this, e);
            }
            break;
        }
      }
    },
    // 右侧滑动
    // 滑动时间、滑动幅度
    slideRight: function (handler) {
      this.ele.addEventListener('touchstart', touchFn);
      this.ele.addEventListener('touchend', touchFn);
      let startX, startY, endX, endY;

      function touchFn(e) {
        let firstTouch = e.changedTouches[0]; // changedTouches:数组，触摸点的坐标
        switch (e.type) {
          case 'touchstart':
            startX = firstTouch.pageX;
            startY = firstTouch.pageY;
            break;
          case 'touchend':
            endX = firstTouch.pageX;
            endY = firstTouch.pageY;
            // 确定是横向滑动还是竖向滑动，是否滑动超过一定距离
            if (Math.abs(startX - endX) >= Math.abs(startY - endY) && endX - startX >= 25) {
              handler.call(this, e);
            }
            break;
        }
      }
    }
  }
  window.$ = window.myMobile = myMobile;
})(window)