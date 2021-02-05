(function(window){
    // 对外提供的接口
    function myMobile(selector){
        return myMobile.prototype._init(selector);
    }
    myMobile.prototype = {
        _init: function(selector){
            if(typeof selector === "string"){
                this.ele = window.document.querySelector(selector);
                // this 原型对象
                return this;
            }
        },
        // 单击事件
        tap: function(handler){
            this.ele.addEventListener('touchstart', touchFn);
            this.ele.addEventListener('touchend', touchFn);
            // let 一个 效率最高
            let startTime,
                endTime;
            function touchFn(e){
                switch (e.type){
                    case 'touchstart':
                        startTime = new Date().getTime();
                        break;
                    case 'touchend':
                        endTime =   new Date().getTime();
                        // ms
                        if(endTime - startTime < 100){
                            handler.call(this, e);
                        }
                        break;
                }
            }
            
        },
        longTap:function(handler){
            this.ele.addEventListener('touchstart', touchFn);
            this.ele.addEventListener('touchend', touchFn);
            this.ele.addEventListener('touchmove', touchFn);
            let timerId;
            function touchFn(e){
                switch (e.type){
                    case 'touchstart':
                        timerId = setTimeout(function(){
                            handler.call(this, e);
                        }, 2000)
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
        slideLeft:function(handler){
            this.ele.addEventListener('touchstart', touchFn);
            this.ele.addEventListener('touchend', touchFn);
            let startX, startY, endX, endY;
            function touchFn(e){
                let firstTouch = e.changedTouches[0];
                // console.log(firstTouch)
                switch (e.type){
                    case 'touchstart':
                        startX  = firstTouch.pageX;
                        startY  = firstTouch.pageY;
                        break;
                    case 'touchend':
                        endX  = firstTouch.pageX;
                        endY  = firstTouch.pageY;
                        // 确定是横向滑动还是竖向滑动
                        if( Math.abs(endX -startX) >= Math.abs(endY - startY) &&
                        startX - endX >= 150){
                            handler.call(this, e);
                        }
                        break;
                }
            }
        }
    }
    window.$ = window.myMobile = myMobile;
})(window)