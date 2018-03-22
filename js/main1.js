var $ = function(id){
	return typeof id === "string" ? document.getElementById(id) : id;
}

var $$ = function(tagname,oParent){
	return  (oParent || document).getElementsByTagName(tagname);
}

var $$$ = function(sClass,oParent){
	var aClass=[];
	var reClass = new RegExp("(^| )"+sClass + "( |$)");
	var aElem = this.$$("*",oParent);
	for(var i=0;i<aElem.length;i++){
		reClass.test(aElem[i].className)&&aClass.push(aElem[i]);
	}
	return aClass;
}


/*创建函数对象*/
var AutoPlay = function(imgbox){this.initialize(imgbox)};
/*给函数对象的原型赋予属性*/
AutoPlay.prototype = {
	/*初始化*/
	initialize: function(imgbox){
		var oThis = this;					
		this.oImgbox = $$$(imgbox,document)[0];
		this.oBox = $$("div",this.oImgbox)[0];
		this.oUl = $$("ul",this.oBox)[0];
		this.oBtn = $$("ul",this.oBox)[1];
		this.aBtn = $$("a",this.oBtn);
		this.aImg = $$("li",this.oUl);
		this.timer = null;
		this.iNow = 0;
		this.AutoTimer = null;
		
		this.leftBtn = $$$("leftbtn",this.oBox)[0];
		this.rightBtn = $$$("rightbtn",this.oBox)[0];
		
		
		this.toggle();
		this.autoTimer = setInterval(function(){
			oThis.next();
		},4000);
		
		this.oBox.onmouseover = function(){
			clearInterval(oThis.autoTimer);
			oThis.leftBtn.style.display = "block";
			oThis.rightBtn.style.display = "block";
		}
		this.oBox.onmouseout = function(){
			oThis.autoTimer = setInterval(function(){
				oThis.next();
			},3000);
			oThis.leftBtn.style.display = "none";
			oThis.rightBtn.style.display = "none";
		}
		this.rightBtn.onclick = function(){
			oThis.next();
		}
		this.leftBtn.onclick = function(){
			oThis.before();
		}
		for(var i=0;i<this.aBtn.length;i++){
			this.aBtn[i].index = i;
			this.aBtn[i].onmouseover = function(){
				oThis.iNow = this.index;
				oThis.toggle();
			}
		}
	},
	
	toggle: function(){
		for(var i=0; i<this.aBtn.length;i++){
			this.aBtn[i].className="";
		}
		this.aBtn[this.iNow].className = "current";
		this.doMove(-(this.iNow*this.aImg[0].offsetWidth));
	},
	next: function(){
		this.iNow ++;
		this.iNow == this.aBtn.length && (this.iNow=0);
		this.toggle();
	},
	before: function(){
		this.iNow ==0?(this.iNow=this.aBtn.length-1):(this.iNow --);
		this.toggle();
	},
	doMove: function(iTarget) {
		var oThis = this;
		clearInterval(oThis.timer);
		oThis.timer = setInterval(function(){
			var iSpeed = (iTarget - oThis.oUl.offsetLeft)/5;
			iSpeed = iSpeed > 0 ?Math.ceil(iSpeed) : Math.floor(iSpeed);
			oThis.oUl.offsetLeft == iTarget ? clearInterval(oThis.timer) : (oThis.oUl.style.left = oThis.oUl.offsetLeft + iSpeed + "px");
		},30);
	}
};

var AutoPlay2 = function(imgbox){this.initialize(imgbox)};
/*给函数对象的原型赋予属性*/
AutoPlay2.prototype = {
	/*初始化*/
	initialize: function(imgbox){
		var oThis = this;					
		this.oBox = $$$(imgbox,document)[0];
		this.oUl = $$("ul",this.oBox)[0];
		this.aImg = $$("li",this.oUl);
		this.timer = null;
		this.iNow = 0;
		this.AutoTimer = null;

		this.toggle();
		this.autoTimer = setInterval(function(){
			oThis.next();
		},4000);
		
		this.oBox.onmouseover = function(){
			clearInterval(oThis.autoTimer);
			
		}
		this.oBox.onmouseout = function(){
			oThis.autoTimer = setInterval(function(){
				oThis.next();
			},3000);

		}

	},
	
	toggle: function(){
		this.doMove(-(this.iNow*this.aImg[0].offsetHeight));
	},
	next: function(){
		this.iNow ++;
		this.iNow == this.aImg.length && (this.iNow=0);
		this.toggle();
	},
	doMove: function(iTarget) {
		var oThis = this;
		clearInterval(oThis.timer);
		oThis.timer = setInterval(function(){
			var iSpeed = (iTarget - oThis.oUl.offsetTop)/5;
			iSpeed = iSpeed > 0 ?Math.ceil(iSpeed) : Math.floor(iSpeed);
			oThis.oUl.offsetTop == iTarget ? clearInterval(oThis.timer) : (oThis.oUl.style.top = oThis.oUl.offsetTop + iSpeed + "px");
		},30);
	}
};

