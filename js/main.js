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
}