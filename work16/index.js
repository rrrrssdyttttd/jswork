//需求：鼠标经过盒子  显示遮罩和大图 鼠标移动的时候 让遮罩跟着移动让大图按照比例移动
function $(id) { // 跟据id值获取元素对象
return document.getElementById(id);
}
// 鼠标经过盒子 显示遮罩和大图
$('smallBox').onmouseover = function () {
    $('mask').style.display = 'block';
    $('bigBox').style.display = 'block';
};
// 鼠标离开盒子 隐藏和大图
$('smallBox').onmouseout = function () {
    //隐藏遮罩和大图
    $('mask').style.display = 'none';
    $('bigBox').style.display = 'none';
};
//鼠标在盒子上移动的时候
//让遮罩跟着鼠标移动
$('smallBox').onmousemove = function (event) {
    var event = event || window.event;
    //鼠标在页面中的坐标
    var pageX = event.pageX || event.clientX + document.documentElement.scrollLeft;
    var pageY = event.pageY || event.clientY + document.documentElement.scrollTop;
    //计算鼠标的位置 距盒子的距离
    var boxX = pageX - $('box').offsetLeft;
    var boxY = pageY - $('box').offsetTop;
    //计算遮罩的位置
    var maskX = boxX - $('mask').offsetWidth / 2;
    var maskY = boxY - $('mask').offsetHeight / 2;
    //限定遮罩可移动范围
    if (maskX < 0) {
        maskX = 0;
    }
    if (maskX > $('smallBox').offsetWidth - $('mask').offsetWidth) {
        maskX = $('smallBox').offsetWidth - $('mask').offsetWidth;
    }
    if (maskY < 0) {
        maskY = 0;
    }
    if (maskY > $('smallBox').offsetHeight - $('mask').offsetHeight) {
        maskY = $('smallBox').offsetHeight - $('mask').offsetWidth;
    }
    // 修改遮罩的显示位置
    $('mask').style.left = maskX + 'px';
    $('mask').style.top = maskY + 'px';
    // 按照比例移动大图 大图片能够移动的距离 = 大图的宽度 - 大盒子的宽度
    var bigImgToMove = $('bigImg').offsetWidth - $('bigBox').offsetHeight;
    //遮罩能够移动的总距离 = 小盒的宽度 - 遮罩的宽度
    var maskToMove = $('smallBox').offsetHeight - $('mask').offsetHeight;
    //计算移动比例rate = 大图能够移动的总距例/遮罩能够移动的距离
    var rate = bigImgToMove / maskToMove;
    // 设置大图片当前的位置 = rate * 遮罩当前的位置
    $('bigImg').style.left = -rate * maskY + 'px';
    $('bigImg').style.top = -rate * maskY  + 'px';
};