window.onload = function()
{
	/*交换选择项目*/
	function changeTitle(oLi1,oLi2){
		oLi1.onclick = function(){
			var oString = oLi2.innerHTML;
			oLi2.innerHTML = this.innerHTML;
			this.innerHTML = oString;
		}
	}
	
	function css(obj,attr,value){
		//检验给函数的参数个数
		switch(arguments.length){
			case 2:
			//例如css(oLi, {"opacity" : "0", "height" : "0"});设置了对象obj,第二个对象类型是object,批量设置属性。style[i]=attr[i]。attr[opacity] = 0。
				if(typeof arguments[1] == "object"){
					for(var i in attr) i == "opacity" ?(obj.style["filter"] = "alpha(opacity=" + attr[i] + ")") : obj.style[i] = attr[i];
			//例如css(oLi, "height");第二个对象类型是string,读取属性
				}else{
					//IE用currentStyle方法，没有的话，用getComputedStyle方法
					return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,null)[attr]
				}
				break;
			//有三个参数，单一设置属性。
			case 3:
				attr == "opacity" ? (obj.style["filter"] = "alpha(opacity=" + value + ")",obj.style[attr] = value/100) : obj.style[attr] = value;
				break;
		}
	};
	
	/*classname处理*/
	function addClass(obj,sClass){
		var oName = obj.className;
		oName ? (oName = oName + " " + sClass ):(oName = sClass);
		obj.className = oName;
	}
	function removeClass(obj,sClass){
		var oName = obj.className;
		oName = oName.replace("sClass","");
		obj.className = oName;
	}
	
	/*顶部标题栏	*/
	(function top(){
		var oArr = [];
		var oNavBox = [];
		var oNavNone = [];
		
		oNavNone.push(document.getElementsByClassName("top-left4")[0]);
		oNavNone.push(document.getElementsByClassName("top-right2")[0]);
		oNavNone.push(document.getElementsByClassName("top-right4")[0]);
		
		/*滑动背景色*/
		for(var i=0;i<oNavNone.length;i++){
			oNavNone[i].index = i;
			oNavNone[i].onmouseover = function(){
				for(var y in oNavBox) oNavBox[y].style.display = "none";
				for(var y in oArr) oArr[y].style.backgroundColor = "#f4f4f4";
			}
		}
		
		for(var i=0;i<8;i++){
			var oArri = document.getElementById("arrow"+i);
			var oNavBoxi = document.getElementById("nav-box"+i);
			oArr.push(oArri);
			oNavBox.push(oNavBoxi);
		}
		
		/*显示隐藏栏目*/
		for(var i=0;i<oArr.length;i++){
			oArr[i].index = i;
			oArr[i].onmouseover = function(){
				for(var y in oNavBox) oNavBox[y].style.display = "none";
				oNavBox[this.index].style.display = "block";	
				
				/*隐藏栏定位*/
				(this.index!=(oArr.length-1))&&(oNavBox[this.index].style.left = this.offsetLeft + "px");
				oNavBox[this.index].index = this.index;
				
				oNavBox[this.index].onmouseleave = function(){
					this.style.display = "none";
					oArr[this.index].style.backgroundColor = "#f4f4f4";
				}
				for(var y=0;y<oNavBox.length;y++){
					if(oNavBox[y].style.display === "none"){
						oArr[y].style.backgroundColor = "#f4f4f4";
					}else if(oNavBox[y].style.display === "block"){
						oArr[y].style.backgroundColor = "#fff";
					}
				}
			}
		}
		
		/*切换选择项*/
		for(var i=3;i<7;i++){
			var oLi = oNavBox[i].getElementsByTagName("li");
			var oTitle = oArr[i].getElementsByTagName("a")[0];
			for(var y=0;y<oLi.length;y++){
				changeTitle(oLi[y],oTitle);	
			}
		}
		
		
	})();
	
	/*滚动搜索框*/
	(function scrollSearch(){
		window.onscroll = function(){
		    var oScrollSearch = document.getElementsByClassName("scroll-search-box")[0];
		    var topScroll =document.body.scrollTop;
			if(topScroll > 285){ //当滚动距离大于700px时执行下面的东西
	          oScrollSearch.style.display="block";
	        }else{//当滚动距离小于250的时候执行下面的内容，也就是让导航栏恢复原状
	          oScrollSearch.style.display="none";
	        }
		}
		var oScrollSearch = document.getElementsByClassName("scroll-search-box")[0];
		var oScrollTitle = oScrollSearch.getElementsByClassName("current-title")[0];
		var oScrollNav = oScrollSearch.getElementsByClassName("scroll-search-nav")[0];
		var oScrollToggle = oScrollSearch.getElementsByClassName("scroll-search-toggle-box")[0];
		var oLi = oScrollToggle.getElementsByTagName("li");
		
		oScrollNav.onmouseover=function(){
			oScrollToggle.style.display = "block";
		}
		oScrollToggle.onmouseout=function(){
			oScrollToggle.style.display = "none";
		}
		for(var i=1;i<oLi.length;i++){
			oLi[i].index = i;
			changeTitle(oLi[i],oScrollTitle);
		}	
	})();
	
	
	
	/*头部搜索框*/
	(function search(){
		var oUl = document.getElementsByClassName("search-nav")[0];
		var oLi = oUl.getElementsByTagName("li");
		var oHots = document.getElementsByClassName("search-hots")[0];
		var oDiv = oHots.getElementsByTagName("div");
		var oClose = document.getElementsByClassName("qrcode-close")[0];
		var oQr = document.getElementsByClassName("qrcode")[0];
		oClose.onclick = function(){
			oQr.style.display = "none";
		}
		
		for(var i=0;i<oLi.length;i++){
			oLi[i].index = i;
			oLi[i].onclick = function(){
				for(var y in oLi) oLi[y].className="";
				for(var y in oDiv) oDiv[y].className="";
				this.className ="selected";
				oDiv[this.index].className="selected";
			};
		}
	})();
	
	/*侧边栏*/
	(function sidebar(){
		var oHeadSidBar = document.getElementsByClassName("header-sidebar")[0];
		var oLi = oHeadSidBar.getElementsByClassName("side-li")[0].getElementsByTagName("li");
		var oBox = oHeadSidBar.getElementsByClassName("hiden-box");
			
		for(var i=0;i<oLi.length;i++){					
			oLi[i].index = i;
			oLi[i].onmouseover= function(){
				for(var y=0;y<oBox.length;y++){
					oBox[y].style.display = "none"
				} 
				for(var y=0;y<oLi.length;y++){
					oLi[y].style.backgroundColor="#FFF";
				}
				oBox[this.index].style.display="block";
				oBox[this.index].index = this.index;
				this.style.backgroundColor="#ffe4dc";
				oBox[this.index].onmouseleave = function(){
					this.style.display = "none";
					oLi[this.index].style.backgroundColor = "#FFF";
				}
				this.onmouseleave = function(event){
					event = event || window.event;
					var oLix = this.getBoundingClientRect().left;
					if(event.clientX <= oLix){
						for(var y=0;y<oBox.length;y++){
							oBox[y].style.display = "none";
						}
						for(var y=0;y<oLi.length;y++){
							oLi[y].style.backgroundColor="#FFF";
						}
					}
				}
			}
		}
	})();

/*轮播组件函数*/
   var imgbar1 = new AutoPlay("header-imgbar1");
   var imgbar2 = new AutoPlay("header-imgbar2");
   var imgbar3 = new AutoPlay2("header-imgbar3");
	   
   imgbar2.toggle = function(){
		this.count = $$$("imgbar2-now-count",document)[0];
		for(var i=0; i<this.aBtn.length;i++){
			this.aBtn[i].className="";
		}
		this.aBtn[this.iNow].className = "current";
		this.doMove(-(this.iNow*this.aImg[0].offsetWidth));
		this.count.innerHTML = this.iNow+1;
	}


/**********leftbar*************/
/*警示栏*/




}