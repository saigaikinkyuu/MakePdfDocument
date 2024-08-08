var idArray = []
var jsonArray = []
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
  $.getJSON("https://www.jma.go.jp/bosai/tsunami/data/list.json", function (data) {
        let dataContent = ""
        for (let i = 0; i < data.length; i++) {
          if(data[i].ttl && data[i].at && data[i].json){
            document.getElementById('serect').innerHTML = ""
            dataContent += "<option value='" + data[i].ctt + "'>" + "[" + data[i].ttl + "]" + dateTime(data[i].at)
            idArray.push(data[i].ctt)
            jsonArray.push(data[i].json)
          }
        }
        document.getElementById('serect').innerHTML = "<option id='example' value='example'>|--ここから項目を選択します--|" + dataContent
    })
}

function content(){
    let field1 = document.getElementById("field1").value
    let field2 = document.getElementById("field2").value
    let field3 = document.getElementById("field3").value
    let field4 = document.getElementById("field4").value
    if(field1 !== "" && idArray.includes(field1) === true){
      let n = idArray.indexOf(field1)
      $.getJSON("https://www.jma.go.jp/bosai/tsunami/data/" + jsonArray[n], function (data) {
      	let info = dataGet(data)
	    	document.getElementById("title0").innerText = info[0]
    		document.getElementById("date0").innerText = info[1]
	    	document.getElementById("body0").innerText = info[2]
    		document.getElementById("content0").style.display = "block"
      })
    }else if(field1 === ""){
      document.getElementById("content0").style.display = "none"
    }
    if(field2 !== "" && idArray.includes(field2) === true){
      let n = idArray.indexOf(field2)
      $.getJSON("https://www.jma.go.jp/bosai/tsunami/data/" + jsonArray[n], function (data) {
	    	let info = dataGet(xmlDoc)
	    	document.getElementById("title1").innerText = info[0]
	    	document.getElementById("date1").innerText = info[1]
	    	document.getElementById("body1").innerText = info[2]
	    	document.getElementById("content1").style.display = "block"
      })
    }else if(field2 === ""){
	document.getElementById("content1").style.display = "none"
    }
    if(field3 !== "" && idArray.includes(field3) === true){
      let n = idArray.indexOf(field3)
      $.getJSON("https://www.jma.go.jp/bosai/tsunami/data/" + jsonArray[n], function (data) {
	      let info = dataGet(xmlDoc)
      	document.getElementById("title2").innerText = info[0]
      	document.getElementById("date2").innerText = info[1]
      	document.getElementById("body2").innerText = info[2]
      	document.getElementById("content2").style.display = "block"
      })
    }else if(field3 === ""){
	    document.getElementById("content2").style.display = "none"
    }
    if(field4 !== "" && idArray.includes(field4) === true){
      let n = idArray.indexOf(field4)
      $.getJSON("https://www.jma.go.jp/bosai/tsunami/data/" + jsonArray[n], function (data) {
      	let info = dataGet(xmlDoc)
	      document.getElementById("title3").innerText = info[0]
	      document.getElementById("date3").innerText = info[1]
      	document.getElementById("body3").innerText = info[2]
      	document.getElementById("content3").style.display = "block"
      })
    }else if(field4 === ""){
    	document.getElementById("content3").style.display = "none"
    }
}
function dataGet(data){
  try{
  var title = ""
  var date = ""
  var body = ""
  var body_head_text = ""
  var body_body_items = ""
  var body_body_items_kind1 = "" //大津波警報
  var body_body_items_kind2 = "" //津波警報
  var body_body_items_kind3 = "" //津波注意報
  var body_body_items_kind4 = "" //津波予報
  var firstWave_arrival_flag = false
  var firstWave_maxHeight_flag = false
  var body_body_items_totalKind = ""
  title = data.Control.Title
  date = dateTime(data.Head.ReportDateTime) + "発表"
  if(data.Head){
    if(data.Head.Headline){
      body_head_text = data.Head.Headline.Text
    }
  }
  if(data.Body){
    if(data.Body.Tsunami){
      if(data.Body.Tsunami.Forecast){
        if(data.Body.Tsunami.Forecast.Item){
          body_body_items = data.Body.Tsunami.Forecast.Item
          var body_body_item_area = ""
          var body_body_item_kind = ""
          var body_body_item_lastKind = ""
          var body_body_item_maxHeight = ""
          var body_body_item_firstWave_arrival = ""
          if(!Array.isArray(body_body_items)){
            body_body_items = [body_body_items]
          }
          for(var i = 0;i<body_body_items.length;i++){
            body_body_item_area = ""
            if(body_body_items[i].Area){
              body_body_item_area = body_body_items[i].Area.Name
            }
	    console.log(body_body_item_area)
            if(body_body_items[i].Category){
              if(body_body_items[i].Category.Kind){
                body_body_item_kind = body_body_items[i].Category.Kind.Name
              }
              if(body_body_items[i].Category.LastKind){
                body_body_item_lastKind = body_body_items[i].Category.LastKind.Name
              }
            }
            if(body_body_items[i].MaxHeight){
              if(body_body_items[i].MaxHeight.TsunamiHeight){
                firstWave_maxHeight_flag = true
                body_body_item_maxHeight = body_body_items[i].MaxHeight.TsunamiHeight
                if(body_body_items[i].MaxHeight.TsunamiHeight === "\u003C0.2"){
                  body_body_item_maxHeight = "0.2m未満"
                }
              }
            }
            if(body_body_items[i].FirstHeight){
              if(body_body_items[i].FirstHeight.ArrivalTime){
                body_body_item_firstWave_arrival = dateTime(body_body_items[i].FirstHeight.ArrivalTime)
                firstWave_arrival_flag = true
                if((body_body_item_firstWave_arrival.slice(0,11)).slice(-3) !== ("0" + new Date().getDate()).slice(-2) + "日"){
                  body_body_item_firstWave_arrival = (body_body_item_firstWave_arrival.slice(0,11)).slice(-3) + " " + body_body_item_firstWave_arrival.slice(-6)
                }else {
                  body_body_item_firstWave_arrival = body_body_item_firstWave_arrival.slice(-6)
                }
              }
            }
	    console.log(body_body_item_area + "," + body_body_item_kind + "," + body_body_item_lastKind + "," + body_body_item_maxHeight + "," + body_body_item_firstWave_arrival)
            if(body_body_item_area && body_body_item_kind !== undefined && body_body_item_lastKind !== undefined && body_body_item_maxHeight !== undefined && body_body_item_firstWave_arrival !== undefined){
              if(body_body_item_area !== ""){
                if(body_body_item_kind !== ""){
                  if(body_body_item_lastKind !== ""){
                    if(body_body_item_maxHeight !== ""){
                      if(body_body_item_kind === "津波予報（若干の海面変動）"){
                        if(body_body_item_firstWave_arrival !== ""){
                          body_body_items_kind4 += body_body_item_firstWave_arrival + " " + body_body_item_area + " " + body_body_item_maxHeight + "/改行/"
                        }else {
                          body_body_items_kind4 += "/到達時刻/ " + body_body_item_area + " " + body_body_item_maxHeight + "/改行/"
                        }
                      }else if(body_body_item_kind === "津波注意報"){
                        if(body_body_item_firstWave_arrival !== ""){
                          body_body_items_kind3 += body_body_item_firstWave_arrival + " " + body_body_item_area + " " + body_body_item_maxHeight + "/改行/"
                        }else {
                          body_body_items_kind3 += "/到達時刻/ " + body_body_item_area + " " + body_body_item_maxHeight + "/改行/"
                        }
                      }else if(body_body_item_kind === "津波警報"){
                        if(body_body_item_firstWave_arrival !== ""){
                          body_body_items_kind2 += body_body_item_firstWave_arrival + " " + body_body_item_area + " " + body_body_item_maxHeight + "/改行/"
                        }else {
                          body_body_items_kind2 += "/到達時刻/ " + body_body_item_area + " " + body_body_item_maxHeight + "/改行/"
                        }
                      }else if(body_body_item_kind === "大津波警報：発表"){
                        if(body_body_item_firstWave_arrival !== ""){
                          body_body_items_kind1 += body_body_item_firstWave_arrival + " " + body_body_item_area + " " + body_body_item_maxHeight + "/改行/"
                        }else {
                          body_body_items_kind1 += "/到達時刻/ " + body_body_item_area + " " + body_body_item_maxHeight + "/改行/"
                        }
                      }
                    }else {
                    if(body_body_item_maxHeight !== ""){
                      if(body_body_item_kind === "津波予報（若干の海面変動）"){
                        if(body_body_item_firstWave_arrival !== ""){
                          body_body_items_kind4 += body_body_item_firstWave_arrival + " " + body_body_item_area + " " + body_body_item_maxHeight + "/改行/"
                        }else {
                          body_body_items_kind4 += "/到達時刻/ " + body_body_item_area + " " + body_body_item_maxHeight + "/改行/"
                        }
                      }else if(body_body_item_kind === "津波注意報"){
                        if(body_body_item_firstWave_arrival !== ""){
                          body_body_items_kind3 += body_body_item_firstWave_arrival + " " + body_body_item_area + " " + body_body_item_maxHeight + "/改行/"
                        }else {
                          body_body_items_kind3 += "/到達時刻/ " + body_body_item_area + " " + body_body_item_maxHeight + "/改行/"
                        }
                      }else if(body_body_item_kind === "津波警報"){
                        if(body_body_item_firstWave_arrival !== ""){
                          body_body_items_kind2 += body_body_item_firstWave_arrival + " " + body_body_item_area + " " + body_body_item_maxHeight + "/改行/"
                        }else {
                          body_body_items_kind2 += "/到達時刻/ " + body_body_item_area + " " + body_body_item_maxHeight + "/改行/"
                        }
                      }else if(body_body_item_kind === "大津波警報：発表"){
                        if(body_body_item_firstWave_arrival !== ""){
                          body_body_items_kind1 += body_body_item_firstWave_arrival + " " + body_body_item_area + " " + body_body_item_maxHeight + "/改行/"
                        }else {
                          body_body_items_kind1 += "/到達時刻/ " + body_body_item_area + " " + body_body_item_maxHeight + "/改行/"
                        }
                      }
                    }else {
                      if(body_body_item_kind === "津波予報（若干の海面変動）"){
                        if(body_body_item_firstWave_arrival !== ""){
                          body_body_items_kind4 += body_body_item_firstWave_arrival + " " + body_body_item_area + "/最大波/" + "" + "/改行/"
                        }else {
                          body_body_items_kind4 += "/到達時刻/ " + body_body_item_area + " " + "/最大波/" + "/改行/"
                        }
                      }else if(body_body_item_kind === "津波注意報"){
                        if(body_body_item_firstWave_arrival !== ""){
                          body_body_items_kind3 += body_body_item_firstWave_arrival + " " + body_body_item_area + " " + "/最大波/" + "/改行/"
                        }else {
                          body_body_items_kind3 += "/到達時刻/ " + body_body_item_area + " " + "/最大波/" + "/改行/"
                        }
                      }else if(body_body_item_kind === "津波警報"){
                        if(body_body_item_firstWave_arrival !== ""){
                          body_body_items_kind2 += body_body_item_firstWave_arrival + " " + body_body_item_area + " " + "/最大波/" + "/改行/"
                        }else {
                          body_body_items_kind2 += "/到達時刻/ " + body_body_item_area + " " + "/最大波/" + "/改行/"
                        }
                      }else if(body_body_item_kind === "大津波警報：発表"){
                        if(body_body_item_firstWave_arrival !== ""){
                          body_body_items_kind1 += body_body_item_firstWave_arrival + " " + body_body_item_area + " " + "/最大波/" + "/改行/"
                        }else {
                          body_body_items_kind1 += "/到達時刻/ " + body_body_item_area + " " + "/最大波/" + "/改行/"
                        }
                      }
		    }
              }
	      console.log(body_body_items_kind1 + "," + body_body_items_kind2 + "," + body_body_items_kind3 + "," + body_body_items_kind4)
            }
	  }
	      }
	    }
        }
            if(body_body_items_kind1 !== ""){
              body_body_items_totalKind += "<span style='text-alighn: center;'>【大津波警報】</span>\n" + body_body_items_kind1.slice(0,body_body_items_kind1.length-5)
            }
            if(body_body_items_kind2 !== ""){
              body_body_items_totalKind += "<span style='text-alighn: center;'>【津波警報】</span>\n" + body_body_items_kind2.slice(0,body_body_items_kind2.length-5)
            }
            if(body_body_items_kind3 !== ""){
              body_body_items_totalKind += "<span style='text-alighn: center;'>【津波注意報】</span>\n" + body_body_items_kind3.slice(0,body_body_items_kind3.length-5)
            }
            if(body_body_items_kind4 !== ""){
              body_body_items_totalKind += "<span style='text-alighn: center;'>【津波予報】</span>\n" + body_body_items_kind4.slice(0,body_body_items_kind4.length-5)
            }
	    let resentence = "\n"
            if(body_body_items_totalKind.includes("/到達時刻/") === true){
              body_body_items_totalKind.replace(/到達時刻/g,"")
            }
            if(body_body_items_totalKind.includes("/最大波/") === true){
              body_body_items_totalKind.replace(/最大波/g,"")
            }
            if(body_body_items_totalKind.includes("/改行/") === true){
              body_body_items_totalKind.replace(/改行/g,resentence)
            }
      }
    }
    if(data.Body.Earthquake){
      let body_body_quake = data.Body.Earthquake
      var body_body_quake_time = ""
      var body_body_quake_hypo = ""
      var body_body_quake_mag = ""
      if(!Array.isArray(body_body_quake)){
        body_body_quake = [body_body_quake]
      }
      body_body_quake_time = dateTime(body_body_quake[0].OriginTime)
      if(body_body_quake[0].Hypocenter){
        if(body_body_quake[0].Hypocenter.Area){
          body_body_quake_hypo = body_body_quake[0].Hypocenter.Area.Name
        }
      }
      if(body_body_quake[0].Magnitude){
        body_body_quake_mag = body_body_quake[0].Magnitude
      }
    }
    if(firstWave_arrival_flag === true && firstWave_maxHeight_flag === true){
      body += data.Control.PublishingOffice + "は" + body_body_quake_time + "に" + body_body_quake_hypo + "にて発生した、マグニチュード" + body_body_quake_mag + "の地震により、" + body_head_text + "\n津波到達予想地点の津波の到達時刻と最大波の情報です。\n" + body_body_items_totalKind
    }else if(firstWave_arrival_flag === true){
      body += data.Control.PublishingOffice + "は" + body_body_quake_time + "に" + body_body_quake_hypo + "にて発生した、マグニチュード" + body_body_quake_mag + "の地震により、" + body_head_text + "\n津波到達予想地点の津波の到達時刻の情報です。\n" + body_body_items_totalKind
    }else if(firstWave_maxHeight_flag === true){
      body += data.Control.PublishingOffice + "は" + body_body_quake_time + "に" + body_body_quake_hypo + "にて発生した、マグニチュード" + body_body_quake_mag + "の地震により、" + body_head_text + "\n津波到達予想地点の津波の最大波の情報です。\n" + body_body_items_totalKind
    }else {
      body += data.Control.PublishingOffice + "は" + body_body_quake_time + "に" + body_body_quake_hypo + "にて発生した、マグニチュード" + body_body_quake_mag + "の地震により、" + body_head_text + "\n津波到達予想地点の情報です。\n" + body_body_items_totalKind
    }
  }
  if(title === "津波観測に関する情報"){
    body = "津波の観測情報をお知らせいたします(" + dateTime(new Date()) + ")"
  }
  return [title,date,body]
  }
  }catch(error){
    title = "Unknown Error"
    date = "リクエスト送信時刻：" + dateTime(new Date())
    body = error.message
    return [title,date,body]
  }
}
setSerect()
