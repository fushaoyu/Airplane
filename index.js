//暂停事件
function stop() {
    alert('开始~~~');
}
window.onload = function () {
    var container = document.getElementById('container');//最外容器
    var aircraft = document.getElementById('aircraft');//飞机
    //随机生成N加怪物机
    //var num = Math.floor(Math.random()*5+1);
    var num = 5;
    createMonster();
    document.onkeydown = keyDown;


    //操作键位
    function keyDown(event){  // 方向键控制元素移动函数
        var event = event || window.event;  // 标准化事件对象
        switch(event.keyCode){  // 获取当前按下键盘键的编码
            case 37 :  // 按下左箭头键，向左移动5个像素
                aircraft.style.left = aircraft.offsetLeft - 10  + "px";
                break;
            case 39 :  // 按下右箭头键，向右移动5个像素
                aircraft.style.left = aircraft.offsetLeft + 10 + "px";
                break;
            case 38 :  // 按下上箭头键，向上移动5个像素
                aircraft.style.top = aircraft.offsetTop  - 10 + "px";
                break;
            case 40 :  // 按下下箭头键，向下移动5个像素
                aircraft.style.top = aircraft.offsetTop  + 10 + "px";
                break;
            case 88 :  // 按x箭头键，发射子弹
                foundFound();
                break;
        }
        return false
    }


    //生成本机子弹
    function foundFound() {
        var aircraftSiteX = aircraft.getBoundingClientRect().x;
        var aircraftSiteY = aircraft.getBoundingClientRect().y-68;

        var cartridge = document.createElement('div');//本机弹夹
        cartridge.className = 'cartridge';
        var dynamic = 0;
        for (var i=0;i<3;i++) {
            var div = document.createElement("div");
            div.className = 'Found';
            cartridge.appendChild(div);
            cartridge.style.top =  aircraftSiteY+'px';
            cartridge.style.left = aircraftSiteX+14+'px';
            container.appendChild(cartridge);
        }
        var myTime = setInterval(function () {
            dynamic+=5;
            cartridge.style.top =  aircraftSiteY-dynamic+'px';
            cartridge.style.left = aircraftSiteX+14+'px';
            var variation = cartridge.style.top.substring(0,cartridge.style.top.indexOf('px'))
            if (variation < 0) {
                clearInterval(myTime);
                cartridge.remove();
            }
        },10);
        HostBo();
    }

    //创造怪物
    function createMonster() {
        var dynamic = 30;
        var width = document.body.clientWidth;
        var hight = window.screen.availHeight;
        for (var i=0;i<num;i++) {
            var placeX = Math.floor(Math.random()*width);
            var placeY = Math.floor(Math.random()*15);
            var span = document.createElement("span");
            span.className = 'monster'
            var span2 = document.createElement("span");
            span2.className = 'monsterBullet';
            for (var j=0;j<3;j++) {
                var div = document.createElement("span");
                div.className = 'Found';
                span2.appendChild(div);
            }

            span.className = 'iconfont icon-feiji1-copy monster';
            span.style.left = placeX  + "px";
            span.style.top = placeY  + "px";

            span.appendChild(span2);
            container.appendChild(span);
        }
        if (num > 0) {
            var getspan2 = document.getElementsByClassName('monster');
            var myTime = setInterval(function () {
                dynamic++;
                for (var k=0;k<getspan2.length;k++) {
                    var variation = getspan2[k].style.top.substring(0,getspan2[k].style.top.indexOf('px'));
                    getspan2[k].style.top = (Number(variation)+Number(dynamic))  + "px";
                }
                if (Number(variation)+Number(dynamic) > hight) {
                    clearInterval(myTime);
                    for (var q=0;q<getspan2.length;q++) {
                        getspan2[q].remove();
                    }
                    createMonster();
                }
            },500);
        }

    }



    //判断主机子弹是否碰到怪物
    function HostBo() {
        var cartridge = document.getElementsByClassName('cartridge');
        var monster = document.getElementsByClassName('monster');//怪物
        var cartridgeSiteY = cartridge[0].getBoundingClientRect().y;//主机子弹在屏幕的什么位置
        var cartridgeSiteX = cartridge[0].getBoundingClientRect().x;//主机子弹在屏幕的什么位置
        var monsterSiteY,monsterSiteX;
        for (var i=0;i<monster.length;i++) {
            monsterSiteY = monster[i].getBoundingClientRect().y;//怪物在屏幕的什么位置
            monsterSiteX = monster[i].getBoundingClientRect().x;//怪物在屏幕的什么位置
            if (cartridgeSiteY <= monsterSiteY && (monsterSiteX-cartridgeSiteX) < 5 ) {
                monster[i].className = 'iconfont icon-baozha bo monster';
                monster[i].remove();
            }
        }
        if (monster.length === 0) {
            alert('恭喜过关！');
            if (num == 20) {
                alert('恭喜通关！');
                return;
            }
            num++;
            var number = 4;
            var mengcheng = document.getElementById('mengcheng');
            var Time = setInterval(function () {
                number--;
                mengcheng.style.display = 'block';
                mengcheng.innerText = number;
            },1000)
            setTimeout(function () {
                mengcheng.style.display = 'none';
                number = 4;
                clearInterval(Time);
                createMonster();
            },3000)
        }
    }


}