(function() {
    //pop
    var pop = function(opts){
        //默认参数
        var defOpts = {
            ref     : null,     //参照目标
            refTop  : 0,
            width   : 400,
            height  : 300,
            pos     : '',       //定位方向: '' || center
            isClose : true,
            url : '',
            con     : '',       //html代码
            btns : [{           //按钮
                text : '关闭',
                handler : 'close'
            }],
            onShow : function(){},
            onClose : function(){}
        };
        this.opts = $.extend(defOpts, opts); 
        this.init();
    };

    //初始化
    pop.prototype.init = function(){
        var _ts = this, 
            opts = this.opts;
        //基础属性
        _ts.id = opts.id || 'pop_'+uuid();    //自动设置id
        _ts.body = $('body');             //body
        _ts.bodyH = _ts.body.get(0).scrollHeight;   //body height
        _ts.win = $(window);                    //window
        _ts.winH = _ts.win.height();            //window height
        _ts.winS = _ts.body.get(0).scrollTop;   //scrollTop
        _ts.render();   //渲染

    };

    //定位
    pop.prototype.position = function(){
        var _ts = this, 
            opts = _ts.opts, 
            winH = _ts.winH, 
            winS = _ts.winS, 
            popH = _ts.popH,
            bodyH = _ts.bodyH,
            scrTop = 0, //滚动位置
            popTop = 0; //pop top

        //居中
        _ts.pop.css({'margin-top':-((popH/2))+'px'});
        return;

        if(opts.pos === 'center'){
            //居中
            if(popH > winH){    //弹层高度大于窗口高度
                popTop = winS + 40;
            }else{
                popTop = winS + (winH-popH)/2;
            }
        }else{
            //偏移参考目标
            if (typeof opts.ref === "string" || opts.ref instanceof String) {
                opts.ref = $(opts.ref);
            }
            var refOffset = opts.ref.offset();
            popTop = refOffset.top + refOffset.height + opts.refTop;
            var popAllH = popTop + popH;

            //window scrollTop
            if(popAllH > bodyH){    //body的高度不能弹出层的高度时
                popTop = bodyH - popH - 40;
            }
        }

        //pop定位
        _ts.pop.css({'top':popTop});

        //scrollTop
        if(popH > winH ){
            //当窗口少于弹窗高度，弹窗上留40px
            scrTop = popTop - 40 - winS;
            popToTop(scrTop, winS);
        }else{
            if(winS > popTop){
                scrTop = popTop - 40 - winS;
                popToTop(scrTop, winS);
            }else if((popH + popTop - winH - winS) > 0){
                //当弹窗显示不完时，窗口滑动让弹窗居中显示
                var scrtop = popTop + popH/2 - winH/2 - winS;
                popToTop(scrtop, winS);
            }
        } 
    };

    //渲染按钮
    pop.prototype.renderBtn = function(btns, _ts){
        var btnHtml = '',
            cls = '',
            len = btns.length>2 ? 2 : btns.length,  //最多显示2个按钮
            close = function(){
                _ts.remove();
            };

        if(len > 0){
            for(var i=0, l=len; i<l; i++){
                var ret = btns[i];
                if(typeof ret === 'object' && typeof ret.text !=='undefined'){
                    //按钮
                    var btnCls = ret.gray ? ' gray' : ''; 
                        btn = '';
                    if(typeof ret.href !== 'undefined'){
                        btn = '<span data-i="'+i+'" class="'+btnCls+'"><a target="'+(ret.target?ret.target:'_self')+'" href="'+ret.href+'">'+ret.text+'</a></span>';
                    }else{
                        btn = '<span data-i="'+i+'" class="'+btnCls+'">'+ret.text+'</span>';
                    }
                    btnHtml += btn;
                    cls += '1' + '';

                    //回调方法
                    btns[i].handler = (typeof btns[i].handler !== 'undefined' && btns[i].handler === 'close') ? close : btns[i].handler;

                }else{
                    cls += '0' + '';
                }
            }
            return '<div class="pm_ft pm_ft_'+cls+'">'+btnHtml+'</div>';
        }else{
            return '';
        }
    };

    //渲染
    pop.prototype.render = function(){
        var _ts = this,
            opts = _ts.opts,
            titleEl = opts.ti ? '<div class="pm_hd">'+opts.ti+'</div>' : '',
            closeEl = opts.isClose ? '<span class="pm_close"><i>关闭</i></span>' : '',
            btnsEl = _ts.renderBtn(opts.btns, _ts),
            conEl = '',
            cls = '';

        //消息
        if(typeof opts.msg !== 'undefined'){
            conEl = '<div class="pm_msg">'+opts.msg+'</div>';
        }else if(typeof opts.url !== 'undefined' && opts.url != ''){
            cls = 'pop_ifr';
        }else if(typeof opts.con !== 'undefined'){
            if($.isFunction(opts.con)){ //fun
                conEl = opts.con(_ts);
            }else{ //string
                conEl = opts.con;
            }
        }
        

        //组装
        var html = '<div id="'+_ts.id+'" class="pop_mod '+cls+'" style="visibility:hidden;">'+titleEl+'<div class="pm_bd">'+conEl+'</div>'+btnsEl+closeEl+'</div>',
            $popWrap = $('#pop_dialogs'),
            $popOver = $('#pop_overlay');

        if($popWrap.size() === 0 && $popOver.size() === 0){
            _ts.body.append('<div id="pop_dialogs">'+html+'</div><div id="pop_overlay" style="height:'+_ts.bodyH+'px;display:none;"></div>');
            $popOver = $('#pop_overlay');
        }else{
            $popWrap.html(html);
        }


        var $pop = _ts.pop = $('#'+_ts.id);
        _ts.popOver = $popOver;
        _ts.popH = $pop.height();
        opts.pos = (opts.ref === null)? 'center' : opts.pos;

        //定位
        _ts.position();
              
        //显示
        $popOver.show();
        $pop.css('visibility','visible');

        //if page
        setTimeout(function(){
            if(typeof opts.url !== 'undefined' && opts.url != ''){
                $('#'+_ts.id+' .pm_bd').html('<iframe width="100%" height="100%" id="'+_ts.id+'_iframe" src="'+opts.url+'" frameborder="0" scrolling="no"></iframe>'); 
            }
        },500);

        //绑定事件
        _ts.bind();

    };

    //绑定事件
    pop.prototype.bind = function(){
        var _ts = this, opts = _ts.opts;

        //执行onShow
        opts.onShow(_ts.pop, _ts);

        //btns
        var btns = opts.btns;
        _ts.pop.on('click', '.pm_ft span', function(){
            var i = $(this).attr('data-i'); 
            if($.isFunction(btns[i].handler)){
                btns[i].handler(_ts.pop, _ts);
            }
        });

        //close
        if(opts.isClose){
            _ts.pop.on('click', '.pm_close', $.proxy(this.remove, _ts));
        }

        _ts.pop.on('click', 'a', $.proxy(this.remove, _ts));

        //旋转屏幕
        /*_ts.win.bind('orientationchange',function(e){
            _ts.body.css('height','auto');
            _ts.bodyH = _ts.body.get(0).scrollHeight;
            _ts.popOver.height(_ts.bodyH);
            _ts.winH = _ts.win.height();            
            _ts.winS = _ts.body.get(0).scrollTop;  
            _ts.position();
        });*/
    };

    //重设
    pop.prototype.reset = function(){
        var _ts = this;
        _ts.popH = _ts.pop.height();
        _ts.position();
    };

    //移除
    pop.prototype.remove = function(){
        var _ts = this;

        //执行onClose
        if($.isFunction(_ts.opts.onClose)){
            _ts.opts.onClose(_ts.pop, _ts);
        }

        _ts.pop.remove();
        _ts.popOver.hide().height(_ts.bodyH);
        //_ts.body.height(_ts.bodyH);
        //_ts.win.unbind('orientationchange');
        _ts = null;
    };

    //uuid
    var uuid = function(){
        var S4 = function() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    };

    //页面滑动
    var popToTop = function(h,s){
        var nav_t = 0;
        var nav_d = 30;  //速度
        var nav_c = h;   //高度
        var nac = $('body').get(0);
        var popSc = function(t,b,c,d){
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        };
        function down(){
            if(nav_t<nav_d){
                nav_t++;
                nac.scrollTop = Math.ceil(popSc(nav_t,0,nav_c,nav_d))+s;
                setTimeout(down, 20);
            }
        }
        down();
    };

    //注册$插件
    $.fn.pop = function (opts) {
        return new pop(opts);
    };

}).call(this);

