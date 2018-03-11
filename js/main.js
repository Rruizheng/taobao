window.onload = function()
{
	/*顶部标题栏	*/
	(function top(){
		var oArr = [];
		var oNavBox = [];
		for(var i=0;i<8;i++){
			var oArri = document.getElementById("arrow"+i);
			var oNavBoxi = document.getElementById("nav-box"+i);
			oArr.push(oArri);
			oNavBox.push(oNavBoxi);
		}
		for(var i=0;i<oArr.length;i++){
			oArr[i].index = i;
			oArr[i].onmouseover = function(){
				for(var y in oNavBox) oNavBox[y].style.display = "none";
				oNavBox[this.index].style.display = "block";
				oNavBox[this.index].onmouseout = function(){
					this.style.display = "none";
				}
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
			oLi[i].onclick = function(){
				var oString = oScrollTitle.innerHTML;
				oScrollTitle.innerHTML = this.innerHTML;
				this.innerHTML = oString;
			}
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