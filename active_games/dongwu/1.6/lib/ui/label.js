(function(c){c.ui.label=function(a){a=c.objExtend({id:"",width:300,height:20,x:0,y:0,padding:0,margin:"left",textAlign:"left",lineHeight:"20px",align:"",position:"",border:0,color:"",bgColor:"",html:"",fontSize:"12px",fontWeight:"normal",appendTo:"",textShadow:"",ui:{id:"",sx:0,sy:0,w:0,h:0},background:"",hided:false,data:null},a||{});c.ui.core.call(this,a.id,a.x,a.y,a.width,a.height,a.hided);this.padding=a.padding;this.border=a.border;this.margin=a.margin;this.items=a.items;this.setScroll=a.setScroll;
this.type="label";this.data=a.data;var b={width:this.width+"px",height:this.height+"px",fontSize:a.fontSize,fontWeight:a.fontWeight,textShadow:a.textShadow,padding:this.padding+"px",border:this.border+"px solid #CCCCCC",overflow:"hidden",textAlign:a.textAlign,lineHeight:a.lineHeight,display:this.hided?"none":"block"};if(a.position=="absolute"){b.position="absolute";b.left=this.x+"px";b.top=this.y+"px"}else{b.marginLeft=this.x+"px";b.marginTop=this.y+"px"}if(a.color!="")b.color=a.color;if(a.bgColor!=
"")b.backgroundColor=a.bgColor;if(a.ui.id!="")b.background="url("+c.getImage(a.ui.id).url+") -"+a.ui.sx+"px -"+a.ui.sy+"px";else if(a.background!="")b.background=a.background;this.dom=this.makeDom("div",{id:this.id,innerHTML:a.html},b,null);this.dom.that=this;a.appendTo!=""&&this.appendTo(a.appendTo)};c.extend(c.ui.label,c.ui.core)})(jsGame);
