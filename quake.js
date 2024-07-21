function settingField(n,s){
$.getJSON("https://www.jma.go.jp/bosai/quake/data/list.json", function (data) {
  $.getJSON("https://www.jma.go.jp/bosai/quake/data/" + data[n].json, function (areaData) { 
	function date(time){
	  const year = new Date(time).getFullYear()
	  const month = ("0" + (new Date(time).getMonth()+1)).slice(-2)
	  const date = ("0" + new Date(time).getDate()).slice(-2)
	  const hour = ("0" + new Date(time).getHours()).slice(-2)
	  const minute = ("0" + new Date(time).getMinutes()).slice(-2)
	  const normalDate = year + "年" + month + "月" + date + "日 " + hour + "時" + minute + "分"
	  return normalDate
	}
    let dataContent = ""
    let kindN = ""
    for(var b = 0;b<data.length;b++){
      if(data[b].ttl == "震度速報"){
	kindN = "01"
      }else if(data[b].ttl == "震源に関する情報"){
	kindN = "02"
      }else if(data[b].ttl == "震源・震度情報"){
	kindN = "03"
      }else if(data[b].ttl == "遠地地震に関する情報"){
	kindN = "04"
      }else {
	kindN = "05"
      }
      document.getElementById('serect').innerHTML = ""
      dataContent += "<option value='" + (data[b].ctt).substring(0, 12) + kindN + "'>" + "[" + data[b].ttl + "]" + date(data[b].at) + "(" + data[b].anm + ")"
    }
    document.getElementById('serect').innerHTML = dataContent
    if(areaData.Control && areaData.Head && areaData.Body){
      let control = areaData.Control
      let head = areaData.Head
      let body = areaData.Body
      let dateRP = "調査中"
      let dateQuake = "調査中"
      let mg = "調査中"
      let maxi = "調査中"
      let depth = "調査中"
      let hypo = "調査中"
      let coment1 = "調査中"
      let coment2 = "調査中"
      if(control.Title){
          if(control.EditorialOffice){
            rpOffice = control.EditorialOffice
          }
          if(head.ReportDateTime){
            dateRP = date(head.ReportDateTime)
          }
          if(head.Headline){
            if(head.Headline.Text){
              coment1 = head.Headline.Text
            }
          }
          if(body.Earthquake){
            if(body.Earthquake.OriginTime){
              dateQuake = date(body.Earthquake.OriginTime)
            }
            if(body.Earthquake.Magnitude){
              mg = body.Earthquake.Magnitude
            }
            if(body.Earthquake.Hypocenter){
              if(body.Earthquake.Hypocenter.Area){
                if(body.Earthquake.Hypocenter.Area.Name){
                  hypo = body.Earthquake.Hypocenter.Area.Name
                }
                if(body.Earthquake.Hypocenter.Area.Coordinate){
                  depth = (((body.Earthquake.Hypocenter.Area.Coordinate).substr((body.Earthquake.Hypocenter.Area.Coordinate).indexOf('-') + 1)).substr(0, ((body.Earthquake.Hypocenter.Area.Coordinate).substr((body.Earthquake.Hypocenter.Area.Coordinate).indexOf('-') + 1)).indexOf('/')))/1000 + "㎞";
                }
              }
            }
          }
          if(body.Intensity){
            if(body.Intensity.Observation){
              if(body.Intensity.Observation.MaxInt){
                if(body.Intensity.Observation.MaxInt === "1"){
                  maxi = body.Intensity.Observation.MaxInt
                }else if(body.Intensity.Observation.MaxInt === "2"){
                  maxi = body.Intensity.Observation.MaxInt
                }else if(body.Intensity.Observation.MaxInt === "3"){
                  maxi = body.Intensity.Observation.MaxInt
                }else if(body.Intensity.Observation.MaxInt === "4"){
                  maxi = body.Intensity.Observation.MaxInt
                }else if(body.Intensity.Observation.MaxInt === "5-"){
                  maxi = "5弱"
                }else if(body.Intensity.Observation.MaxInt === "5+"){
                  maxi = "5強"
                }else if(body.Intensity.Observation.MaxInt === "6-"){
                  maxi = "6弱"
                }else if(body.Intensity.Observation.MaxInt === "6+"){
                  maxi = "6強"
                }else if(body.Intensity.Observation.MaxInt === "7"){
                  maxi = body.Intensity.Observation.MaxInt
                }
              }
              if(body.Intensity.Observation.Pref){
                let prefs = body.Intensity.Observation.Pref
                var int1 = ""
                var int2 = ""
                var int3 = ""
                var int4 = ""
                var int5 = ""
                var int6 = ""
                var int7 = ""
                var int8 = ""
                var int9 = ""
                for(var i = 0;i<prefs.length;i++){
                  let cities = prefs[i].Area
                  for(var c = 0;c<cities.length;c++){
                    if(cities[c].MaxInt === "1"){
                      int1 += cities[c].Name + ","
                    }else if(cities[c].MaxInt === "2"){
                      int2 += cities[c].Name + ","
                    }else if(cities[c].MaxInt === "3"){
                      int3 += cities[c].Name + ","
                    }else if(cities[c].MaxInt === "4"){
                      int4 += cities[c].Name + ","
                    }else if(cities[c].MaxInt === "5-"){
                      int5 += cities[c].Name + ","
                    }else if(cities[c].MaxInt === "5+"){
                      int6 += cities[c].Name + ","
                    }else if(cities[c].MaxInt === "6-"){
                      int7 += cities[c].Name + ","
                    }else if(cities[c].MaxInt === "6+"){
                      int8 += cities[c].Name + ","
                    }else if(cities[c].MaxInt === "7"){
                      int9 += cities[c].Name + ","
                    }
                  }
                }
              }
            }
          }
          if(body.Comments){
            if(body.Comments.ForecastComment){
              if(body.Comments.ForecastComment.Text){
                coment2 = body.Comments.ForecastComment.Text
              }
            }
          }
          if(control.Title){
          if(head.Title === "震源・震度情報"){
          let intArea = ""
          let maxiArea
          if(int9 !== ""){
            intArea += "震度7を観測した地域は、" + int9.substring(0, ((int9.length)-1)) + "。"
          }
	  if(int8 !== ""){
            intArea += "震度6強を観測した地域は、" + int8.substring(0, ((int8.length)-1)) + "。"
          }
	  if(int7 !== ""){
            intArea += "震度6弱を観測した地域は、" + int7.substring(0, ((int7.length)-1)) + "。"
          }
	  if(int6 !== ""){
            intArea += "震度5強を観測した地域は、" + int6.substring(0, ((int6.length)-1)) + "。"
          }
	  if(int5 !== ""){
            intArea += "震度75弱を観測した地域は、" + int5.substring(0, ((int5.length)-1)) + "。"
          }
	  if(int4 !== ""){
            intArea += "震度4を観測した地域は、" + int4.substring(0, ((int4.length)-1)) + "。"
          }
	  if(int3 !== ""){
            intArea += "震度3を観測した地域は、" + int3.substring(0, ((int3.length)-1)) + "。"
          }
	  if(int2 !== ""){
            intArea += "震度2を観測した地域は、" + int2.substring(0, ((int2.length)-1)) + "。"
          }
	  if(int1 !== ""){
            intArea += "震度1を観測した地域は、" + int1.substring(0, ((int1.length)-1)) + "。"
          }
          if(maxi === "1"){
            maxiArea = int1.substring(0, ((int1.length)-1))
          }else if(maxi === "2"){
            maxiArea = int2.substring(0, ((int2.length)-1))
          }else if(maxi === "3"){
            maxiArea = int3.substring(0, ((int3.length)-1))
          }else if(maxi === "4"){
            maxiArea = int4.substring(0, ((int4.length)-1))
          }else if(maxi === "5弱"){
            maxiArea = int5.substring(0, ((int5.length)-1))
          }else if(maxi === "5強"){
            maxiArea = int6.substring(0, ((int6.length)-1))
          }else if(maxi === "6弱"){
            maxiArea = int7.substring(0, ((int7.length)-1))
          }else if(maxi === "6強"){
            maxiArea = int8.substring(0, ((int8.length)-1))
          }else if(maxi === "7"){
            maxiArea = int9.substring(0, ((int9.length)-1))
          }
          document.getElementById("title" + s).innerHTML = control.Title
          document.getElementById("date" + s).innerHTML = dateRP + "発行"
          if(hypo !== "調査中" && maxi !== "調査中"){
            document.getElementById("body" + s).innerHTML = dateQuake + "ころ、" + hypo + "を震源とする、最大震度" + maxi + "の地震がありました。<br>最大震度" + maxi + "を観測した地域は、" + maxiArea + "となっています。<br>地震の規模を示すマグニチュードは、" + mg + "、震源の深さは、" + depth + "です。<br>" + coment2 + "<br>各地の震度です。" + intArea
          }else if(hypo !== "調査中"){
            document.getElementById("body" + s).innerHTML = dateQuake + "ころ、最大震度" + maxi + "の地震がありました。<br>最大震度" + maxi + "を観測した地域は、" + maxiArea + "となっています。<br>地震の規模を示すマグニチュードは、" + mg + "震源の深さは、" + depth + "です。<br>" + coment2 + "<br>各地の震度です。" + intArea
          }else if(maxi !== "調査中"){
            document.getElementById("body" + s).innerHTML = dateQuake + "ころ、" + hypo + "を震源とする、地震がありました。<br>地震の規模を示すマグニチュードは、" + mg + "震源の深さは、" + depth + "です。<br>" + coment2 + "<br>各地の震度です。" + intArea
          }else {
            document.getElementById("body" + s).innerHTML = "入電情報がありません。"
          }
        }else if(head.Title === "震度速報"){
          let intArea = ""
          let maxiArea
          if(int9 !== ""){
            intArea += "震度7を観測した地域は、" + int9.substring(0, ((int9.length)-1)) + "。"
          }
	  if(int8 !== ""){
            intArea += "震度6強を観測した地域は、" + int8.substring(0, ((int8.length)-1)) + "。"
          }
	  if(int7 !== ""){
            intArea += "震度6弱を観測した地域は、" + int7.substring(0, ((int7.length)-1)) + "。"
          }
	  if(int6 !== ""){
            intArea += "震度5強を観測した地域は、" + int6.substring(0, ((int6.length)-1)) + "。"
          }
	  if(int5 !== ""){
            intArea += "震度75弱を観測した地域は、" + int5.substring(0, ((int5.length)-1)) + "。"
          }
	  if(int4 !== ""){
            intArea += "震度4を観測した地域は、" + int4.substring(0, ((int4.length)-1)) + "。"
          }
	  if(int3 !== ""){
            intArea += "震度3を観測した地域は、" + int3.substring(0, ((int3.length)-1)) + "。"
          }
	  if(int2 !== ""){
            intArea += "震度2を観測した地域は、" + int2.substring(0, ((int2.length)-1)) + "。"
          }
	  if(int1 !== ""){
            intArea += "震度1を観測した地域は、" + int1.substring(0, ((int1.length)-1)) + "。"
          }
          if(maxi === "1"){
            maxiArea = int1.substring(0, ((int1.length)-1))
          }else if(maxi === "2"){
            maxiArea = int2.substring(0, ((int2.length)-1))
          }else if(maxi === "3"){
            maxiArea = int3.substring(0, ((int3.length)-1))
          }else if(maxi === "4"){
            maxiArea = int4.substring(0, ((int4.length)-1))
          }else if(maxi === "5弱"){
            maxiArea = int5.substring(0, ((int5.length)-1))
          }else if(maxi === "5強"){
            maxiArea = int6.substring(0, ((int6.length)-1))
          }else if(maxi === "6弱"){
            maxiArea = int7.substring(0, ((int7.length)-1))
          }else if(maxi === "6強"){
            maxiArea = int8.substring(0, ((int8.length)-1))
          }else if(maxi === "7"){
            maxiArea = int9.substring(0, ((int9.length)-1))
          }
	  if(head.TargetDateTime){
            dateQuake = date(head.TargetDateTime)
	  }
          document.getElementById("title" + s).innerHTML = control.Title
          document.getElementById("date" + s).innerHTML = dateRP + "発行"
          document.getElementById("body" + s).innerHTML = dateQuake + "ころ、最大震度" + maxi + "を観測する地震がありました。<br>最大震度" + maxi + "を観測した地域は、" + maxiArea + "となっています。<br>マグニチュード・震源の深さは現在調査中です。<br>" + coment2 + "<br>各地の震度です。" + intArea
        }else if(head.Title === "震源に関する情報"){
          let intArea = ""
          let maxiArea
          document.getElementById("title" + s).innerHTML = control.Title
          document.getElementById("date" + s).innerHTML = dateRP + "発行"
          document.getElementById("body" + s).innerHTML = dateQuake + "ころ、" + hypo + "を震源とする、地震がありました。<br>地震の規模を示すマグニチュードは、" + mg + "、震源の深さは、" + depth + "です。<br>" + coment2
          }else if(head.Title === "遠地地震に関する情報"){
          document.getElementById("title" + s).innerHTML = head.Title
          document.getElementById("date" + s).innerHTML = dateRP + "発行"
          if(dateQuake !== "調査中"){
            document.getElementById("body" + s).innerHTML = dateQuake + "ころ、海外" + hypo + "を震源とする、地震がありました。<br>地震の規模を示すマグニチュードは、" + mg + "です。<br>" + coment2
          }else if(dateQuake === "調査中"){
            document.getElementById("body" + s).innerHTML = coment1 + "震源地は、" + hypo + "を震源とする、地震がありました。<br>地震の規模を示すマグニチュードは、" + mg + "です。<br>" + coment2
          }else {
            document.getElementById("body" + s).innerHTML = "入電情報なし"
          }
        }
        }
      }
    }
  })
})
return "sccessfull"
}

settingField(0,0)
