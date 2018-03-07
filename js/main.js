window.onload = function()
{
	
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
	})()
	
	
	
}