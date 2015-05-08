function main() {
    jsGame.initImage([
        {id: "a", src: "img/a.png"},
        {id: "die", src: "img/die.png"},
        {id: "anniu_1", src: "img/anniu_1.png"},
        {id: "clue", src: "img/clue.png"},
        {id: "beijing", src: "img/di.png"},
        {id: "zuoqiang", src: "img/q_1.png"},
        {id: "youqiang", src: "img/q_2.png"},
        {id: "zuorole", src: "img/p_2.png"},
        {id: "yourole", src: "img/p_1.png"},
        {id: "zuoyouf", src: "img/f_1.png"},
        {id: "youzuof", src: "img/f_2.png"},
        {id: "zuozhang", src: "img/za_2.png"},
        {id: "youzhang", src: "img/za_1.png"},
        {id: "zuopao", src: "img/d_2.png"},
        {id: "youpao",
            src: "img/d_1.png"},
        {id: "zuoyouniao", src: "img/n_1.png"},
        {id: "youzuoniao", src: "img/n_2.png"},
        {id: "kill1", src: "img/b_1.png"},
        {id: "kill2", src: "img/b_2.png"},
        {id: "kill3", src: "img/b_3.png"},
        {id: "kill4", src: "img/b_4.png"},
        {id: "kill5", src: "img/b_5.png"},
        {id: "kill6", src: "img/b_6.png"},
        {id: "kill7", src: "img/b_7.png"},
        {id: "kill8", src: "img/b_8.png"},
        {id: "boom", src: "img/y_1.png"},
        {id: "di_2", src: "img/di_2.png"},
        {id: "di_1", src: "img/di_1.png"},
        {id: "a_1", src: "img/an_0.png"},
        {id: "k_1", src: "img/k_1.png"},
        {id: "k_2", src: "img/k_2.png"},
        {id: "dg", src: "img/dg.png"},
        {id: "cw_1", src: "img/cw_1.png"},
        {id: "cw", src: "img/cw.png"},
        {id: "numb", src: "img/zi_1.png"},
        {id: "nums", src: "img/zi_2.png"},
        {id: "l", src: "img/l.png"},
        {id: "ym", src: "img/ym.png"},
        {id: "jx", src: "img/jx.png"},
        {id: "an_5", src: "img/an_5.png"},
        {id: "an_1", src: "img/an_1.png"},
        {id: "an_2", src: "img/an_2.png"},
        {id: "an_3", src: "img/an_3.png"},
        {id: "an_4", src: "img/an_4.png"},
        {id: "zt", src: "img/zt.png"},
        {id: "clue1", src: "img/clue1.png"},
        {id: "btn_sound1", src: "img/an_6.png"},
        {id: "btn_sound2", src: "img/an_7.png"},
        {id: "fh_3", src: "img/fh_3.png"},
        {id: "pp", src: "img/pp.png"}
    ]).setRunFrequency(jsGame.canvas.screen.getTouch() ? 50 : 80);
    var a = {};
    a.initTouch = function () {
        jsGame.touch.init(false)
    };
    a.initCanvas = function () {
        a.height = window.innerHeight < 416 ? window.innerHeight + 60 : window.innerHeight;
        a.width = window.innerWidth;
        window.scrollTo(0, -5);
        a.offset = 0;
        a.scale = 0;
        if (!window.orientation || window.orientation == 0) {
            if (a.height > a.width * 1.5) {
                a.scale = a.width / 320;
                a.offset = (a.height - a.width * 1.5) / 2 << 0;
                a.height = a.width * 1.5 << 0
            } else {
                a.width =
                    a.height * (2 / 3) << 0;
                a.scale = a.height / 480
            }
            a.portrait = true;
            a.clue = false
        } else a.clue = true;
        jsGame.canvas.screen.setWidth(a.width);
        jsGame.canvas.screen.setHeight(a.height);
        a.canvas = document.getElementById("jsGameScreen");
        a.ctx = a.canvas.getContext("2d");
        a.buffer = document.createElement("canvas");
        a.buffer.width = 320;
        a.buffer.height = 480;
        a.ctxBuf = a.buffer.getContext("2d");
        a.initTouch()
    };
    a.initCanvas();
    jsGame.initImageCallBack(function (c, w) {
        if (c >= w)jsGame.gameFlow.run(); else try {
            var h = c / w;
            h = h > 1 ? 1 : h;
            a.ctx.fillStyle =
                "#FFF";
            a.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
            a.ctx.drawImage(jsGame.getImage("a"), 0, 0, 250, 81, (a.width - 250) / 2, (a.height - 81) / 2, 250, 81);
            a.ctx.drawImage(jsGame.getImage("a"), 2, 86, 246 * h, 10, (a.width - 246) / 2, (a.height - 81) / 2 + 51, 246 * h, 10)
        } catch (L) {
        }
    });
    jsGame.pageLoad(function (c) {
        function w() {
            a.addRole = 50;
            a.addZhang = 90;
            a.addBird = 130;
            t = p = a.time = 0;
            f = new U;
            e = new V;
            a.enemyData = [];
            a.boomData = [];
            a.protection = [];
            a.inKill = 0;
            a.isLose = false;
            h(q)
        }

        function h(b) {
            r = b;
            switch (r) {
                case B:
//                    document.getElementById('jsGameScreen').style.visibility = 'hidden';
                    I = new W;
                    a.createMenuPage();
                    if ((navigator.userAgent.toLowerCase().indexOf("iphone") != -1 || navigator.userAgent.toLowerCase().indexOf("ipod") != -1) && !window.navigator.standalone)a.createClueDialog();
                    I.isState = true
                    break;
                case C:
    //                    document.getElementById('jsGameScreen').style.visibility = '';
                    n = new P(C);
                    break;
                case q:
                    a.createGamePage();
                    a.delClueDialog();
                    break;
                case x:
                    n = new P(x);
                    a.createPausePage();
                    break;
                case o:
                    n = new P(Q);
                    a.createLosePage();
                    if (J < p) {
                        J = p;
                        c.localStorage.setItem("renzhe_bastScore", "" + J)
                    }
            }
        }

        function L(b, d) {
            this.x = b;
            this.y = d;
            this.index = -1;
            this.width = 130;
            this.height = 84;
            this.isOut = function () {
                if (this.index <=
                    4)return false;
                return true
            };
            this.cycle = function () {
                if (this.x > a.buffer.width - this.width)this.x = a.buffer.width - this.width;
                this.index++;
                this.y += f.speed
            };
            this.draw = function () {
                this.index != -1 && a.ctxBuf.drawImage(c.getImage("boom"), this.index * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height)
            }
        }

        function V() {
            this.inity = 300;
            this.x = f.width;
            this.y = a.buffer.height;
            this.flyIndex = this.actIndex = 0;
            this.width = 48;
            this.height = 43;
            this.isPosition = this.stay = 0;
            this.leftx = f.width;
            this.lefty = this.inity;
            this.flySpeed = 30;
            this.vy = 0;
            this.svy = 9;
            this.body = [0, 0, this.width, this.height];
            this._imgActRole = c.getImage("zuorole");
            this._imgFlyRole = c.getImage("zuoyouf");
            this.kill = function () {
                if (a.inKill == 3)return true;
                return false
            };
            this.killNameIndex = 0;
            this.imgKillWH = c.getImage(M[this.killNameIndex]);
            this.excursion = function () {
                var b = this.x, d = this.x + this.width;
                switch (this.stay) {
                    case u:
                        if (d < (a.buffer.width >> 1) - this.width)this.y += this.svy; else if (d > (a.buffer.width >> 1) + this.width)this.y -= this.svy;
                        break;
                    case K:
                        if (b < (a.buffer.width >>
                            1) - this.width)this.y -= this.svy; else if (b > (a.buffer.width >> 1) + this.width)this.y += this.svy
                }
            };
            this.killX = 0;
            this.killY = a.buffer.height;
            this.killWidth = a.buffer.width;
            this.killHeight = a.buffer.height;
            this.timeKillEnd = 10;
            this.iskillend = true;
            this.leftx = f.width;
            this.lefty = this.inity;
            this.rightx = a.buffer.width - f.width - g[this.flyIndex][2];
            this.righty = this.inity;
            this.cycle = function () {
                if (this.kill()) {
                    if (this.iskillend) {
                        this.x = a.buffer.width - g[0][2] >> 1;
                        this.y = 0;
                        this.vx = ((this.stay == u ? f.width : a.buffer.width - f.width -
                            g[0][2]) - (a.buffer.width - g[0][2] >> 1)) / this.timeKillEnd;
                        this.vy = this.inity / this.timeKillEnd;
                        this.iskillend = false
                    }
                    if (this.killNameIndex <= M.length)this.killNameIndex++; else {
                        this.y += this.vy;
                        this.x += this.vx;
                        this.flyIndex++;
                        this.flyIndex %= g.length - 1;
                        if (this.y >= this.inity) {
                            this.killY = a.buffer.height;
                            a.inKill = 0;
                            if (this.stay == u) {
                                this._imgActRole = c.getImage("zuorole");
                                this.x = this.leftx = f.width;
                                this.y = this.lefty = this.inity;
                                this.isPosition = 0
                            } else {
                                this._imgActRole = c.getImage("yourole");
                                this.x = this.rightx = this.x =
                                    a.buffer.width - f.width - e.width;
                                this.y = this.righty = this.inity;
                                this.isPosition = 1
                            }
                            this.stay = F;
                            this.iskillend = true;
                            this.killNameIndex = 0
                        }
                    }
                } else switch (this.stay) {
                    case F:
                        this.actIndex++;
                        this.actIndex %= D.length - 1;
                        this.body = [0, 0, this.width, this.height];
                        if (this.isPosition == 0)this.x = f.width; else if (this.isPosition == 1)this.x = a.buffer.width - f.width - e.width;
                        break;
                    case u:
                        this.flyIndex++;
                        this.flyIndex %= g.length - 1;
                        this.body = [30, 0, g[this.flyIndex][2] - 60, this.height];
                        this.x -= this.flySpeed;
                        this.excursion();
                        if (this.x <=
                            f.width) {
                            this._imgFlyRole = c.getImage("zuoyouf");
                            this.x = this.leftx = f.width;
                            this.y = this.lefty = this.inity;
                            this.isPosition = 0;
                            this._imgActRole = c.getImage("zuorole");
                            this.stay = F
                        }
                        break;
                    case K:
                        this.flyIndex++;
                        this.flyIndex %= g.length - 1;
                        this.body = [30, 0, g[this.flyIndex][2] - 60, this.height];
                        this.x += this.flySpeed;
                        this.excursion();
                        if (this.x >= a.buffer.width - f.width - g[this.flyIndex][2]) {
                            this._imgFlyRole = c.getImage("youzuof");
                            this.x = this.rightx = this.x = a.buffer.width - f.width - e.width;
                            this.y = this.righty = this.inity;
                            this.isPosition =
                                1;
                            this._imgActRole = c.getImage("yourole");
                            this.stay = F
                        }
                }
            };
            this.draw = function () {
                if (this.kill())this.killNameIndex <= M.length - 1 ? a.ctxBuf.drawImage(c.getImage(M[this.killNameIndex]), a.buffer.width - this.imgKillWH.width >> 1, a.buffer.height - this.imgKillWH.height) : a.ctxBuf.drawImage(this._imgFlyRole, g[this.flyIndex][0], g[this.flyIndex][1], g[this.flyIndex][2], g[this.flyIndex][3], this.x, this.y, g[this.flyIndex][2], g[this.flyIndex][3]); else if (r == q)if (this.stay == F) {
                    a.ctxBuf.drawImage(this._imgActRole, D[this.actIndex][0],
                        D[this.actIndex][1], D[this.actIndex][2], D[this.actIndex][3], this.x, this.y, D[this.actIndex][2], D[this.actIndex][3]);
                    this.protection && a.ctxBuf.drawImage(c.getImage("pp"), this.x - 2, this.y - 7)
                } else {
                    a.ctxBuf.drawImage(this._imgFlyRole, g[this.flyIndex][0], g[this.flyIndex][1], g[this.flyIndex][2], g[this.flyIndex][3], this.x, this.y, g[this.flyIndex][2], g[this.flyIndex][3]);
                    if (this.protection)this.stay == u ? a.ctxBuf.drawImage(c.getImage("pp"), this.x + 32, this.y - 2) : a.ctxBuf.drawImage(c.getImage("pp"), this.x + 42, this.y -
                        2)
                } else if (r == o)this.isPosition == 0 || this.stay == u ? a.ctxBuf.drawImage(c.getImage("die"), 0, 0, 48, 38, this.x, this.y, 48, 38) : a.ctxBuf.drawImage(c.getImage("die"), 48, 0, 48, 38, this.x, this.y, 48, 38)
            }
        }

        function R(b, d) {
            this.type = b;
            this.isPosition = d;
            this.qiangType = this.imgQiang = this.isPosition == 0 ? c.getImage("zuozhang") : c.getImage("youzhang");
            this.direnIndex = 0;
            this.renType = this.imgDiren = this.isPosition == 0 ? c.getImage("zuopao") : c.getImage("youpao");
            this.niaoIndex = 0;
            this.niaoType = this.imgNiao = this.isPosition == 0 ? c.getImage("zuoyouniao") :
                c.getImage("youzuoniao");
            switch (this.type) {
                case G:
                    this.width = v[this.direnIndex][2];
                    this.height = v[this.direnIndex][3];
                    this.bodyRect = [0, 0, this.width, this.height];
                    break;
                case E:
                    this.height = this.width = 50;
                    this.bodyRect = [0, y[0][2] - this.width >> 1, this.width, this.height];
                    break;
                case H:
                    this.width = this.qiangType.width;
                    this.height = this.qiangType.height;
                    this.bodyRect = [0, 0, this.width, this.height]
            }
            this.birdIny = this.height;
            if (this.isPosition == 0)switch (this.type) {
                case G:
                    this.x = f.width;
                    this.y = -this.height;
                    break;
                case E:
                    this.x =
                        this.birdInx = -this.width;
                    this.y = this.birdIny;
                    break;
                case H:
                    this.x = 0;
                    this.y = -this.height
            } else if (this.isPosition == 1)switch (this.type) {
                case G:
                    this.x = a.buffer.width - f.width - this.width;
                    this.y = -this.height;
                    break;
                case E:
                    this.x = this.birdInx = a.buffer.width;
                    this.y = this.birdIny;
                    break;
                case H:
                    this.x = a.buffer.width - this.width;
                    this.y = -this.height
            }
            this.a = d == 1 ? e.leftx : e.rightx;
            this.b = d == 1 ? e.lefty : e.righty;
            this.vx = (this.a - this.birdInx) / 10;
            this.vy = (this.b - this.birdIny) / 10;
            this.enemySpeed = 35;
            this.isAttack = function (s, k, i, z) {
                if (this.y + this.bodyRect[1] >= k + z || k >= this.y + this.bodyRect[1] + this.bodyRect[3] || this.x + this.bodyRect[0] >= s + i || s >= this.x + this.bodyRect[0] + this.bodyRect[2])return false;
                return true
            };
            this.cycle = function () {
                switch (this.type) {
                    case G:
                        this.direnIndex++;
                        this.direnIndex %= v.length;
                        this.y += this.enemySpeed;
                        break;
                    case E:
                        this.niaoIndex++;
                        this.niaoIndex %= y.length;
                        this.x += this.vx;
                        this.y += this.vy;
                        break;
                    case H:
                        this.y += f.speed
                }
            };
            this.draw = function () {
                switch (this.type) {
                    case G:
                        a.ctxBuf.drawImage(this.imgDiren, v[this.direnIndex][0],
                            v[this.direnIndex][1], v[this.direnIndex][2], v[this.direnIndex][3], this.x, this.y, v[this.direnIndex][2], v[this.direnIndex][3]);
                        break;
                    case E:
                        a.ctxBuf.drawImage(this.imgNiao, y[this.niaoIndex][0], y[this.niaoIndex][1], y[this.niaoIndex][2], y[this.niaoIndex][3], this.x, this.y, y[this.niaoIndex][2], y[this.niaoIndex][3]);
                        break;
                    case H:
                        a.ctxBuf.drawImage(this.imgQiang, 0, 0, this.qiangType.width, this.qiangType.height, this.x, this.y, this.qiangType.width, this.qiangType.height)
                }
            }
        }

        function U() {
            this.y = 0;
            this.width = 30;
            this.height =
                580;
            this.speed = 25;
            this.zuoqiang = c.getImage("zuoqiang");
            this.youqiang = c.getImage("youqiang");
            this.cycle = function () {
                this.y += this.speed;
                if (this.y >= this.zuoqiang.height)this.y = 0
            };
            this.draw = function () {
                a.ctxBuf.drawImage(c.getImage("zuoqiang"), 0, 0, this.zuoqiang.width, this.zuoqiang.height, 0, this.y, this.zuoqiang.width, this.zuoqiang.height);
                a.ctxBuf.drawImage(c.getImage("zuoqiang"), 0, 0, this.zuoqiang.width, this.zuoqiang.height, 0, this.y - this.zuoqiang.height, this.zuoqiang.width, this.zuoqiang.height);
                a.ctxBuf.drawImage(c.getImage("youqiang"),
                    0, 0, this.youqiang.width, this.youqiang.height, a.buffer.width - this.youqiang.width, this.y, this.youqiang.width, this.youqiang.height);
                a.ctxBuf.drawImage(c.getImage("youqiang"), 0, 0, this.youqiang.width, this.youqiang.height, a.buffer.width - this.youqiang.width, this.y - this.youqiang.height, this.youqiang.width, this.youqiang.height)
            }
        }

        function W() {
            this.imgMenubiao = c.getImage("di_2");
            this.biaox = a.buffer.width - this.imgMenubiao.width >> 1;
            this.biaoy = 30;
            this.imgMenuXia = c.getImage("di_1");
            this.xiax = a.buffer.width - this.imgMenuXia.width >>
                1;
            this.xiay = a.buffer.height - this.imgMenuXia.height;
            this.button = c.getImage("a_1");
            this.buttonx = a.buffer.width - this.button.width >> 1;
            this.buttony = this.biaoy + this.imgMenubiao.height + 30;
//            this.buttony2 = this.biaoy + this.imgMenubiao.height + 120;
            this.isState = false;
            this.stateIndex = 1;
            this.knife = c.getImage("dg");
            this.knifeX = a.buffer.width - this.knife.width >> 1;
            this.knifeY = this.biaoy;
            this.stap = 0;
            this.k_1_x = (a.buffer.width >> 1) - 120;
            this.k_1_y = this.buttony;
            this.t_1_x = (a.buffer.width >> 1) - 67;
            this.t_1_y = this.buttony2;
            this.vx1 = -5;
            this.vy1 = 30;
            this.k_2_x = a.buffer.width >> 1;
            this.k_2_y = this.k_1_y;
            this.vx2 = 5;
            this.vy2 = 40;
            this.zuoqiang = c.getImage("zuoqiang");
            this.youqiang = c.getImage("youqiang");
            this.zuoqiangX = -this.zuoqiang.width;
            this.youqiangX = a.buffer.width;
            this.cycle = function () {
                switch (this.stap) {
                    case 0:
                        if (this.isState) {
                            this.knifeY += 40;
                            if (this.knifeY > a.buffer.height - this.knife.height)this.stap = 1
                        }
                        break;
                    case 1:
                        this.k_1_x += this.vx1;
                        this.k_1_y += this.vy1;
                        this.k_2_x += this.vx2;
                        this.k_2_y += this.vy2;
                        this.stateIndex < 3 && a.time % 2 == 0 && this.stateIndex++;
                        if (this.k_1_y > a.buffer.height) {
                            this.biaoy -= 20;
                            this.xiay += 20;
                            if (this.biaoy < -this.imgMenubiao.height)this.stap = 2
                        }
                        break;
                    case 2:
                        this.zuoqiangX += 6;
                        this.youqiangX -= 6;
                        if (this.zuoqiangX >= 0) {
                            a.time = 0;
                            h(C)
                        }
                }
            };
            this.draw = function () {
                a.ctxBuf.drawImage(c.getImage("di_2"), this.biaox, this.biaoy);
                a.ctxBuf.drawImage(c.getImage("di_1"), this.xiax, this.xiay);
                switch (this.stap) {
                    case 0:
                        a.ctxBuf.drawImage(c.getImage("a_1"), this.buttonx, this.buttony);
                        a.ctxBuf.drawImage(c.getImage("fh_3"), this.t_1_x, this.t_1_y);
                        this.isState &&
                        a.ctxBuf.drawImage(c.getImage("dg"), this.knifeX, this.knifeY);
                        break;
                    case 1:
                        a.ctxBuf.drawImage(c.getImage("k_1"), this.stateIndex * 120, 0, 120, 120, this.k_1_x, this.k_1_y, 120, 120);
                        a.ctxBuf.drawImage(c.getImage("k_2"), this.stateIndex * 120, 0, 120, 120, this.k_2_x, this.k_2_y, 120, 120);
                        break;
                    case 2:
                        a.ctxBuf.drawImage(c.getImage("zuoqiang"), 0, 0, this.zuoqiang.width, this.zuoqiang.height, this.zuoqiangX, 0, this.zuoqiang.width, this.zuoqiang.height);
                        a.ctxBuf.drawImage(c.getImage("youqiang"), 0, 0, this.youqiang.width, this.youqiang.height,
                            this.youqiangX, 0, this.youqiang.width, this.youqiang.height)
                }
            }
        }

        function P(b) {
            this.imgJZ = c.getImage("cw_1");
            this.imgLose = c.getImage("cw");
            this.imgHelp = c.getImage("jx");
            this.imgPause = c.getImage("zt");
            this.winvy = this.winvx = this.winy = this.winx = 0;
            this.winw = this.imgLose.width;
            this.winh = 0;
            this.isLose = false;
            this.cw_1_x = a.buffer.width - this.imgJZ.width >> 1;
            this.cw_1_y1 = (a.buffer.height >> 1) - this.imgJZ.height;
            this.cw_1_y2 = a.buffer.height >> 1;
            this.helpvy = this.helpvx = this.helpy = this.helpx = 0;
            this.helpw = this.imgHelp.width;
            this.helph = 0;
            this.isHelp = false;
            this.pausevy = this.pausevx = this.pausey = this.pausex = 0;
            this.pausew = this.imgPause.width;
            this.pauseh = 0;
            this.type = b;
            this.speed = 12;
            this.cycle = function () {
                switch (r) {
                    case C:
                        this.helph += this.speed * 2;
                        this.helpy = (this.imgHelp.height - this.helph) / 2;
                        if (this.helph > this.imgHelp.height) {
                            this.helph = this.imgHelp.height;
                            this.speed = this.helpy = 0;
                            this.isHelp = true
                        }
                        this.cw_1_y1 -= this.speed;
                        this.cw_1_y2 += this.speed;
                        break;
                    case x:
                        this.pauseh += this.speed * 2;
                        this.pausey = (this.imgPause.height - this.pauseh) /
                            2;
                        if (this.pauseh > this.imgPause.height) {
                            this.pauseh = this.imgPause.height;
                            this.speed = this.pausey = 0;
                            this.ispause = true
                        }
                        this.cw_1_y1 -= this.speed;
                        this.cw_1_y2 += this.speed;
                        break;
                    case o:
                        this.winh += this.speed * 2;
                        this.winy = (this.imgLose.height - this.winh) / 2;
                        if (this.winh > this.imgLose.height) {
                            this.winh = this.imgLose.height;
                            this.speed = this.winy = 0;
                            this.isLose = true
                        }
                        this.cw_1_y1 -= this.speed;
                        this.cw_1_y2 += this.speed
                }
            };
            this.draw = function () {
                switch (r) {
                    case C:
                        a.ctxBuf.drawImage(c.getImage("jx"), this.helpx, this.helpy, this.helpw,
                            this.helph, a.buffer.width - this.imgHelp.width >> 1, a.buffer.height - this.helph >> 1, this.helpw, this.helph);
                        a.ctxBuf.drawImage(c.getImage("cw_1"), this.cw_1_x, this.cw_1_y1);
                        a.ctxBuf.drawImage(c.getImage("cw_1"), this.cw_1_x, this.cw_1_y2);
                        break;
                    case x:
                        a.ctxBuf.drawImage(c.getImage("zt"), this.pausex, this.pausey, this.pausew, this.pauseh, a.buffer.width - this.imgPause.width >> 1, a.buffer.height - this.pauseh >> 1, this.pausew, this.pauseh);
                        a.ctxBuf.drawImage(c.getImage("cw_1"), this.cw_1_x, this.cw_1_y1);
                        a.ctxBuf.drawImage(c.getImage("cw_1"),
                            this.cw_1_x, this.cw_1_y2);
                        break;
                    case o:
                        a.ctxBuf.drawImage(c.getImage("cw"), this.winx, this.winy, this.winw, this.winh, a.buffer.width - this.imgLose.width >> 1, a.buffer.height - this.winh >> 1, this.winw, this.winh);
                        a.ctxBuf.drawImage(c.getImage("cw_1"), this.cw_1_x, this.cw_1_y1);
                        a.ctxBuf.drawImage(c.getImage("cw_1"), this.cw_1_x, this.cw_1_y2);
                        N("numb", 225, 208, p, true);
                        N("nums", 135, 254, J, false)
                }
            }
        }

        var B = 100, C = 101, x = 102, q = 1E3, Q = 1001, o = 1002, r = 0, p, J = 0, t, S = 0;
        a.scaleTmp = 0;
        a.initMusic = function () {
            for (var b = 0; b < 1; b++) {
                a.music[b] =
                    document.createElement("audio");
                var d = "";
                switch (b) {
                    case 0:
                        d = "sound/bg.mp3"
                }
                a.music[b].setAttribute("src", d);
                a.music[b].setAttribute("preload", true);
                a.music[b].load()
            }
            a.music[0].setAttribute("autoplay", true);
            a.music[0].setAttribute("loop", true);
            a.music[0].addEventListener("canplaythrough", function () {
                a.sound ? a.music[0].play() : a.music[0].pause()
            }, true)
        };
        a.musicControl = function () {
            a.sound ? a.music[0].play() : a.music[0].pause()
        };
        c.touch.touchStart(function () {
            var b = c.touch.getStartPos();
            b.x /= a.scale;
            b.y = (b.y -
                a.offset) / a.scale;
            if (!a.clue) {
                var d = b.x;
                b = b.y;
                switch (r) {
                    case B:
//                        if (a.btns.btn_sound && d > 266 && d < 320 && b > 10 && b < 66)a.btns.btn_sound.pressed = 1; else if (a.btns.btn_clue1 && d > 80 && d < 240 && b > 410 && b < 480)a.delClueDialog(); else if (d > 70 && d < 248 && b > 210 && b < 290)I.isState = true; else if (d > 95 && d < 220 && b > 305 && b < 340)history.length > 1 ? history.back() : window.location.reload(true);
                        break;
                    case C:
                        if ((d > 0 || b > 0) && n.isHelp) {
                            a.ctxBuf.drawImage(c.getImage("an_5"), 250, 122);
                            w(t);
                            h(q)
                        }
                        break;
                    case q:
                        if (a.btns.btn_pause && d > 280 &&
                            d < 320 && b > 440 && b < 480)a.btns.btn_pause.pressed = 1; else if (e.y <= e.inity)if (e.isPosition == 0)e.stay = K; else if (e.isPosition == 1)e.stay = u;
                        break;
                    case x:
                        if (a.btns.btn_back && d > 54 && d < 150 && b > 230 && b < 256)a.btns.btn_back.pressed = 1; else if (a.btns.btn_resume && d > 174 && d < 270 && b > 230 && b < 256)a.btns.btn_resume.pressed = 1;
                        break;
                    case o:
                        if (n.isLose)if (a.btns.btn_back1 && d > 50 && d < 146 && b > 284 && b < 310)a.btns.btn_back1.pressed = 1; else if (a.btns.btn_restart && d > 174 && d < 270 && b > 284 && b < 310)a.btns.btn_restart.pressed = 1
                }
            }
        });

        c.touch.touchEnd(function () {
            var b =
                c.touch.getReleasePos();
            b.x /= a.scale;
            b.y = (b.y - a.offset) / a.scale;
            if (!a.clue) {
                var d = b.x;
                b = b.y;
                switch (r) {
                    case B:
                        if (a.btns.btn_sound.pressed && d > 266 && d < 320 && b > 10 && b < 66) {
                            a.sound = !a.sound;
                            a.btns.btn_sound.img = a.sound ? c.getImage("btn_sound1") : c.getImage("btn_sound2")
                        }
                        a.btns.btn_sound && (a.btns.btn_sound.pressed = 0);
                        a.musicControl();
                        break;
                    case q:
                        a.btns.btn_pause.pressed && d > a.buffer.width - 40 && d < a.buffer.width && b > a.buffer.height - 40 && b < a.buffer.height && h(x);
                        a.btns.btn_pause && (a.btns.btn_pause.pressed = 0);
                        break;
                    case o:
                        if (n.isLose)if (a.btns.btn_back1 && d > 50 && d < 146 && b > 284 && b < 310)h(B); else if (a.btns.btn_restart && d > 174 && d < 270 && b > 284 && b < 310) {
                            w(t);
                            h(q)
                        }
                        a.btns.btn_back1 && (a.btns.btn_back1.pressed = 0);
                        a.btns.btn_restart && (a.btns.btn_restart.pressed = 0);
                        break;
                    case x:
                        if (a.btns.btn_back.pressed && d > 54 && d < 150 && b > 230 && b < 256)h(B); else a.btns.btn_resume.pressed && d > 174 && d < 270 && b > 230 && b < 256 && h(q);
                        a.btns.btn_back && (a.btns.btn_back.pressed = 0);
                        a.btns.btn_resume && (a.btns.btn_resume.pressed = 0)
                }
            }
        });
        a.drawBtns = function (b) {
            a.ctxBuf.drawImage(b.img,
                    b.pressed * b.w, 0, b.w, b.h, b.x, b.y, b.w, b.h)
        };
        a.drawBtn = function (b) {
            b.pressed != 0 && a.ctxBuf.drawImage(b.img, b.x, b.y)
        };
        a.createClueDialog = function () {
            if (!a.btns.btn_clue1)a.btns.btn_clue1 = {img: c.getImage("clue1"), x: 160, y: 446, w: 156, h: 63}
        };
        a.delClueDialog = function () {
            if (a.btns.btn_clue1)a.btns.btn_clue1 = null
        };
        a.showClueDialog = function () {
            a.btns.btn_clue1 && a.ctxBuf.drawImage(a.btns.btn_clue1.img, 82, 415)
        };
        a.createMenuPage = function () {
            if (!a.btns.btn_sound) {
                a.btns.btn_sound = {img: c.getImage("btn_sound1"), x: 276, y: 16,
                    w: 40, h: 40, pressed: 0};
                a.btns.btn_sound.img = a.sound ? c.getImage("btn_sound1") : c.getImage("btn_sound2")
            }
        };
        a.delMenuPage = function () {
            if (a.btns.btn_sound)a.btns.btn_sound = null
        };
        a.showMenuPage = function () {
            a.btns.btn_sound && !I.isState && a.drawBtns(a.btns.btn_sound)
        };
        a.createGamePage = function () {
            if (!a.btns.btn_pause)a.btns.btn_pause = {img: c.getImage("an_1"), x: a.buffer.width - 40, y: a.buffer.height - 40, w: 40, h: 40, pressed: 0}
        };
        a.delGamePage = function () {
            if (a.btns.btn_pause)a.btns.btn_pause = null
        };
        a.showGamePage = function () {
            a.btns.btn_pause &&
            a.drawBtns(a.btns.btn_pause)
        };
        a.createPausePage = function () {
            if (!a.btns.btn_back) {
                a.btns.btn_back = {img: c.getImage("an_3"), x: 52, y: 227, w: 96, h: 26, pressed: 0};
                a.btns.btn_resume = {img: c.getImage("an_4"), x: 172, y: 227, w: 96, h: 26, pressed: 0}
            }
        };
        a.delPausePage = function () {
            if (a.btns.btn_back) {
                a.btns.btn_back = null;
                a.btns.btn_resume = null
            }
        };
        a.showPausePage = function () {
            if (a.btns.btn_back) {
                a.drawBtn(a.btns.btn_back);
                a.drawBtn(a.btns.btn_resume)
            }
        };
        a.createLosePage = function () {
            gameOverHandlerFunction();
            if (!a.btns.btn_back1) {
                a.btns.btn_back1 = {img: c.getImage("an_3"),
                    x: 50, y: 282, w: 96, h: 26, pressed: 0};
                a.btns.btn_restart = {img: c.getImage("an_2"), x: 172, y: 282, w: 96, h: 26, pressed: 0}
            }
        };
        a.delLosePage = function () {
            if (a.btns.btn_back1) {
                a.btns.btn_back1 = null;
                a.btns.btn_restart = null
            }
        };
        a.showLosePage = function () {
            if (a.btns.btn_back1) {
                a.drawBtn(a.btns.btn_back1);
                a.drawBtn(a.btns.btn_restart)
            }
        };
        var e, f, I, n, F = 0, u = 1, K = 2, D = [
            [0, 0, 48, 43],
            [48, 0, 48, 43],
            [96, 0, 48, 43],
            [144, 0, 48, 43]
        ], g = [
            [0, 0, 126, 50],
            [126, 0, 126, 50],
            [252, 0, 126, 50],
            [378, 0, 126, 50]
        ], M = ["kill1", "kill2", "kill2", "kill3", "kill4", "kill5",
            "kill3", "kill4", "kill5", "kill3", "kill4", "kill5", "kill3", "kill4", "kill5", "kill6", "kill7", "kill8"], G = 0, E = 1, H = 2, v = [
            [0, 0, 48, 57],
            [48, 0, 48, 57],
            [96, 0, 48, 57],
            [144, 0, 48, 57]
        ], y = [
            [0, 0, 89, 104],
            [89, 0, 89, 104],
            [178, 0, 89, 104],
            [267, 0, 89, 104]
        ], A = c.getImage("beijing"), T = function () {
            a.ctxBuf.drawImage(c.getImage("beijing"), 0, 0, A.width, A.height, 0, 0, A.width, A.height);
            f.draw();
            e.draw();
            for (var b = a.enemyData.length - 1; b >= 0; b--)a.enemyData[b].draw();
            for (b = a.boomData.length - 1; b >= 0; b--)a.boomData[b].draw();
            for (b = a.protection.length -
                1; b >= 0; b--)a.ctxBuf.drawImage(c.getImage("pp"), a.protection[b].x, a.protection[b].y);
            a.ctxBuf.drawImage(c.getImage("l"), 0, a.buffer.height - 40);
            a.showGamePage();
            N("numb", 92, a.buffer.height - 33, p, true);
            for (b = 0; b < a.inKill; b++)a.ctxBuf.drawImage(c.getImage("ym"), b * 40, a.buffer.height - 40 - 36)
        }, N = function (b, d, s, k, i, z) {
            var m = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], j = c.getImage(b), l = j.width / 10;
            j = j.height;
            var O = 0;
            if (k == 0)a.ctxBuf.drawImage(b, 0, 0, l, j, d, s, l, j); else {
                for (; k != 0;) {
                    m[O] = k % 10;
                    k = parseInt(k / 10);
                    O++
                }
                if (i) {
                    k = O - 1;
                    for (i = 0; i <=
                        k; i++) {
                        a.ctxBuf.drawImage(b, m[i] * l, 0, l, j, d, s, l, j);
                        d -= (l + 2) * z
                    }
                } else for (i = O - 1; i >= 0; i--) {
                    a.ctxBuf.drawImage(b, m[i] * l, 0, l, j, d, s, l, j);
                    d += (l + 2) * z
                }
            }
        };

        c.touch.resize(function () {
            Math.abs(a.scaleTmp - a.scale) > 0.01 && a.initCanvas();
            if (window.orientation == 0) {
                a.initCanvas();
                c.canvas.screen.setHeight(1200);
                a.clue = false
            } else {
                c.canvas.screen.setHeight(window.innerHeight);
                a.clue = true;
                a.showClue()
            }
            window.scrollTo(0, -5)
        });
        a.showClue = function () {
            window.scrollTo(0, -5);
            a.ctx.fillStyle = "white";
            a.ctx.fillRect(0, 0, window.innerWidth,
                window.innerHeight);
            a.ctx.drawImage(c.getImage("clue"), (window.innerWidth - 122) / 2, (window.innerHeight - 145) / 2)
        };
        (function () {
            a.clue = false;
            a.initCanvas();
            a.btns = {};
            a.music = [];
            a.sound = true;
            a.initMusic();
            if (typeof c.localStorage.getItem("renzhe_bastScore") == "string") {
                var b = c.localStorage.getItem("renzhe_bastScore");
                J = parseInt(b)
            }
            w(t);
            h(B)
        })();
        c.run(function () {
            window.scrollTo(0, -5);
            if (a.clue)a.showClue(); else {
                switch (r) {
                    case q:
                        if (c.keyPressed("left"))h(Q); else if (c.keyPressed("right"))h(o); else c.keyPressed("a") &&
                        h(1003);
                        break;
                    case Q:
                        if (c.keyPressed("a")) {
                            t++;
                            w(t)
                        }
                        break;
                    case o:
                        if (c.keyPressed("a"))if (S == 0)w(t); else {
                            t = 0;
                            c.updateScore({score: p});
                            c.gameFlow.over()
                        } else if (c.keyPressed("left") || c.keyPressed("right"))S = S == 0 ? 1 : 0;
                        break;
                    case 1003:
                        if (c.keyPressed("a")) {
                            t = 0;
                            c.updateScore({score: p});
                            c.gameFlow.over()
                        }
                }
                switch (r) {
                    case B:
                        a.time++;
                        I.cycle();
                        a.ctxBuf.drawImage(c.getImage("beijing"), 0, 0);
                        I.draw();
                        a.showMenuPage();
                        a.showClueDialog();
                        a.ctx.drawImage(a.buffer, 0, a.offset, a.width, a.height);
                        break;
                    case C:
                        a.ctxBuf.drawImage(c.getImage("beijing"),
                            0, 0, A.width, A.height, 0, 0, A.width, A.height);
                        f.draw();
                        n.cycle();
                        n.draw();
                        a.ctx.drawImage(a.buffer, 0, a.offset, a.width, a.height);
                        break;
                    case q:
                        if (e.y > e.inity) {
                            e.y -= 10;
                            e.cycle()
                        } else {
                            p++;
                            a.time++;
                            f.cycle();
                            e.cycle();
                            if (a.time % a.addRole == 0) {
                                var b = c.commandFuns.getRandom(0, 0), d = c.commandFuns.getRandom(0, 1);
                                b = new R(b, d);
                                a.enemyData.push(b)
                            } else if (a.time % a.addZhang == 0) {
                                d = c.commandFuns.getRandom(0, 1);
                                b = new R(1, d);
                                a.enemyData.push(b)
                            } else if (a.time % a.addBird == 0) {
                                d = c.commandFuns.getRandom(0, 1);
                                b = new R(2, d);
                                a.enemyData.push(b)
                            }
                            for (b =
                                     a.enemyData.length - 1; b >= 0; b--) {
                                a.enemyData[b].cycle();
                                if (a.enemyData[b].y > a.buffer.height + a.enemyData[b].height)a.enemyData.splice(b, 1); else if (e.kill()) {
                                    if (a.enemyData[b].y > a.buffer.height - e.imgKillWH.height) {
                                        d = new L(a.enemyData[b].x, a.enemyData[b].y);
                                        a.boomData.push(d);
                                        a.enemyData.splice(b, 1)
                                    }
                                } else if (c.commandFuns.collisionCheck(a.enemyData[b].x + a.enemyData[b].bodyRect[0], a.enemyData[b].y + a.enemyData[b].bodyRect[1], a.enemyData[b].bodyRect[2], a.enemyData[b].bodyRect[3], e.x + e.body[0], e.y + e.body[1],
                                    e.body[2], e.body[3]))if (e.protection) {
                                    d = new L(a.enemyData[b].x, a.enemyData[b].y);
                                    a.boomData.push(d);
                                    e.protection = false;
                                    if (a.enemyData[b].type == E)if (e.stay == u || e.stay == K) {
                                        a.inKill++;
                                        e.protection = true
                                    }
                                    a.enemyData.splice(b, 1)
                                } else switch (a.enemyData[b].type) {
                                    case G:
                                        h(o);
                                        break;
                                    case E:
                                        switch (e.stay) {
                                            case F:
                                                h(o);
                                                break;
                                            case u:
                                            case K:
                                                a.inKill++;
                                                d = new L(a.enemyData[b].x, a.enemyData[b].y);
                                                a.boomData.push(d);
                                                a.enemyData.splice(b, 1)
                                        }
                                        break;
                                    case H:
                                        h(o)
                                }
                            }
                            if (p == 700) {
                                a.addRole = 40;
                                a.addZhang = 70;
                                a.addBird = 100
                            }
                            if (p ==
                                1500) {
                                a.addRole = 30;
                                a.addZhang = 50;
                                a.addBird = 80
                            }
                            for (b = a.boomData.length - 1; b >= 0; b--) {
                                a.boomData[b].cycle();
                                a.boomData[b].isOut() && a.boomData.splice(b, 1)
                            }
                            if (a.time % 222 == 0) {
                                b = c.commandFuns.getRandom(100, 170);
                                a.protection.push({x: b, y: -80})
                            }
                            for (b = a.protection.length - 1; b >= 0; b--) {
                                a.protection[b].y += 10;
                                if (a.protection[b].y > a.buffer.height)a.protection.splice(b, 1); else if (c.commandFuns.collisionCheck(a.protection[b].x + 20, a.protection[b].y + 20, 40, 40, e.x, e.y, e.width, e.height)) {
                                    e.protection = true;
                                    a.protection.splice(b,
                                        1)
                                }
                            }
                        }
                        T();
                        a.ctx.drawImage(a.buffer, 0, a.offset, a.width, a.height);
                        break;
                    case x:
                        T();
                        n.cycle();
                        n.draw();
                        a.showPausePage();
                        a.ctx.drawImage(a.buffer, 0, a.offset, a.width, a.height);
                        break;
                    case o:
                        e.y += 20;
                        T();
                        if (e.y > a.buffer.height) {
                            n.cycle();
                            n.draw()
                        }
                        a.showLosePage();
                        a.ctx.drawImage(a.buffer, 0, a.offset, a.width, a.height)
                }
            }
        });
        N = function (b, d, s, k, i) {
            var z = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], m = c.getImage(b), j = m.width / 10;
            m = m.height;
            var l = 0;
            if (k == 0)a.ctxBuf.drawImage(c.getImage(b), 0, 0, j, m, d, s, j, m); else {
                for (; k != 0;) {
                    z[l] = k % 10;
                    k = parseInt(k /
                        10);
                    l++
                }
                if (i) {
                    k = l - 1;
                    for (i = 0; i <= k; i++) {
                        a.ctxBuf.drawImage(c.getImage(b), z[i] * j, 0, j, m, d, s, j, m);
                        d -= j
                    }
                } else for (i = l - 1; i >= 0; i--) {
                    a.ctxBuf.drawImage(c.getImage(b), z[i] * j, 0, j, m, d, s, j, m);
                    d += j
                }
            }
        }
    })
};
