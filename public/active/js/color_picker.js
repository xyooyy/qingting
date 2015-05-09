/**
 颜色选择器
 **/


function colorpicker(ele, option, callback) {

    this.callback = callback;
    this.option = option;
    this.color = 'url(http://test.aiwanpai.com/managers/assets/css/res/nullcolor.jpg)';
    this.box = ele;
    if (option) {
        this.color = (option['color']) ? (option['color']) : 'url(http://test.aiwanpai.com/managers/assets/css/res/nullcolor.jpg)';
        this.width = (option['width']) ? (option['width']) : 60;
        //console.log("没有参数");
    }
    else {
        this.color = 'url(http://test.aiwanpai.com/managers/assets/css/res/nullcolor.jpg)';
    }
    this.init();
}

colorpicker.prototype.init = function () {
    this.open = 0;
    //this.inputarea=$('<div style="cursor:pointer;margin-top:1px;box-shadow:0 0 2px gray; border:3px solid rgb(250,250,250) ;display:inline-block;margin-left:20px;width:'+this.width+'px;height:15px;background:'+this.color+';border-radius:0px;"></div>');


    this.inputarea = $('<div class="inputArea" style="cursor:pointer;margin-top:1px;box-shadow:0 0 2px gray; border:3px solid rgb(250,250,250) ;display:inline-block;float:right;margin-left:20px;width:88px;height:30px;background:' + this.color + ';border-radius:0px;"></div>');

    this.board = $('<div class="colorboard" style="z-index:999;margin-top:10px;"> </div>');

    this.colors = new Array("#00145e", "#150241", "#340147", "#430b1f", "#6e0600", "#661f00", "#653a00", "#644700", "#797600", "#2a4913",

        "#002e99", "#200162", "#4d0168", "#650f2f", "#a40900", "#9a2c01", "#975600", "#946a00", "#b6b200", "#3e6a1e",

        "#0044ff", "#3a01a3", "#8601ad", "#a8194a", "#ff2811", "#fe5409", "#fc9b00", "#fbbe00", "#ffff33", "#66b231",

        "#2e70fd", "#4901e4", "#af01f1", "#dd2168", "#fd4b3f", "#fd7137", "#fca730", "#fdc331", "#fffa59", "#85cd4c",

        "#6392ff", "#722dfd", "#c534fe", "#e5588d", "#fe776e", "#fd9468", "#febb63", "#fed264", "#fefb83", "#a3da78",

        "#98b7fe", "#a073fd", "#da78fe", "#ef90b3", "#ffa69f", "#feb79a", "#fdd298", "#fde197", "#fffeab", "#c2e5a6",

        "#cadcfd", "#d0bcfe", "#edbbff", "#f5c8d8", "#fed2ce", "#fedccc", "#ffeacc", "#fff1ca", "#fefed7", "#d8ebc9"
    );
    var picker = this;

    //for(var i in this.colors){
    for (var i = 0; i < 70; i++) {


        //var r=Math.floor(256*Math.random());
        //var g=Math.floor(256*Math.random());
        //var b=Math.floor(256*Math.random());
        //var color=this.colors[i];

        //var r=Math.floor(255*255*255/70*i%255);
        //var g=Math.floor((255*255*255/70*i/255)%255);
        //var b=Math.floor((255*255*255/70*i/(255*255))%255);

        //var color='rgb('+r+','+g+','+b+')';
        var color = this.colors[i];
        var newcolorpic = $('<div class="colorblock" style="background:' + color + '"></div>');
        this.board.append(newcolorpic);
    }


    this.blackwhitearea = $('<div class="blackwhitearea"></div>');
    var newcolorpic = $('<div class="colorblock nocolor" ></div>');
    this.blackwhitearea.append(newcolorpic);

    for (var i = 0; i < 8; i++) {
        var r = 255 - Math.floor(255 / 9 * i);
        var color = 'rgb(' + r + ',' + r + ',' + r + ')';
        var newcolorpic = $('<div class="colorblock" style="background:' + color + '"></div>');
        this.blackwhitearea.append(newcolorpic);
    }
    var newcolorpic = $('<div class="colorblock" style="background:black"></div>');
    this.blackwhitearea.append(newcolorpic);

    this.board.append(this.blackwhitearea);

    this.board.hide();

    this.inputarea.on('click', function () {
        if (picker.open == 0) picker.openboard();
        else picker.closeboard();
    });
    if (this.box) {
        this.box.append(this.inputarea);
        //this.box.append('<br/>');
        this.box.append(this.board);
    }

};

colorpicker.prototype.getInputArea = function () {
    return this.inputarea;
}

colorpicker.prototype.getBoard = function () {
    return this.board;
}

colorpicker.prototype.openboard = function () {
    var picker = this;
    this.open = 1;
    this.inputarea.after(this.board);
    this.board.parent().css('position', 'relative');
    this.board.css({'left': '20px', 'top': '70px', 'position': 'absolute'});

    //this.board.css({'y':'900px'}).transition({'y':'30px'});
    this.board.removeClass('colorfadeIntop').addClass('colorfadeIntop').show();

    $('.colorblock').unbind();
    var color = this.colors;
    var input = this.inputarea;
    this.board.find('.colorblock').on('click', function () {
        //alert('a');

        picker.closeboard();
        if ($(this).hasClass('nocolor')) {

            input.attr('value', color[$(this).index()]);

            picker.inputarea.css({'background': 'url(http://test.aiwanpai.com/managers/assets/css/res/nullcolor.jpg)'});

            if (picker.callback) {
                picker.callback.call(this, 'none');
            }
        } else {

            var pickcolor = $(this).css('background-color');
            input.attr('value', color[$(this).index()]);

            picker.inputarea.css({'background': pickcolor});

            if (picker.callback) {
                picker.callback.call(this, pickcolor);
            }
        }

    });
    this.board.unbind();
    this.board.on('click', function () {
        picker.closeboard();
    })

    $(document).click(function (e) {
        var board = picker.getBoard().get(0),
            input = picker.getInputArea().get(0),
            target = e.target;
        if ((board !== target && !$.contains(board, target)) && (input !== target && !$.contains(input, target))) {
            picker.closeboard();
        }
    });


}


colorpicker.prototype.getValue = function () {

    return this.inputarea.attr('value');

}

colorpicker.prototype.setColor = function (color) {
    this.color = color;
}

colorpicker.prototype.closeboard = function () {
    this.open = 0;

    var picker = this;

    this.board.fadeOut(function () {
        picker.board.remove()
    });
}
