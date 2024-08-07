var idArray = []
function dateTime(time){
  const year = new Date(time).getFullYear()
  const month = ("0" + (new Date(time).getMonth()+1)).slice(-2)
  const date = ("0" + new Date(time).getDate()).slice(-2)
  const hour = ("0" + new Date(time).getHours()).slice(-2)
  const minute = ("0" + new Date(time).getMinutes()).slice(-2)
  const normalDate = year + "年" + month + "月" + date + "日 " + hour + "時" + minute + "分"
  return normalDate
}
function setSerect(){
  $.getJSON("https://script.google.com/macros/s/AKfycbwcAsjg8lb7DcOjQvgRRBmU0pzGQTXv6tATgv25zt-Sce1id8S6pn09XxRcDsopt4pm/exec?url=https://www.data.jma.go.jp/developer/xml/feed/extra.xml", function (xmlDoc) {
        const entries = xmlDoc.entry;
        let dataContent = ""
        for (let i = 0; i < entries.length; i++) {
          if(entries[i].title && entries[i].updated && entries[i].id && entries[i].author.name && entries[i].content){
            document.getElementById('serect').innerHTML = ""
            dataContent += "<option value='" + entries[i].id + "'>" + "[" + entries[i].title + "]" + dateTime(entries[i].updated) + "(" + entries[i].author.name + ")"
	    console.log(dataContent)
            idArray.push(entries[i].id)
          }
        }
        document.getElementById('serect').innerHTML = dataContent
    })
}

async function content(){
    let field1 = document.getElementById("field1").value
    let field2 = document.getElementById("field2").value
    let field3 = document.getElementById("field3").value
    let field4 = document.getElementById("field4").value
    if(field1 !== "" && idArray.includes(field1) === true){
	let [info] = await Promise.all([
	  dataGet(field1)
	])
	console.log(info)
	document.getElementById("title0").innerHTML = info[0]
	document.getElementById("date0").innerHTML = info[1]
	document.getElementById("body0").innerHTML = info[2]
	document.getElementById("content0").style.display = "block"
    }else if(field1 === ""){
	document.getElementById("content0").style.display = "none"
    }
    if(field2 !== "" && idArray.includes(field2) === true){
	let info = dataGet(field2)
	document.getElementById("title1").innerHTML = info[0]
	document.getElementById("date1").innerHTML = info[1]
	document.getElementById("body1").innerHTML = info[2]
	document.getElementById("content1").style.display = "block"
    }else if(field2 === ""){
	document.getElementById("content1").style.display = "none"
    }
    if(field3 !== "" && idArray.includes(field3) === true){
	let info = dataGet(field3)
	document.getElementById("title2").innerHTML = info[0]
	document.getElementById("date2").innerHTML = info[1]
	document.getElementById("body2").innerHTML = info[2]
	document.getElementById("content2").style.display = "block"
    }else if(field3 === ""){
	document.getElementById("content2").style.display = "none"
    }
    if(field4 !== "" && idArray.includes(field4) === true){
	let info = dataGet(field4)
	document.getElementById("title3").innerHTML = info[0]
	document.getElementById("date3").innerHTML = info[1]
	document.getElementById("body3").innerHTML = info[2]
	document.getElementById("content3").style.display = "block"
    }else if(field4 === ""){
	document.getElementById("content3").style.display = "none"
    }
}
async function dataGet(url){
  $.getJSON("https://script.google.com/macros/s/AKfycbwcAsjg8lb7DcOjQvgRRBmU0pzGQTXv6tATgv25zt-Sce1id8S6pn09XxRcDsopt4pm/exec?url=" + url, function (xmlDoc) {
	var title = ""
	var date = ""
	var body = ""
	title = xmlDoc.Head.Title
	date = dateTime(xmlDoc.Head.ReportDateTime) + "発表"
	var area = ""
	var kind = ""
	console.log(title.includes("気象情報"))
	if(title.includes("気象情報") !== true){
	  var warnings = xmlDoc.Body.Warning
  	  var items = warnings[0].Item
	  if(title.includes("土砂災害警戒情報") === true){
            let headItem = xmlDoc.Head.Headline.Information.Item
	    headStatus = ""
	    for(var e = 0;e<headItem.length;e++){
	      headStatus += headItem[e].Kind.Name + "・"
	    }
	    headStatus = headStatus.slice(0,headStatus.lengh-1)
	    let infoHead = ""
            if(headStatus.includes("発表") === true){
              infoHead = "土砂災害警戒情報は【警戒レバル4相当】の情報です。危険な地域から直ちに避難する必要があります。市区町村からの避難指示に注意してください。\n"
	    }else {
	      infoHead = "土砂災害警戒情報は全解除されました。\n"
	    }
	    body += xmlDoc.Body.TargetArea.Name + "内の地域に土砂災害警戒情報が" + headStatus + "されました。\n" + infoHead
	  }else if(title.includes("気象警報・注意報") === true){
	    body = xmlDoc.Head.Headline.Text + "\n詳細情報です。"
	  }
	  for(var d = 0;d<items.length;d++){
	      var kinds = items[d].Kind
	      var areas = items[d].Area
	      if(title.includes("気象警報・注意報") === true){
	        for(var i = 0;i<kinds.length;i++){
	          var addition = ""
	          if(kind[i].Addition){
	            var additions = kind[i].Addition
	            for(var b = 0;b<additions.length;b++){
	              addition += additions[b].Note + ","
	            }
	          }
	            if(kind[i].Attention){
	            var attentions = kind[i].Attention
	            for(var c = 0;b<additions.length;c++){
	              attention += attentions[c].Note  + ","
	            }
	          }
	          var totalInfo = addition + attention.slice(0,attention.length-1)
	          if(totalInfo === ""){
	            kind += kinds[i].Name + "[" + kinds[i].Status + "]，"
	          }else {
	            kind += kinds[i].Name + "(" + totalInfo + ")" + "[" + kinds[i].Status + "]，"
	          }
	        }
	        for(var a = 0;a<areas.length;a++){
	          area += areas[a].Name + "(" + items[d].FullStatus + "),"
	        }
	        area = area.slice(0,area.length-1)
	        kind = kind.slice(0,kind.length-1)
	        if(area !== "" && kind !== ""){
	          let changeSf = ""
	          let changeSfi = ""
		   if(items[d].ChangeStatus !== "変化無"){
	             if(items[d].EditingMark === "1"){
		       changeSf = "に発表されている"
		       changeSfi = "が解除されました。"
		     }else if(items[d].EditingMark === "0"){
		       changeSf = "に"
		       changeSfi = "が発表されました。"
		     }
		   }else if(items[d].ChangeStatus === "変化無"){
		     changeSf = "に発表されている"
		     changeSfi = "は現在も継続して発表されています。"
		   }
	           body += area + changeSf + kind + changeSfi + "\n"
	       }
              }else if(title.includes("土砂災害警戒情報") === true){
	        if(kinds.Name !== "なし"){
	          area = xmlDoc.Body.TargetArea.Name + areas.Name
	          if(kinds.Status === "発表"){
		    body += area + changeSf + kind + changeSfi + "\n"
		  }else if(kinds.Status === "解除"){
		    body += area + changeSf + kind + changeSfi + "\n"
		  }
	       }
              }
	  }
	}else {
	  body = xmlDoc.Head.Headline.Text
	}
	return [title,date,body]
    })
}
setSerect()
