function Transform(element) {
    let transform = '',
        units = {},
        transforms = {},
        attrs = ['scale', 'scaleX', 'rotate', 'translate'];
    attrs.forEach((attr) => {
        if (attr.indexOf('scale') >= 0) {
            units[attr] = '';
            transforms[attr] = 1;
        } else {
            units[attr] = attr.indexOf('translate') >= 0 ? 'px' : 'deg';
            transforms[attr] = 0;
        }

        Object.defineProperty(element, attr, {
            get: function () {
                return transforms[attr];
            },
            set: function (value) {
                transform = '';
                transforms[attr] = value;
                attrs.forEach((attr) => {
                    transform += attr + '(' + transforms[attr] + units[attr] + ')';
                })
                // webkitTransform: 兼容IE
                element.style.transform = element.style.webkitTransform = transform;
            }
        })
    })
}