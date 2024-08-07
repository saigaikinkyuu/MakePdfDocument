var idArray = []
function date(time){
  const year = new Date(time).getFullYear()
  const month = ("0" + (new Date(time).getMonth()+1)).slice(-2)
  const date = ("0" + new Date(time).getDate()).slice(-2)
  const hour = ("0" + new Date(time).getHours()).slice(-2)
  const minute = ("0" + new Date(time).getMinutes()).slice(-2)
  const normalDate = year + "年" + month + "月" + date + "日 " + hour + "時" + minute + "分"
  return normalDate
}
function setSerect(){
  fetch("https://www.data.jma.go.jp/developer/xml/feed/extra.xml")
    .then(response => response.text())
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    .then(xmlDoc => {
        const entries = xmlDoc.getElementsByTagName("entry");
        let dataContent = ""
        for (let i = 0; i < entries.length; i++) {
          if(entries[i].getElementsByTagName("title") && entries[i].getElementsByTagName("updated") && entries[i].getElementsByTagName("id") && entries[i].getElementsByTagName("author").getElementsByTagName("name") && entries[i].getElementsByTagName("link") && entries[i].getElementsByTagName("content")){
            document.getElementById('serect').innerHTML = ""
            dataContent += "<option value='" + entries[i].getElementsByTagName("id").textContent + "'>" + "[" + entries[i].getElementsByTagName("title").textContent + "]" + date(entries[i].getElementsByTagName("updated").textContent) + "(" + entries[i].getElementsByTagName("author").getElementsByTagName("name").textContent + ")"
            idArray.push(entries[i].getElementsByTagName("id").textContent)
          }
        }
        document.getElementById('serect').innerHTML = dataContent
    })
    .catch(error => {
        console.error("Failed to load XML file:", error);
    });
}

function content(){
    let field1 = document.getELementById("field1").value
    let field2 = document.getELementById("field2").value
    let field3 = document.getELementById("field3").value
    let field4 = document.getELementById("field4").value
    if(field1 !== "" && idArray.includes(field1) === true){
	let info = dataGet(field1)
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
function dataGet(url){
  fetch(url)
    .then(response => response.text())
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    .then(xmlDoc => {
	var title = ""
	var date = ""
	var body = ""
	title = xmlDoc.getElementsByTagName("Head").getElementsByTagName("Title").textContent
	date = date(xmlDoc.getElementsByTagName("Head").getElementsByTagName("ReportDateTime").textContent) + "発表"
	var area = ""
	var kind = ""
	var warnings = xmlDoc.getElementsByTagName("Body").getElementsByTagName("Warning")
	var items = warnings[0].getElementsByTagName("Item")
	if(title.includes("土砂災害警戒情報") === true){
          let headItem = xmlDoc.getElementsByTagName("Head").getElementsByTagName("Headline").getElementsByTagName("Information").getElementsByTagName("Item")
	  headStatus = ""
	  for(var e = 0;e<headItem.length;e++){
	    headStatus += headItem[e].getElementsByTagName("Kind").getElementsByTagName("Name") + "・"
	  }
	  headStatus = headStatus.slice(0,headStatus.lengh-1)
	  let infoHead = ""
          if(headStatus.includes("発表") === true){
            infoHead = "土砂災害警戒情報は【警戒レバル4相当】の情報です。危険な地域から直ちに避難する必要があります。市区町村からの避難指示に注意してください。\n"
	  }else {
	    infoHead = "土砂災害警戒情報は全解除されました。\n"
	  }
	  body += xmlDoc.getElementsByTagName("Body").getElementsByTagName("TargetArea").getElementsByTagName("Name").textContent + "内の地域に土砂災害警戒情報が" + headStatus + "されました。\n" + infoHead
	}else if(title.includes("気象警報・注意報") === true){
	  body = xmlDoc.getElementsByTagName("Head").getElementsByTagName("Headline").getElementsByTagName("Text").textContent + "\n詳細情報です。"
	}
	for(var d = 0;d<items.length;d++){
	    var kinds = items[d].getElementsByTagName("Kind")
	    var areas = items[d].getElementsByTagName("Area")
	    if(title.includes("気象警報・注意報") === true){
	      for(var i = 0;i<kinds.length;i++){
	        var addition = ""
	        if(kind[i].getElementsByTagName("Addition")){
	          var additions = kind[i].getElementsByTagName("Addition")
	          for(var b = 0;b<additions.length;b++){
	            addition += additions[b].getElementsByTagName("Note").textContent + ","
	          }
	        }
	          if(kind[i].getElementsByTagName("Attention")){
	          var attentions = kind[i].getElementsByTagName("Attention")
	          for(var c = 0;b<additions.length;c++){
	            attention += attentions[c].getElementsByTagName("Note").textContent  + ","
	          }
	        }
	        var totalInfo = addition + attention.slice(0,attention.length-1)
	        if(totalInfo === ""){
	          kind += kinds[i].getElementsByTagName("Name").textContent + "[" + kinds[i].getElementsByTagName("Status").textContent + "]，"
	        }else {
	          kind += kinds[i].getElementsByTagName("Name").textContent + "(" + totalInfo + ")" + "[" + kinds[i].getElementsByTagName("Status").textContent + "]，"
	        }
	      }
	      for(var a = 0;a<areas.length;a++){
	        area += areas[a].getElementsByTagName("Name").textContent + "(" + items[d].getElementsByTagName("FullStatus") + "),"
	      }
	      area = area.slice(0,area.length-1)
	      kind = kind.slice(0,kind.length-1)
	      if(area !== "" && kind !== ""){
	        let changeSf = ""
	        let changeSfi = ""
		 if(items[d].getElementsByTagName("ChangeStatus").textContent !== "変化無"){
	           if(items[d].getElementsByTagName("EditingMark").textContent === "1"){
		     changeSf = "に発表されている"
		     changeSfi = "が解除されました。"
		   }else if(items[d].getElementsByTagName("EditingMark").textContent === "0"){
		     changeSf = "に"
		     changeSfi = "が発表されました。"
		   }
		 }else if(items[d].getElementsByTagName("ChangeStatus").textContent === "変化無"){
		   changeSf = "に発表されている"
		   changeSfi = "は現在も継続して発表されています。"
		 }
	         body += area + changeSf + kind + changeSfi + "\n"
	     }
            }else if(title.includes("土砂災害警戒情報") === true){
	      if(kinds.getElementsByTagName("Name").textContent !== "なし"){
	        area = xmlDoc.getElementsByTagName("Body").getElementsByTagName("TargetArea").getElementsByTagName("Name").textContent + areas.getElementsByTagName("Name")
	        if(kinds.getElementsByTagName("Status") === "発表"){
		  body += area + changeSf + kind + changeSfi + "\n"
		}else if(kinds.getElementsByTagName("Status") === "解除"){
		  body += area + changeSf + kind + changeSfi + "\n"
		}
	     }
            }
	}
	return [title,date,body]
    })
}
