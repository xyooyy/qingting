/**
 * @author Suker
 */

var fail = true;

function main() {
	var DW = {};
	DW.initCanvas = function() {
		//window.scrollTo(0, 1);
		 DW.width = (window.innerWidth) << 0;
			DW.height = (window.innerHeight) << 0;
			if (window.innerHeight < 416) {
					DW.height = window.innerHeight + 60;
				} else {
					DW.height = window.innerHeight;
				}
				 if (DW.height > DW.width) {
				 	  if (DW.height > DW.width * 1.5) {
						 	 DW.scale = DW.width / 320;
			                // DW.offset = ((pp.height - pp.width * 1.5) / 2) << 0;
			                 DW.height = (DW.width * 1.5) << 0;
			             }else {
			           			 // 如果不够长就按高度做自适应
								DW.width = (DW.height * 320 / 480) << 0;
					                // console.log(PT.width, PT.height);
					            DW.scale = DW.height / 480;
					            // }
					            // 横屏提示标志
					            DW.portrait = false;
				        	}
		        // 横屏
		       } else {
		       	console.log(DW.height, DW.width)
		            // 横屏提示标志
		            // DW.portrait = true;
		            if (DW.height > 800 || DW.width > 800) {
		            	// alert(3);
						DW.width = (DW.height * 2 / 3) << 0;
						DW.scale = DW.height / 480;
						DW.portrait = false;
						} else {
						// 横屏提示标志
						DW.portrait = true;
						} 

		        }
	        
	    jsGame.canvas.screen.setWidth(DW.width);
		jsGame.canvas.screen.setHeight(DW.height);	

        DW.canvas = document.getElementById('jsGameScreen');
		DW.ctx = DW.canvas.getContext('2d');
		// alert(window.innerWidth + ',' + window.innerHeight)
	};

	DW.initCanvas();
	jsGame.initImage([
		{id: 'a', src: 'img/a_2.png'},
		{id: 's', src: 'img/s.png'},
		{ id: 'djs', src: 'img/djs.png'},
		{ id: 'bear', src: 'img/x.png'},
		{ id: 'bird',src: 'img/h.png'},
		{ id: 'fish', src: 'img/y.png'},
		{ id: 'frog', src: 'img/qw.png'},
		{ id: 'question1', src: 'img/ts.png'},
		{ id: 'question2', src: 'img/ts2.png'},
		{ id: 'score', src: 'img/fs2.png'},
		{ id: 'bg', src: 'img/bj.png'},
		{ id: 'fenshu', src: 'img/fenshu.png'},
		
		{ id: 'y2', src: 'img/y2.png' },
		{ id: 'y3', src: 'img/y3.png' },
		{ id: 'n2', src: 'img/n2.png' },
		{ id: 'n3', src: 'img/n3.png' },
		{ id: 'x2', src: 'img/x2.png' },
		{ id: 'x3', src: 'img/x3.png' },
		{ id: 'qw2', src: 'img/qw2.png' },
		{ id: 'qw3', src: 'img/qw3.png' },
		
		{ id: 'lvs', src: 'img/lvs.png' },
		{ id: 'lvs2', src: 'img/lvs2.png' },
		{ id: 'ls', src: 'img/ls.png' },
		{ id: 'ls2', src: 'img/ls2.png' },
		{ id: 'huangse', src: 'img/huangs.png' },
		{ id: 'huangse2', src: 'img/huangs2.png' },
		{ id: 'hs', src: 'img/hs.png' },
		{ id: 'hs2', src: 'img/hs2.png' },
		
		{ id: 'ts3', src: 'img/ts3.png' },
		{ id: 'ts4', src: 'img/ts4.png' },
		{ id: 'ts5', src: 'img/ts5.png' },
		{ id: 'ts6', src: 'img/ts6.png' },
		{ id: 'ts7', src: 'img/ts7.png' },
		
		{ id: 'logo', src: 'img/logobj.png' },
		{ id: 'logo1', src: 'img/logo3.png' },
		
		{ id: 'fhsq',src: 'img/sq2.png'},
		{ id: 'fhsq2_2',src: 'img/sq.png'},
		{ id: 'jxyx',src: 'img/jxyx.png'},
		{ id: 'jxyx2',src: 'img/jxyx2.png'},
		{ id: 'jsyx',src: 'img/jsyx.png'},
		{ id: 'jsyx2',src: 'img/jsyx2.png'},
		// { id: 'gdyx',src: 'img/gdyx.png'},
		// { id: 'gdyx2',src: 'img/gdyx2.png'},
		{ id: 'ksyx',src: 'img/ksyx.png'},
		{ id: 'zt1',src: 'img/zt.png'},
		{ id: 'zt',src: 'img/zt2.png'},
		{ id: 'ksyx2',src: 'img/ksyx2.png'},
		{ id: 'help',src: 'img/bzsm2.png'},
		// { id: 'phb',src: 'img/phb.png'},
		// { id: 'phb2',src: 'img/phb2.png'},
		{ id: 'tcyx',src: 'img/tcyx.png'},
		{ id: 'tcyx2',src: 'img/tcyx2.png'},
		{ id: 'yx1',src: 'img/yy.png'},
		{ id: 'yx3',src: 'img/yy.png'},
		{ id: 'yx2',src: 'img/yy3.png'},
		{ id: 'yx4',src: 'img/yy3.png'},
		{ id: 'yx1_1',src: 'img/yy2.png'},
		{ id: 'yx2_1',src: 'img/yy3.png'},
		{ id: 'yx3_1',src: 'img/yy2.png'},
		{ id: 'yx4_1',src: 'img/yy4.png'},
		{ id: 'zq',src: 'img/zq.png'},
		{ id: 'gx',src: 'img/gx.png'},
		{ id: 'ajxg',src: 'img/ajxg.png'},
		{ id: 'yxjsjxyx',src: 'img/jxyxjsyx.png'},
		{ id: 'cxks',src: 'img/cxks.png'},
		{ id: 'cxks2',src: 'img/cxks2.png'},
		{ id: 'jt',src: 'img/jt.png'},
		{ id: 'cxksjsyx',src: 'img/jxyxjsyx.png'}
		]);

	jsGame.initImageCallBack(function(loaded, count) {
		if (loaded >= count) {
            jsGame.gameFlow.run();
        } else {
            try {
				var rate = loaded / count;
				rate = rate > 1 ? 1 : rate;
				DW.ctx.fillStyle = '#FFFFFF';
				DW.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
				// 背景
				// DW.ctx.drawImage(jsGame.getImage('a'), 0, 0, 250, 81, (DW.width - 250) / 2, (DW.height - 81) / 2, 250, 81);
				DW.ctx.drawImage(jsGame.getImage('a'), 0, 0, 250, 81, (DW.width - 250) / 2, (DW.height - 81) / 2, 250, 81);
				// 进度条
				// DW.ctx.drawImage(jsGame.getImage('a'), 6, 124, 220 * rate, 10, (DW.width - 220) / 2, (DW.height - 120) / 2 + 86, 220 * rate, 10);
				DW.ctx.drawImage(jsGame.getImage('a'), 2, 86, 246 * rate, 10, (DW.width - 246) / 2, (DW.height - 81) / 2 + 51, 246 * rate, 10);
			
				// console.log('1111111' + DW.width, DW.height, (DW.width - 240) / 2, (DW.height - 120) / 2);
			} catch (err) {
				//console.log(err);
			}
		}
	});
	//.initAudio([
	//	{id: 'bgsound', src: 'music/bgsound.ogg'}
	//])
    jsGame.pageLoad(function($) {
    	DW.initCanvas();
        //触屏部分 添加的代码---------------------------------------------------------------------------------
        DW.showClue = function() {
			DW.ctx.fillStyle = 'white';
			DW.ctx.fillRect(0, 0,window.innerWidth, window.innerHeight);
			DW.ctx.drawImage($.getImage('s'), (DW.width - 122) / 2, (DW.height - 145) / 2);
		};
			DW.btns = {};
			// 声音
			DW.sound = true;
			// 暂停
			DW.paused = false;
			DW.id = 0;
//-----------------------------------------------------------------------------------------------------------
		var TEMY = (DW.height - 580 * DW.scale) / 2;
		var _a = 0;//画时间变量
		var _b = 250;
		var _c = 0;//画关数变量
		var	_d = 0;
		var _e = 0;//画GameOver
		var _m = 0;
		var _n = 0;
		var mission = 0;        //关数
		var Randomnumber = 0;   //随机数变量
		var RandomAnimal = 0;   //随机动物
		var scorenumber = 0;    //分数
		var Cycle = 0;          //每一关的循环
		var totalScore = 0;     //分数
		var state = 0;          //游戏状态
	 	var arrImg = [];        //图片数组
	 	var animal;
		var doRandom;
		var answer;             //答案
		var bianliang;
		var bangzhubianliang;
		var zantingbianliang;
		var tishibianliang;
		var tishibianliang1;
		var shengli = false;
		var zqYZB = -117;
		var chongxinbianliang;
		var jieshubianliang;
		var logo5bianliangX;
		var temp = 0;
		var _c = 0;
		var _d = 0;
		var LOCK;
		var kongjianY = (51 * DW.scale * 7.5 + TEMY) << 0;
		 window.onorientationchange = function() {
            // switch(window.orientation) {
                // // 竖
                // case 0:
                // case 180: DW.initCanvas(); break;
                // // 横
                // case -90:
                // case 90: DW.initCanvas();  break;
            // }
            setTimeout(function() {
            	DW.initCanvas();
            }, 1000);
            
        };
//-----------------------------------------------------------------------------------
		var initR = function(b) {
			_a = 0;//画时间变量
		    _b = b;

		};
		var init = function(){//初始化
			$.touch.init(true);
			initR(225);
			DW.btns = {};
			// 声音
			DW.sound = true;
			// 暂停
			DW.paused = false;
			DW.id = 0;
			_c = 0;//画关数变量
			_d = 0;
			_e = 0;//画GameOver
			_n = 0;
			_m = 0;
			temp = 0;
			mission = 0;//关数
		    scorenumber = 0;//分数
		 	RandomNumber = 0;//随机数变量
			RandomAnimal = 0;//随机动物
			totalScore = 0;//分数
			state = 0;//游戏状态
			arrImg = [];//图片数组
			animal = new Animalclass();
			answer = 0;
			Cycle = 0; //每一关的循环
			DW.state = 0;
			_c = 0;
		    _d = 0;

			bangzhubianliang = -580;
			logo5bianliangX = -200;

			zantingbianliang =  DW.height * 0.01;
			chongxinbianliang = 0;
		    jieshubianliang = 0;
			tishibianliang = -580;
			tishibianliang1 = DW.width + 53;
//			console.log(tishibianliang1);
			shengli = false;
			zqYZB = -117;
			kongjianY = (51 * DW.scale * 7.5 + TEMY) << 0;
			LOCK = false;	//UI锁
			DW.initMusic();
			// console.log(DW.music.paused);
		};

		DW.initMusic = function() {
				DW.music = document.createElement('audio');
				DW.music.setAttribute('src', 'sound/AnimalCamouflage.mp3');
				DW.music.setAttribute('preload', true);
				DW.music.load();
				DW.music.setAttribute('autoplay', true);
				DW.music.setAttribute('loop', true);
				DW.music.addEventListener("canplaythrough", function() {
					if (!DW.sound) {
						DW.music.play();
					} else {
						DW.music.pause();
					}
				}, true);
            
			};
//-------------------------------------------------------------------------------
		var Animalclass = (function(){
			return function(data){
				var props = $.objExtend({
					id: 0,
					sx: 0,
					sy: 0,
					width: 0,
					height: 0,
					x: 60,
					y: 100
				}, data || {});
				this.id = props.id;
				this.sx = props.sx;
				this.sy = props.sy;
				this.width = props.width;
				this.height = props.height;
				this.x = props.x;
				this.y = props.y;
				//渲染图片
				this.render = function (){
					$.canvas.drawImage(this.id, this.sx, this.sy, this.width, this.height, this.x * DW.scale, this.y * DW.scale * 0.8, this.width * DW.scale, this.height * DW.scale);
				};
			}
		})();
		
		var randomA;
		var randomB;
		var randomStyle;
		var animalStyle = [
			{ id: 'bear', width: 197, height: 207, maps: [ { sx: 0, sy: 0 }, { sx: 197, sy: 0 }, { sx: 394, sy: 0 }, { sx: 591, sy: 0 } ] },
			{ id: 'bird', width: 197, height: 207, maps: [ { sx: 0, sy: 0 }, { sx: 197, sy: 0 }, { sx: 394, sy: 0 }, { sx: 591, sy: 0 } ] },
			{ id: 'fish', width: 197, height: 207, maps: [ { sx: 0, sy: 0 }, { sx: 197, sy: 0 }, { sx: 394, sy: 0 }, { sx: 591, sy: 0 } ] },
			{ id: 'frog', width: 197, height: 207, maps: [ { sx: 0, sy: 0 }, { sx: 197, sy: 0 }, { sx: 394, sy: 0 }, { sx: 591, sy: 0 } ] }
		];

		var initAnimal = function() {
			randomA = $.commandFuns.getRandom(3);	//随机动物
			randomB = $.commandFuns.getRandom(3);	//随机颜色
			randomStyle = animalStyle[randomA];
			animal.id = randomStyle.id;
			animal.width = randomStyle.width;
			animal.height = randomStyle.height;
			animal.sx = randomStyle.maps[randomB].sx;
			animal.sy = randomStyle.maps[randomB].sy;
			RandomNumber = $.commandFuns.getRandom(1,2);					//随机变量
			// console.log(RandomNumber)
			RandomAnimer = $.commandFuns.getRandom(0,1,2,3);				//随机动物
			switch(RandomNumber){
				case 1:
					DW.btns.hs.name = 'hs';
					DW.btns.hs.img = $.getImage('hs');

					DW.btns.huangse.name = 'huangse';
					DW.btns.huangse.img = $.getImage('huangse');

					DW.btns.lvs.name = 'lvs';
					DW.btns.lvs.img = $.getImage('lvs');

					DW.btns.ls.name = 'ls';
					DW.btns.ls.img = $.getImage('ls');
					break;

				case 2:
					DW.btns.hs.name = 'x2';
					DW.btns.hs.img = $.getImage('x2');

					DW.btns.huangse.name = 'qw2';
					DW.btns.huangse.img = $.getImage('qw2');

					DW.btns.lvs.name = 'n2';
					DW.btns.lvs.img = $.getImage('n2');

					DW.btns.ls.name = 'y2';
					DW.btns.ls.img = $.getImage('y2');
					break;
			}
		};
		
		

		var renderBg = function() {
			DW.ctx.drawImage($.getImage('bg'), 0, TEMY, 320 * DW.scale, 580 * DW.scale);
			DW.ctx.drawImage($.getImage('score'), 15 * DW.scale, 300 * DW.scale + TEMY, 43 * DW.scale, 53 * DW.scale);
			if(RandomNumber == 1){
				DW.ctx.drawImage($.getImage('question1'), 60 * DW.scale, 50 * DW.scale, 204 * DW.scale, 42 * DW.scale );
			}
			else{
				DW.ctx.drawImage($.getImage('question2'), 60 * DW.scale, 50 * DW.scale, 204 * DW.scale, 42 * DW.scale );
			}
			animal.render();//渲染动物

			var strScore = $.commandFuns.getArray(totalScore);
			for (var i = strScore.length - 1; i >= 0; i--) {
				DW.ctx.drawImage($.getImage('fenshu'), parseInt(strScore[i]) * 16, 0, 16, 17, (70 - (strScore.length - 1 - i) * 8) * DW.scale, (330) * DW.scale + TEMY, 10 * DW.scale, 17 * DW.scale);
			}
		};

		var getMission = function(s) {
			if (s >= 0 && s < 15) {
				return 0;
			}
			else if (s >= 15 && s < 45) {
				return 1;
			}
			else if (s >= 45 && s < 90 ){
				return 2;
			}
			else if (s >= 90 && s < 150){
				return 3;
			}
			else if (s >= 150 && s < 225){
				return 4;
			}
			else if(s >= 225 ){
				return 4;
			}
		};

		var getT = function(m) {
			switch(m) {
				case 0:
					return 225;
				case 1:
					return 175;
				case 2:
					return 125;
				case 3:
					return 75;
				case 4:
					return 25
				default:
					return 25;
			}
		};

		var getS = function(m) {
			switch(m) {
				case 0:
					return 10;
				case 1:
					return 10;
				case 2:
				 	return 20;
				case 3:
					return 30;
				case 4:
					return 50;
				default:
					return 50;
			}
		};

		var passMission = function(s) {
			if (s == 15 || s == 45 || s ==90 || s == 150 || s == 225)
				return true;
			return false;
		};

		var passFun = function(r) {
			shengli = false;
			keyResult = checkResult(RandomNumber);
			if (keyResult == r) {
				mission = getMission(Cycle);
				// console.log(Cycle);
				initR(getT(mission));
				totalScore += getS(mission);
				Cycle++;
				if (passMission(Cycle)) {
					_b = getT(++mission);
					state = 0;
				}
				else{
					state = 3;
				}
			}
			else if (keyResult < 4) {
				state = 2;
			}
		};

		var tishi = function(m){
			if(tishibianliang < 0){
				tishibianliang += 116;
				// console.log(tishibianliang1);
			}
			// console.log(tishibianliang);
			// if(tishibianliang == DW.height){
//
				if(tishibianliang1 > 265 * DW.scale){
					tishibianliang1 -= DW.scale * 10;
				}
			// }
			// console.log(tishibianliang1);
			switch (m){
				case 0:
					// DW.btns.tishi.img = $.getImage('ts3');
					DW.ctx.drawImage($.getImage('ts3'), 0, TEMY + tishibianliang, 320 * DW.scale, 580 * DW.scale);
					break;
				case 1:
					// DW.btns.tishi.img = $.getImage('ts4');
					DW.ctx.drawImage($.getImage('ts4'), 0, TEMY + tishibianliang, 320 * DW.scale, 580 * DW.scale);
					break;
				case 2:
					// DW.btns.tishi.img = $.getImage('ts5');
					DW.ctx.drawImage($.getImage('ts5'), 0, TEMY + tishibianliang, 320 * DW.scale, 580 * DW.scale);
					break;
				case 3:
					// DW.btns.tishi.img = $.getImage('ts6');
					DW.ctx.drawImage($.getImage('ts6'), 0, TEMY + tishibianliang, 320 * DW.scale, 580 * DW.scale);
					break;
				case 4:
					// DW.btns.tishi.img = $.getImage('ts7');
					DW.ctx.drawImage($.getImage('ts7'), 0, TEMY + tishibianliang, 320 * DW.scale, 580 * DW.scale);
					break;
				default:
					break;
				}
		};
		init();
// 开启/关闭背景音乐
		DW.musicControl = function() {
			if (!DW.sound) {
				DW.music.play();
			} else {
				DW.music.pause();
			}
		};
// 画按钮，包含按下效果的切换------------------------------------------------------------------
		DW.drawBtns = function(btn, subImg) {
				// console.log(subImg, btn.x - btn.w / 2, btn.y - btn.h / 2, btn.w, btn.h);
			if (btn.selected) {
				DW.ctx.drawImage(subImg, btn.x - btn.w / 2, btn.y - btn.h / 2, btn.w, btn.h);
			} else {
				// console.log(btn.img, btn.x - btn.w / 2, btn.y - btn.h / 2, btn.w, btn.h);
				DW.ctx.drawImage(btn.img, btn.x - btn.w / 2, btn.y - btn.h / 2, btn.w, btn.h);
				// PT.ctx.drawImage(btn.img, 0, 0, btn.w, btn.h, (btn.x - btn.w / 2) << 0, (btn.y - btn.h / 2) << 0, btn.w, btn.h);
			}
		};

// 创建logo界面各对象------------------------------------------------------------------
		DW.createLogoPage = function() {
			// 避免重复创建对象
			if (DW.btns.fhsq || DW.btns.yx || DW.btns.ksyx || DW.btns.phb || DW.btns.gdyx || DW.btns.tcyx) {
				return;
			} else {
				// 返回按钮
				// DW.btns.fhsq = {id: DW.id++, name: 'fhsq', img: $.getImage('fhsq'), x: DW.width * 0.1, y: -53, w: (53 * DW.scale) << 0, h: (53 * DW.scale) << 0};
				// $.touch.create(DW.btns.fhsq, true, false);
				// 声音按钮1
				DW.btns.yx = {id: DW.id++, name: 'yx3', img: $.getImage('yx3'), img2: $.getImage('yx4'),x: DW.width * 0.68 + (71 * DW.scale) << 0, y: -53, w: (54 * DW.scale) << 0, h: (54 * DW.scale) << 0};
				$.touch.create(DW.btns.yx, true, false);

				// 开始按钮
				DW.btns.ksyx = {id: DW.id++, name: 'ksyx', img: $.getImage('ksyx'), x: DW.width * 0.6 + (400 * DW.scale) << 0, y: (DW.scale * 300) << 0, w: (114 * DW.scale) << 0, h: (41 * DW.scale) << 0};
				$.touch.create(DW.btns.ksyx, true, false);

				// 排行榜按钮
				// DW.btns.phb = {id: DW.id++, name: 'phb',  img: $.getImage('phb'), x: DW.width * 0.68 + (460 * DW.scale) << 0, y: (DW.scale * 359) << 0, w: (114 * DW.scale) << 0, h: (41 * DW.scale) << 0};
				// $.touch.create(DW.btns.phb, true, false);

				// 更多游戏按钮
				// DW.btns.gdyx = {id: DW.id++, name: 'gdyx',img: $.getImage('gdyx'), x: DW.width *0.68 + (340 * DW.scale) << 0, y: (DW.scale * 359) << 0, w: (114 * DW.scale) << 0, h: (41 * DW.scale) << 0};
				// $.touch.create(DW.btns.gdyx, true, false);

				// 退出游戏按钮
				DW.btns.tcyx = {id: DW.id++, name: 'tcyx', img: $.getImage('tcyx'), x: DW.width * 0.6 + (400 * DW.scale) << 0, y: (DW.scale * 359) << 0, w: (114 * DW.scale) << 0, h: (41 * DW.scale) << 0};
				$.touch.create(DW.btns.tcyx, true, false);
			}
		};
//LOGO界面------------------------------------------------------------------
			DW.showLogoPage = function() {
			// 先创建各对象。
				// DW.createLogoPage();
				// 背景
				DW.ctx.drawImage($.getImage('logo'), 0, 0, DW.width, DW.height);
				DW.ctx.drawImage($.getImage('logo1'), logo5bianliangX, DW.scale * 30, 218 * DW.scale, 218 * DW.scale);
				// console.log(logo5bianliangX);

				// 声音切换
				var tmp = DW.btns.yx;
				if (!DW.sound) {
					DW.btns.yx.img = $.getImage('yx3');
					DW.btns.yx.img2 = $.getImage('yx3_1');
				} else {
					DW.btns.yx.img = $.getImage('yx3_1')
					DW.btns.yx.img2 = $.getImage('yx4_1')
					// PT.ctx.drawImage($.getImage('yx3'), (tmp.x - tmp.w / 2) << 0, (tmp.y - tmp.h / 2) << 0, tmp.w, tmp.h);
				}
				// 开始按钮
				DW.drawBtns(DW.btns.ksyx, $.getImage('ksyx2'));//按钮对象，按下之后的效果
				// 排行榜按钮
				// DW.drawBtns(DW.btns.phb, $.getImage('phb2'));
				// 更多游戏按钮
				// DW.drawBtns(DW.btns.gdyx, $.getImage('gdyx2'));
				// 退出游戏按钮
				DW.drawBtns(DW.btns.tcyx, $.getImage('tcyx2'));
				//返回社区
				// DW.drawBtns(DW.btns.fhsq, $.getImage('fhsq2_2'));
				//音效开
				if(!DW.sound) {
					DW.drawBtns(DW.btns.yx, $.getImage('yx4'));
				}
				else{
					DW.drawBtns(DW.btns.yx, $.getImage('yx4_1'));
				}
				// console.log(DW.sound);
			};
// 删除logo界面的所有对象。离开本页面前需要将本页的所有对象释放，避免事件响应的冲突。
		DW.delLogoPage = function() {
			// $.touch.deleteImg(DW.btns.fhsq);
			// DW.btns.fhsq = null;
			$.touch.deleteImg(DW.btns.yx.id);
			DW.btns.yx = null;
			$.touch.deleteImg(DW.btns.ksyx.id);
			DW.btns.ksyx = null;
			// $.touch.deleteImg(DW.btns.phb.id);
			// DW.btns.phb = null;
			// $.touch.deleteImg(DW.btns.gdyx.id);
			// DW.btns.gdyx = null;
			$.touch.deleteImg(DW.btns.tcyx.id);
			DW.btns.tcyx = null;
		};

// 创建帮助页面各对象-----------------------------------------------------------------------
		DW.createHelpPage = function() {
			if (DW.btns.help) {
				return;
			} else {
				DW.btns.help = {id: DW.id++, name: 'help', img: $.getImage('logo'), x: (240 * DW.scale) << 0, y: (160 * DW.scale) << 0, w: (960 * DW.scale) << 0, h: (960 * DW.scale) << 0};
				$.touch.create(DW.btns.help, true, false);
			}
		}

		// 删除帮助页面各对象
		DW.delHelpPage = function() {
			$.touch.deleteImg(DW.btns.help.id);
			DW.btns.help = null;
		};

		// 帮助页面
		DW.showHelpPage = function() {
			DW.createHelpPage();

			DW.ctx.drawImage($.getImage('help'), 0, bangzhubianliang + TEMY, 320 * DW.scale, 580 * DW.scale);
			// console.log(bangzhubianliang);
		};

//创建提示------------------------------------------------------------
		DW.createtishiPage = function() {
			if (DW.btns.tishi) {
				return;
			} else {
				DW.btns.tishi = {id: DW.id++, name: 'qianwang', img: $.getImage('jt'), x: (270 * DW.scale) << 0, y: ((DW.height - 60 * DW.scale)) << 0, w: (100 * DW.scale) << 0, h: (100 * DW.scale) << 0};
				$.touch.create(DW.btns.tishi, true, false);
			}
		}

		// 删除帮助页面各对象
		DW.deltishiPage = function() {
			if(DW.btns.tishi){
				$.touch.deleteImg(DW.btns.tishi.id);
				DW.btns.tishi = null;
				
			}
		};

		// 提示页面
		DW.showtishiPage = function() {
			DW.ctx.drawImage($.getImage('jt'), tishibianliang1, (DW.height - 60 * DW.scale) << 0, 53 * DW.scale, 53 * DW.scale);
//			console.log( (DW.height - 50 * DW.scale) << 0);

			// console.log(bangzhubianliang);
		};
//创建暂停对话框对象-------------------------------------------------------------
		DW.createPauseDialog = function() {
			if (DW.btns.resume || DW.btns.end) {
				return;
			} else {
				// 继续按钮
				DW.btns.resume = {id: DW.id++, name: 'jxyx', img: $.getImage('jxyx'), x: DW.width * 0.36 + (43 * DW.scale) << 0, y: (DW.height * 0.46 - 50) << 0, w: (163 * DW.scale) << 0, h: (45 * DW.scale) << 0};
				$.touch.create(DW.btns.resume, true, false);
				// 结束按钮
				DW.btns.end = {id: DW.id++, name: 'jsyx', img: $.getImage('jsyx'), x: DW.width * 0.36 + (43 * DW.scale) << 0, y: (DW.height * 0.5 + 20.5 * DW.scale - 50) << 0, w: (163 * DW.scale) << 0, h: (45 * DW.scale) << 0};
				$.touch.create(DW.btns.end, true, false);


			}
		};

		// 把暂停对话框对象删除
		DW.delPauseDialog = function() {
			$.touch.deleteImg(DW.btns.resume.id);
			DW.btns.resume = null;
			$.touch.deleteImg(DW.btns.end.id);
			DW.btns.end = null;
		};

		// 画暂停界面的两个按钮。
		DW.showPauseDialog = function() {
			DW.createPauseDialog();
			// 背景
			//cnm.ctx.drawImage($.getImage('pause_bg'), (cnm.width - 204 * cnm.scale) / 2, (cnm.height - 207 * cnm.scale) / 2);
			DW.ctx.drawImage($.getImage('yxjsjxyx'), ((DW.width - 269 * DW.scale) / 2) << 0, ((DW.height - 242 * DW.scale - 100) / 2) << 0, (269 * DW.scale) << 0, (242 * DW.scale) << 0);
			// 继续按钮
			DW.drawBtns(DW.btns.resume, $.getImage('jxyx2'));
			// 结束按钮
			DW.drawBtns(DW.btns.end, $.getImage('jsyx2'));
		};

//创建死亡话框对象-------------------------------------------------------------
		DW.createDeadDialog = function() {
			if (DW.btns.ready || DW.btns.end1) {
				return;
			} else {
				// 重新开始按钮
				DW.btns.ready = {id: DW.id++, name: 'cxks', img: $.getImage('cxks'), x: DW.width * 0.36 + (43 * DW.scale) << 0, y: (DW.height * 0.18) << 0, w: (163 * DW.scale) << 0, h: (45 * DW.scale) << 0};
				$.touch.create(DW.btns.ready, true, false);
				// console.log(DW.btns.ready.y);
				// 结束按钮
				DW.btns.end1 = {id: DW.id++, name: 'jsyx1', img: $.getImage('jsyx'), x: DW.width * 0.36 + (43 * DW.scale) << 0, y: (DW.height * 0.28) << 0, w: (163 * DW.scale) << 0, h: (45 * DW.scale) << 0};
				$.touch.create(DW.btns.end1, true, false);
			}
		};

		// 把死亡对话框对象删除
		DW.delDeadDialog = function() {
			$.touch.deleteImg(DW.btns.ready.id);
			DW.btns.ready = null;
			$.touch.deleteImg(DW.btns.end1.id);
			DW.btns.end1 = null;
		};

		// 画死亡界面的两个按钮。
		DW.showDeadDialog = function() {
			// DW.ctx.drawImage($.getImage('cxksjsyx'), ((DW.width - 296 * DW.scale) / 2) << 0, zantingbianliang, (296 * DW.scale) << 0, (242 * DW.scale) << 0);
			// 继续按钮
			DW.drawBtns(DW.btns.ready, $.getImage('cxks2'));
			// 结束按钮
			DW.drawBtns(DW.btns.end1, $.getImage('jsyx2'));
		};

// 创建游戏页面中各按钮对象-------------------------------------------------------------
		DW.createGamePage = function() {
			if (DW.btns.sound2 || DW.btns.pause || DW.btns.hs || DW.btns.huangse || DW.btns.ls || DW.btns.lvs) {
				return;
			} else {
				// 声音按钮2
				DW.btns.sound2 = {id: DW.id++, name: 'yx1', img: $.getImage('yx1'), x: (46 * DW.scale * 6) << 0, y: (35 * DW.scale * 0.8) << 0, w: (53 * DW.scale) << 0, h: (53 * DW.scale) << 0};
				$.touch.create(DW.btns.sound2, true, false);
				// 暂停按钮
				DW.btns.pause = {id: DW.id++, name: 'zt1', img: $.getImage('zt1'), x: (7.8 * DW.scale * 6) << 0, y: (35 * DW.scale * 0.8) << 0, w: (53 * DW.scale) << 0, h: (53 * DW.scale) << 0};
				$.touch.create(DW.btns.pause, true, false);
				//红色
				DW.btns.hs = {id: DW.id++, name: 'hs', img: $.getImage('hs'), x: (27 * DW.scale * 6) << 0, y: (51 * DW.scale * 7.5 + TEMY) << 0, w: (114 * DW.scale) << 0, h: (41 * DW.scale) << 0};
				$.touch.create(DW.btns.hs, true, false);
				//黄色
				DW.btns.huangse = {id: DW.id++, name: 'huangse', img: $.getImage('huangse'), x: (39 * DW.scale * 6) << 0, y: (58 * DW.scale * 7.5 + TEMY) << 0, w: (114 * DW.scale) << 0, h: (41 * DW.scale) << 0};
				$.touch.create(DW.btns.huangse, true, false);
				//绿色
				DW.btns.lvs = {id: DW.id++, name: 'lvs', img: $.getImage('lvs'), x: (15 * DW.scale * 6) << 0, y: (58 * DW.scale * 7.5 + TEMY) << 0,w: (114 * DW.scale) << 0, h: (41 * DW.scale) << 0};
				$.touch.create(DW.btns.lvs, true, false);
				//蓝色
				DW.btns.ls = {id: DW.id++, name: 'ls', img: $.getImage('ls'), x: (27 * DW.scale * 6) << 0, y: (65 * DW.scale * 7.5 + TEMY) << 0, w: (114 * DW.scale) << 0, h: (41 * DW.scale) << 0};
				$.touch.create(DW.btns.ls, true, false);
			}
		};
// 删除游戏页面中各对象
		DW.delGamePage = function() {
			$.touch.deleteImg(DW.btns.sound2.id);
			DW.btns.sound2 = null;
			$.touch.deleteImg(DW.btns.pause.id);
			DW.btns.pause.id = null;
		};
		// 游戏页面
		DW.showGamePage = function() {
			// 返回按钮
			var tmp = DW.btns.pause;
			if(DW.paused){
				DW.ctx.drawImage($.getImage('zt1'), (tmp.x - tmp.w / 2) << 0, (tmp.y - tmp.h / 2) << 0, tmp.w, tmp.h);
			}else{
				DW.ctx.drawImage($.getImage('zt'), (tmp.x - tmp.w / 2) << 0, (tmp.y - tmp.h / 2) << 0, tmp.w, tmp.h);
			}

			// 声音切换
			tmp = DW.btns.sound2;

			if (!DW.sound) {
				DW.ctx.drawImage($.getImage('yx1'), (tmp.x - tmp.w / 2) << 0, (tmp.y - tmp.h / 2) << 0, tmp.w, tmp.h);
				// console.log(3);
			} else {
				DW.ctx.drawImage($.getImage('yx1_1'), (tmp.x - tmp.w / 2) << 0, (tmp.y - tmp.h / 2) << 0, tmp.w, tmp.h);
				// console.log(4);
			}
			if (RandomNumber == 1){
				// console.log(1);
				DW.drawBtns(DW.btns.hs, $.getImage('hs2'));
				DW.drawBtns(DW.btns.huangse, $.getImage('huangse2'));
				DW.drawBtns(DW.btns.ls, $.getImage('ls2'));
				DW.drawBtns(DW.btns.lvs, $.getImage('lvs2'));
			}else{
				// console.log(2);
				DW.drawBtns(DW.btns.hs, $.getImage('x2'));
				DW.drawBtns(DW.btns.huangse, $.getImage('qw3'));
				DW.drawBtns(DW.btns.ls, $.getImage('y3'));
				DW.drawBtns(DW.btns.lvs, $.getImage('n3'));
			}
		};
//处理点击事件-----------------------------------------------------------------------------------------------
		$.touch.click(function(item) {
			// console.log(item.name);
			// click标志，阻止touchEnd事件再执行。
			DW.clicked = true;
			// logo page
			if (item.name == 'yx3') {
				DW.sound = !DW.sound;
				DW.musicControl();
			} else if (item.name == 'ksyx') {
				// 跳转到帮助界面。页面跳转前需先释放本页面对象
				DW.delLogoPage();
				DW.state = 1;
			} 
			// else if (item.name == 'phb') {
				// // 跳转到排行榜页面，未完成
			// } 
			// else if (item.name == 'gdyx') {
				// // 跳转到更多游戏页面，未完成
			// } 
			else if (item.name == 'tcyx') {
				if (history.length > 1) {
					history.back();
				} else {
				     window.location.reload(true);
				}
				// window.location.href = 'http://h5.qq.com';
			}
			// help page
			else if (item.name == 'help') {
				DW.delHelpPage();
				// 开始帮助游戏
				DW.state = 2;
			}
			else if(item.name == 'qianwang'){
				state = 1;
			}
// ---------------------------------------------------------------------------
			// // game page
			// // 暂停，声音
			else if (item.name == 'zt1') {
				DW.paused = true;
			} else if (item.name == 'yx1') {
				DW.sound = !DW.sound;
				DW.musicControl();
				// console.log(DW.sound);
			}
			// 暂停页面
			else if (item.name == 'jxyx') {
				DW.delPauseDialog();
				DW.paused = false;
				renderBg();
				DW.showGamePage();
			} else if (item.name == 'jsyx') {
				DW.paused = false;
                DW.sound = true;
                DW.musicControl();
                console.log(DW.sound);
				DW.delPauseDialog();
				console.log(DW.music.paused);
				init();
			}
			// 失败对话框
			else if (item.name == 'cxks') {
                DW.sound = true;
//                DW.musicControl();
				DW.delDeadDialog();
				init();
			} else if (item.name == 'jsyx1') {
                DW.sound = true;
                DW.musicControl();
				DW.delDeadDialog();
				console.log(DW.music.paused);
				init();
			}
			// else if(DW.paused == false){
				else if (item.name == 'hs' && DW.paused == false) {
					bianliang = 1;
				}
				else if(item.name == 'ls' && DW.paused == false) {
					bianliang = 2;
				}
				else if(item.name == 'lvs' && DW.paused == false) {
					bianliang = 3;
				}
				else if(item.name == 'huangse' && DW.paused == false) {
					bianliang = 4;
				}
				else if(item.name == 'x2' && DW.paused == false) {
					bianliang = 5;
				}
				else if(item.name == 'y2' && DW.paused == false) {
					bianliang = 6;
				}
				else if(item.name == 'qw2' && DW.paused == false) {
					bianliang = 7;
				}
				else if(item.name == 'n2' && DW.paused == false) {
					bianliang = 8;
				}
			// }
		});

		var checkResult = function(rn) {
				switch(RandomNumber){
					case 1:
						if (bianliang == 1) {//上
									// console.log(2);
							return 2;
						}else if(bianliang == 2) {//下
									// console.log(0);
							return 0;
						}else if(bianliang == 3) {//左
									// console.log(3);
							return 3;
						}else if(bianliang == 4) {//右
									// console.log(1);
							return 1;
						}else{
							return 5;
						}
						break;
					case 2:
						if (bianliang == 5) {//上
									// console.log(0);
							return 0;
						}else if(bianliang == 6){//下
									// console.log(2);
							return 2;
						}else if(bianliang == 7){//左
							// console.log(3);
							return 3;
						}else if(bianliang == 8){//右
									// console.log(1);
							return 1;
						}else{
							return 5;
						}
						break;
				}
		};
		
		
		
		$.run(function() {
			window.scrollTo(0, 1);
			if(DW.portrait){
				// alert(3);
				DW.showClue();
			}else{
				switch (2) {
					case 0:
						DW.createLogoPage();
						if(DW.btns.yx.y < DW.scale * 30){
							DW.btns.yx.y += 10;
							// DW.btns.fhsq.y += 10;
						}
						if(logo5bianliangX < DW.scale * 49.5){
							logo5bianliangX += DW.scale * 15;
						}
							if(DW.btns.ksyx.x > (175 * DW.scale) << 0){
								DW.btns.ksyx.x -= DW.scale * 23.6;
								// DW.btns.gdyx.x -= DW.scale * 25.2;
								// DW.btns.phb.x -= DW.scale * 25.2;
								DW.btns.tcyx.x -= DW.scale * 23.6;
							}
						DW.showLogoPage();
						 break;	// logo
					case 1:
						if(bangzhubianliang < 0){
							bangzhubianliang += 58;
						}
						DW.showHelpPage();
						break;	// help

					case 2:		//游戏中
						switch(state){
							case 0:
								if (_c < 20) {
									_c++;
								}
								else {
									_c = 0;
									_d++;
								}
								if(_d <= 2) {
									DW.createtishiPage();
									var TipsStr = tishi(mission);
									DW.showtishiPage();
								}
								if (_d > 2) {
									DW.deltishiPage();
									state = 1;
								}
							break;
						case 1:
							DW.deltishiPage();
							shengli = false;
							DW.createGamePage();
							initAnimal();
							renderBg();
							DW.showGamePage();
							tishibianliang1 = DW.width + 53;
							_c = 0;
							_d = 0;
							_m = 0;
							_n = 0;
							temp = 0;
							zqYZB = -117;
							kongjianY = (51 * DW.scale * 7.5 + TEMY) << 0;
//							tishibianliang = -580;
							bianliang = 0;
							state = -1;
							break;
						case 2:			//失败
                            if(fail) {
                                fail = false;
                                gameOverHandlerFunction(totalScore);
                            }
							// _e++;
							// if(_e < 100) {
//								DW.createDeadDialog();
								// console.log(DW.btns.ready.y);
//								$.canvas.clearScreen();
//								renderBg();
//								animal.render();
//								DW.ctx.drawImage($.getImage('ajxg'), temp, 0, 293, 178, (15 * DW.scale * 6) << 0, kongjianY, 293 * DW.scale, 178 * DW.scale);

//								temp += 178;
//								if(temp > 586){
//									temp = 586;
//								}
//								kongjianY += 10;
//								if(kongjianY > DW.height){
//									DW.ctx.drawImage($.getImage('cxksjsyx'), ((DW.width - 296 * DW.scale) / 2) << 0, zantingbianliang, (296 * DW.scale) << 0, (242 * DW.scale) << 0);
//									if(zantingbianliang < (((DW.height - 242 * DW.scale - 100) / 2) << 0)){
//										zantingbianliang += DW.height * 0.1;
//										DW.btns.ready.y += (DW.height * 0.09) << 0;
//										DW.btns.end1.y += (DW.height * 0.113) << 0;
//									}
//									DW.showDeadDialog();
//								}
							break;
						case 3:			//正确，恭喜
							if (_c < 7) {
								_c++;
							}
							else {
								_c = 0;
								_d++;
							}
							if(_d < 2) {
								if (RandomNumber == 1) {
									DW.ctx.drawImage($.getImage('zq'), 80 * DW.scale, DW.scale * 10, 158 * DW.scale, 241 * DW.scale);
								}
								else {
									DW.ctx.drawImage($.getImage('gx'), 80 * DW.scale, DW.scale * 10, 158 * DW.scale, 241 * DW.scale);
								}
							}
							else{
								state = 1;
							}
							break;
						case -1:		//倒计时
							renderBg();
							DW.showGamePage();
							if(DW.paused == false) {
								if (_a < 40) {
									_a++;
								}
								else {
									_a = 0;
									_b -= 25;
								}
								if(_b < 25) {										//如果在规定时间内答错或不答
									state = 2;
								}
							}
							$.canvas.setColor('#FFFFFF').fillRect(150 * DW.scale, 10 * DW.scale, 27 * DW.scale, 31 * DW.scale);
							DW.ctx.drawImage($.getImage('djs'), _b, 0, 25, 29, 150 * DW.scale, 10 * DW.scale, 25 * DW.scale, 29 * DW.scale);
							if(DW.paused == false){
								if (RandomNumber == 1) {
									passFun(randomB);
								}
								else {
									passFun(randomA);
								}
							}
							if (DW.paused) {
								DW.showPauseDialog();
							}
							break;

					}
					break;
				}
			}
//            $.canvas.drawString('DW.width: ' + DW.width, 100, 100);
		});
	});
};
