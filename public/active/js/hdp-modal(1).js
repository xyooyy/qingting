/**
 * Created by kiner on 2015/1/27.
 */

/**
 * 自定义模态框   kiner
 * @param config  =  {
        box : $('body'),//将模态框放置的到该容器
        title : "这是标题",//模态框标题
        btns :  [//按钮组
                    {
                        id:"ok",
                        name : "确定重置",
                        listener : function(){

                            //此处写重置请求
                            //modal.showWithTitle("重置成功",true);
                            modal.hide();
                        }
                    },

                    {
                        id:"close",//按钮id，用于删除等操作，注：此id不是标签属性，仅仅是按钮的唯一标识
                        name : "关闭",//按钮显示的文本
                        classes : ['modalClose'],//需给按钮绑定的样式
                        listener : function(modal){//单击按钮时需要进行的操作
                            modal.hide();
                        }
                    }
            ];
    };
 *
 *
 *
 */
function hdpModal(config) {

    var defaultConfig = {
        box: $('body'),
        title: "这是标题",
        btns: this.alertBtn
    };

    this.opt = $.extend(defaultConfig, config);

    var opt = this.opt;
    this.box = opt.box;
    this.title = opt.title;
    this.btns = opt.btns;


    this.init();

}

/**
 * 重置所有设置
 */
hdpModal.prototype.resetConfig = function () {
    var opt = this.opt;
    this.box = opt.box;
    this.title = opt.title;
    this.btns = opt.btns;
    this.init();
};

/**
 * 初始化模态框
 */
hdpModal.prototype.init = function () {

    this.destroy();
    this.modal = $('<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">' +
    '<div class="modal-dialog">' +
    '<div class="modal-success-alert">' +
    '<span class="text">' +
    '</span>' +
    '</div>' +
    '</div>' +
    '</div>');

    this.box.append(this.modal);

    this.modal.find('.text').text(this.title);

    var $this = this;

    //if(this.btns.length==0){
    //    this.btns = this.alertBtn;
    //}
    for (var i = 0; i < this.btns.length; i++) {
        var btn = $('<a href="javascript:;">' + this.btns[i].name + '</a>');
        var styles = this.btns[i].classes;

        if (styles) {
            for (var j = 0; j < styles.length; j++) {

                btn.addClass(styles[j]);

            }
        }

        var listen = this.btns[i].listener;
        (function (listen) {
            btn.click(function (e) {
                listen($this, e);
            });
        })(listen);

        $('.modal-success-alert').append(btn);
    }

};


/**
 * 显示模态框
 */
hdpModal.prototype.show = function () {
    this.modal.modal("show");
};

/**
 * 设置标题并显示
 * @param title
 */
hdpModal.prototype.showWithTitle = function (title, isAlert) {
    this.title = title;
    if (isAlert) {
        this.resetBtns();
    } else {
        this.init();
    }
    this.modal.modal("show");
};
/**
 * 以alert的形式展示
 * @param title
 */
hdpModal.prototype.showAlert = function (title) {
    this.title = title;
    this.resetBtns(this.alertBtn);
    this.modal.modal("show");
};

/**
 * 隐藏模态框
 */
hdpModal.prototype.hide = function () {
    this.modal.modal("hide");
};
/**
 * 重新设置标题
 * @param title
 */
hdpModal.prototype.setTitle = function (title) {
    this.title = title;
    this.init();
}
/**
 * 销毁
 */
hdpModal.prototype.destroy = function () {
    if (this.modal)
        this.modal.remove();
};
/**
 * 在原有的基础上新增按钮
 * @param name
 * @param listener
 */
hdpModal.prototype.addBtn = function (btns) {

    for (var i = 0; i < btns.length; i++) {
        var btn = {
            name: btns[i].name,
            listener: btns[i].listener
        };
        this.btns.push(btn);
    }
    this.init();
};

/**
 * 删除原有按钮并设置新按钮,若不给出新按钮，则默认显示确定按钮，以alert样式显示
 * @param btns
 */
hdpModal.prototype.resetBtns = function (btns) {

    if (!btns) {
        this.btns = this.alertBtn;
    } else {
        this.btns = btns;
    }

    this.init();
};

/**
 * 移除所有按钮
 * @param btnids
 */
hdpModal.prototype.removeBtns = function (btnids) {

    if (!btnids) {
        return;
    }

    for (var i = 0; i < btnids.length; i++) {

        var btnid = btnids[i];
        for (var j = 0; j < this.btns.length; j++) {
            var btn = this.btns[j];
            if (btn.id == btnid) {
                this.btns.splice(j, 1);
            }
        }

    }

    this.init();
};

/**
 * 默认alert框按钮样式
 * @type {{name: string, listener: Function}[]}
 */
hdpModal.prototype.alertBtn = [{
    id: "alert_ok", name: "确定", listener: function (model) {
        model.hide();
    }
}];



