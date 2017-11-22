 //收藏本站 bbs.ecmoban.com
function AddFavorite(title, url) {
  try {
      window.external.addFavorite(url, title);
  }
catch (e) {
     try {
       window.sidebar.addPanel(title, url, "");
    }
     catch (e) {
         alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
     }
  }
}
// 轮播图
 window.onload = function () {/*整个页面加载完毕后获取元素值*/
            var container = document.getElementById('container');
            var list = document.getElementById('list');
            var buttons = document.getElementById('buttons').getElementsByTagName('span');
            var prev = document.getElementById('prev');
            var next = document.getElementById('next');
            var index = 1;
            var len = 6;
            var animated = false;
            var interval = 3000;//间隔时间
            var timer;
        /*图片移动*///offset偏移大小
            function animate (offset) {
                if (offset == 0) {
                    return;
                }
                animated = true;
                var time = 200;
                var inteval = 1;
                var speed = offset/(time/inteval);
                var left = parseInt(list.style.left) + offset;

                var go = function (){
                    if ( (speed > 0 && parseInt(list.style.left) < left) || (speed < 0 && parseInt(list.style.left) > left)) {
                        list.style.left = parseInt(list.style.left) + speed + 'px';
                        setTimeout(go, inteval);
                    }
                    else {
                        list.style.left = left + 'px';
                        if(left>-200){
                            list.style.left = -1349 * len + 'px';
                        }
                        if(left<(-1349 *len)) {
                            list.style.left = '-1349px';
                        }
                        animated = false;
                    }
                }
                go();
            }
    /*按钮的移动*/
            function showButton() {
                for (var i = 0; i < buttons.length ; i++) {
                    if( buttons[i].className == 'on'){
                        buttons[i].className = '';
                        break;
                    }
                }
                buttons[index - 1].className = 'on';
            }

            function play() {
                timer = setTimeout(function () {
                    next.onclick();
                    play();
                }, interval);
            }
            function stop() {
                clearTimeout(timer);
            }
            /*箭头按钮*/
            next.onclick = function () {
                if (animated) {
                    return;
                }
                if (index == 6) {
                    index = 1;
                }
                else {
                    index += 1;
                }
                animate(-1349);
                showButton();
            }
            prev.onclick = function () {
                if (animated) {
                    return;
                }
                if (index == 1) {
                    index = 6;
                }
                else {
                    index -= 1;
                }
                animate(1349);
                showButton();
            }
        /*按钮的任意切换带动图片的任意切换*/
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].onclick = function () {
                    if (animated) {
                        return;
                    }
                    if(this.className == 'on') {
                        return;
                    }
                    var myIndex = parseInt(this.getAttribute('index'));//返回指定属性名的属性值
                    var offset = -1349 * (myIndex - index);//目标值减去原始值再乘以图片宽度；
                    animate(offset);//调用图片移动函数
                    index = myIndex;
                    showButton();//调用按钮移动函数
                }
            }
                /*onmouseover 事件会在鼠标指针移动到指定的元素上时发生。*/
                container.onmouseover = stop;/*鼠标事件，移动到图片停止轮播*/
                container.onmouseout = play;/*移动到图片开始轮播*/

            play();

        }