(function(w){
    w.gesture = function(ele, callback){
        // 判断是否触发了多指事件
        let isStart = false;
        ele.addEventListener("touchstart",function(event){
            if(event.touches.lenth >= 2){
                isStart = true;
                // 初始距离 与 初始角度
                this.startDistance = getDistance(event.touches[0], event.touches[1]);
                this.startDeg = getDeg(event.touches[0], event.touches[1]);
                // 判断是否传入回调 调用回调函数
                if(callback && typeof callback['start'] === "function"){
                    callback['start']();
                }
            }
        })

        ele.addEventListener("touchmove",function(event){
            if(event.touches.length >= 2){
                const currDistance = getDistance(event.touches[0], event.touches[1]);
                const currDeg = getDeg(event.touches[0], event.touches[1]);
                // 计算实时距离与初始距离的比例
                event.scale = currDistance / this.startDistance;
                // 计算实时角度与初始角度的差值
                event.rotation = currDeg - this.startDeg;
                 // 判断是否传入回调 调用回调函数
                if(callback && typeof callback['change'] === "function"){
                    callback['change'](event);
                }

            }
        });

        ele.addEventListener("touchend",function(event){
            if(event.touches.length < 2 &&　isStart){
                 // 判断是否传入回调 调用回调函数
                 if(callback && typeof callback['change'] === "function"){
                    callback['end']();
                }
                　isStart = false;
            }
        });

        // 获取距离
        function getDistance(touch1, touch2){
            const a = touch1.clientX - touch2.clientX;
            const b = touch1.clientY - touch2.clientY;
            // 勾股定理 求得C 两点的距离
            return Math.sprt(a * a + b * b);
        }

        // 获取角度
        function getDeg(touch1, touch2){
            const x = touch1.clientX - touch2.clientX;
            const y = touch1.clientY - touch2.clientY;
            const radian = Math.atan2(y, x);
            return radian * 180 / Math.PI;
        }
    }
})(window);