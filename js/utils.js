/** =======================================================
 *
 *  公共工具函数
 *
 *  ======================================================== */

Utils = {};

Utils.inherit = function (classChild, classSuper) {
    var p = function () {};
    p.prototype = classSuper.prototype;
    classChild.prototype = new p();
};

Utils.randomFrom = function (lower, upper) {
    return Math.random() * (upper - lower + 1) + lower;
};

Utils.getRandomColor = function() {
    var color = 0xffffff;
    var random = Math.floor(Math.random() * 16);
    return color << random;
};

Utils.getNumberInNormalDistribution = function (mean, std_dev){
    return mean + (randomNormalDistribution() * std_dev);
};

function randomNormalDistribution(){
    var u = 0.0, v = 0.0, w = 0.0, c = 0.0;
    do {
        //获得两个（-1,1）的独立随机变量
        u = Math.random() * 2 - 1.0;
        v = Math.random() * 2 - 1.0;
        w = u * u + v * v;
    } while(w === 0.0 || w >= 1.0)
    //这里就是 Box-Muller转换
    c = Math.sqrt((-2 * Math.log(w)) / w);
    return u * c;
}

Utils.generateFragment = function () {
    var canvas = document.createElement( 'canvas' );
    canvas.width = 64;
    canvas.height = 64;

    var context = canvas.getContext( '2d' );
    context.fillStyle = "rgba(255,255,255,0)";

    var gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );
    gradient.addColorStop( 0.0, "rgba(150,150,150, 0.6)" );
    gradient.addColorStop( 0.5, "rgba(150,150,150, 0.2)" );
    gradient.addColorStop( 1, 'rgba(255,255,255, 0.01)' );

    context.fillStyle = gradient;
    context.fillRect( 0, 0, canvas.width, canvas.height );

    return canvas;
}

Utils.generateWaterFragment = function () {
    var canvas = document.createElement( 'canvas' );
    canvas.width = 64;
    canvas.height = 64;

    var context = canvas.getContext( '2d' );
    context.fillStyle = "rgba(255,255,255,0)";

    var gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );
    gradient.addColorStop( 0.35, "rgba(25,129,197, 0.5)" );
    gradient.addColorStop( 0.65, "rgba(25,129,197, 0.3)" );
    gradient.addColorStop( 1, 'rgba(255,255,255, 0.01)' );

    context.fillStyle = gradient;
    context.fillRect( 0, 0, canvas.width, canvas.height );

    return canvas;
}

Utils.generateRandomNum = function(minNum,maxNum){
    switch(arguments.length){
        case 1:
            return parseInt(Math.random()*minNum+1,10);
            break;
        case 2:
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
            break;
        default:
            return 0;
            break;
    }
}

//数组复制
Utils.copyArray = function(arr){
    var result = [];
    for(var i = 0; i < arr.length; i++){
        result.push(arr[i]);
    }
    return result;
}

Utils.getClosePoint = function(obj, objArr, maxDis){
    /**
     * 在原来的基础上设置一个距离阈值，只有当距离小于这个阈值的时候，才会找到满足最近距离点的index
     * 否则返回-1
     */
    var clostIndex=-1;
    var dis = maxDis;
    for(var i =0 ;i<objArr.length; i++ ){
        if(obj.position.y === objArr[i].position.y){
            var currentDis = Math.abs(obj.position.x-objArr[i].position.x)+Math.abs(obj.position.z-objArr[i].position.z);                if(currentDis<dis){
                dis = currentDis;
                clostIndex = i;
            }
        }
    }
    return clostIndex;
}

Utils.loading = function(timeout){
    setTimeout(function(){
        document.getElementById('loading').style.display = 'none';
    },timeout);
};