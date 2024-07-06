$.getJSON("https://www.jma.go.jp/bosai/quake/data/list.json", function (data) {
  $.getJSON("https://www.jma.go.jp/bosai/quake/data/" + data[0].json, function (areaData) { 
	function date(time){
	  const year = new Date(time).getFullYear()
	  const month = ("0" + new Date(time).getMonth()).slice(-2)
	  const date = ("0" + new Date(time).getDate()).slice(-2)
	  const hour = ("0" + new Date(time).getHours()).slice(-2)
	  const minute = ("0" + new Date(time).getMinutes()).slice(-2)
	  const normalDate = year + "年" + month + "月" + date + "日 " + hour + "時" + minute + "分"
	  return normalDate
	}
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
            dateRP = date(body.ReportDateTime)
          }
          if(head.Headline){
            if(head.Headline.Text){
              coment1 = head.Headline.Text
            }
          }
          if(body.Earthquake){
            if(body.Earthquake.OriginTime){
              dateQuake = head.Headline.OriginTime
            }
            if(body.Earthquake.Magnitude){
              mg = head.Headline.Magnitude
            }
            if(body.Earthquake.Hypocenter){
              if(body.Earthquake.Hypocenter.Area){
                if(body.Earthquake.Hypocenter.Area.Name){
                  hypo = body.Earthquake.Hypocenter.Area.Name
                }
                if(body.Earthquake.Hypocenter.Area.Coordinate){
                  depth = ((body.Earthquake.Hypocenter.Area.Coordinate).substr((body.Earthquake.Hypocenter.Area.Coordinate).indexOf('-') + 1)).substr(0, ((body.Earthquake.Hypocenter.Area.Coordinate).substr((body.Earthquake.Hypocenter.Area.Coordinate).indexOf('-') + 1)).indexOf('/')) + "㎞";
                }
              }
            }
          }
          if(body.Intensity){
            if(body.Intensity.Observation){
              if(body.Intensity.Observation.MaxInt){
                if(body.Intensity.Observation.MaxInt === "1"){
                  let maxi = body.Intensity.Observation.MaxInt
                }else if(body.Intensity.Observation.MaxInt === "2"){
                  let maxi = body.Intensity.Observation.MaxInt
                }else if(body.Intensity.Observation.MaxInt === "3"){
                  let maxi = body.Intensity.Observation.MaxInt
                }else if(body.Intensity.Observation.MaxInt === "4"){
                  let maxi = body.Intensity.Observation.MaxInt
                }else if(body.Intensity.Observation.MaxInt === "5-"){
                  let maxi = "5弱"
                }else if(body.Intensity.Observation.MaxInt === "5+"){
                  let maxi = "5強"
                }else if(body.Intensity.Observation.MaxInt === "6-"){
                  let maxi = "6弱"
                }else if(body.Intensity.Observation.MaxInt === "6+"){
                  let maxi = "6強"
                }else if(body.Intensity.Observation.MaxInt === "7"){
                  let maxi = body.Intensity.Observation.MaxInt
                }
              }
              if(body.Intensity.Observation.Pref){
                let prefs = body.Intensity.Observation.Pref
                let int1 = ""
                let int2 = ""
                let int3 = ""
                let int4 = ""
                let int5 = ""
                let int6 = ""
                let int7 = ""
                let int8 = ""
                let int9 = ""
                for(var i = 0;i>prefs.length;i++){
                  let cities = prefs[i].Area
                  for(var c = 0;c>cities.length;c++){
                    if(cities[c].MaxInt === "1"){
                      int1 += cities[c].Name + " "
                    }else if(cities[c].MaxInt === "2"){
                      int2 += cities[c].Name + " "
                    }else if(cities[c].MaxInt === "3"){
                      int3 += cities[c].Name + " "
                    }else if(cities[c].MaxInt === "4"){
                      int4 += cities[c].Name + " "
                    }else if(cities[c].MaxInt === "5-"){
                      int5 += cities[c].Name + " "
                    }else if(cities[c].MaxInt === "5+"){
                      int6 += cities[c].Name + " "
                    }else if(cities[c].MaxInt === "6-"){
                      int7 += cities[c].Name + " "
                    }else if(cities[c].MaxInt === "6+"){
                      int8 += cities[c].Name + " "
                    }else if(cities[c].MaxInt === "7"){
                      int9 += cities[c].Name + " "
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
          let intArea
          let maxiArea
          if(int9 !== ""){
            intArea += "震度7を観測した地域は、" + int9
          }else if(int8 !== ""){
            intArea += "震度6強を観測した地域は、" + int8
          }else if(int7 !== ""){
            intArea += "震度6弱を観測した地域は、" + int7
          }else if(int6 !== ""){
            intArea += "震度5強を観測した地域は、" + int6
          }else if(int5 !== ""){
            intArea += "震度75弱を観測した地域は、" + int5
          }else if(int4 !== ""){
            intArea += "震度4を観測した地域は、" + int4
          }else if(int3 !== ""){
            intArea += "震度3を観測した地域は、" + int3
          }else if(int2 !== ""){
            intArea += "震度2を観測した地域は、" + int2
          }else if(int1 !== ""){
            intArea += "震度1を観測した地域は、" + int1
          }
          if(maxi === "1"){
            maxiArea = int1
          }else if(maxi === "2"){
            maxiArea = int2
          }else if(maxi === "3"){
            maxiArea = int3
          }else if(maxi === "4"){
            maxiArea = int4
          }else if(maxi === "5弱"){
            maxiArea = int5
          }else if(maxi === "5強"){
            maxiArea = int6
          }else if(maxi === "6弱"){
            maxiArea = int7
          }else if(maxi === "6強"){
            maxiArea = int8
          }else if(maxi === "7"){
            maxiArea = int9
          }
          document.getEleentById("title").innerHTML = control.Title
          document.getEleentById("date").innerHTML = dateRP + "発行"
          if(hypo !== "調査中" && maxi !== "調査中"){
            document.getEleentById("body").innerHTML = dateQuake + "ころ、" + hypo + "を震源とする、最大震度" + maxi + "の地震がありました。最大震度" + maxi + "を観測した地域は、" + maxiArea + "となっています。地震の規模を示すマグニチュードは、" + mg + "震源の深さは、" + depth + "です。" + coment2 + "各地の震度です。" + intArea
          }else if(hypo !== "調査中"){
            document.getEleentById("body").innerHTML = dateQuake + "ころ、最大震度" + maxi + "の地震がありました。最大震度" + maxi + "を観測した地域は、" + maxiArea + "となっています。地震の規模を示すマグニチュードは、" + mg + "震源の深さは、" + depth + "です。" + coment2 + "各地の震度です。" + intArea
          }else if(maxi !== "調査中"){
            document.getEleentById("body").innerHTML = dateQuake + "ころ、" + hypo + "を震源とする、地震がありました。地震の規模を示すマグニチュードは、" + mg + "震源の深さは、" + depth + "です。" + coment2 + "各地の震度です。" + intArea
          }else {
            document.getEleentById("body").innerHTML = "入電情報がありません。"
          }
        }else if(head.Title === "震度速報"){
          let intArea
          let maxiArea
          if(int9 !== ""){
            intArea += "震度7を観測した地域は、" + int9
          }else if(int8 !== ""){
            intArea += "震度6強を観測した地域は、" + int8
          }else if(int7 !== ""){
            intArea += "震度6弱を観測した地域は、" + int7
          }else if(int6 !== ""){
            intArea += "震度5強を観測した地域は、" + int6
          }else if(int5 !== ""){
            intArea += "震度75弱を観測した地域は、" + int5
          }else if(int4 !== ""){
            intArea += "震度4を観測した地域は、" + int4
          }else if(int3 !== ""){
            intArea += "震度3を観測した地域は、" + int3
          }else if(int2 !== ""){
            intArea += "震度2を観測した地域は、" + int2
          }else if(int1 !== ""){
            intArea += "震度1を観測した地域は、" + int1
          }
          if(maxi === "1"){
            maxiArea = int1
          }else if(maxi === "2"){
            maxiArea = int2
          }else if(maxi === "3"){
            maxiArea = int3
          }else if(maxi === "4"){
            maxiArea = int4
          }else if(maxi === "5弱"){
            maxiArea = int5
          }else if(maxi === "5強"){
            maxiArea = int6
          }else if(maxi === "6弱"){
            maxiArea = int7
          }else if(maxi === "6強"){
            maxiArea = int8
          }else if(maxi === "7"){
            maxiArea = int9
          }
          document.getEleentById("title").innerHTML = control.Title
          document.getEleentById("date").innerHTML = dateRP + "発行"
          document.getEleentById("body").innerHTML = dateQuake + "ころ、最大震度" + maxi + "を観測する地震がありました。最大震度" + maxi + "を観測した地域は、" + maxiArea + "となっています。マグニチュード・震源の深さは現在調査中です。" + coment2 + "各地の震度です。" + intArea
        }else if(head.Title === "震源速報"){
          let intArea
          let maxiArea
          if(int9 !== ""){
            intArea += "震度7を観測した地域は、" + int9
          }else if(int8 !== ""){
            intArea += "震度6強を観測した地域は、" + int8
          }else if(int7 !== ""){
            intArea += "震度6弱を観測した地域は、" + int7
          }else if(int6 !== ""){
            intArea += "震度5強を観測した地域は、" + int6
          }else if(int5 !== ""){
            intArea += "震度75弱を観測した地域は、" + int5
          }else if(int4 !== ""){
            intArea += "震度4を観測した地域は、" + int4
          }else if(int3 !== ""){
            intArea += "震度3を観測した地域は、" + int3
          }else if(int2 !== ""){
            intArea += "震度2を観測した地域は、" + int2
          }else if(int1 !== ""){
            intArea += "震度1を観測した地域は、" + int1
          }
          if(maxi === "1"){
            maxiArea = int1
          }else if(maxi === "2"){
            maxiArea = int2
          }else if(maxi === "3"){
            maxiArea = int3
          }else if(maxi === "4"){
            maxiArea = int4
          }else if(maxi === "5弱"){
            maxiArea = int5
          }else if(maxi === "5強"){
            maxiArea = int6
          }else if(maxi === "6弱"){
            maxiArea = int7
          }else if(maxi === "6強"){
            maxiArea = int8
          }else if(maxi === "7"){
            maxiArea = int9
          }
          document.getEleentById("title").innerHTML = control.Title
          document.getEleentById("date").innerHTML = dateRP + "発行"
          document.getEleentById("body").innerHTML = dateQuake + "ころ、" + hypo + "を震源とする、地震がありました。地震の規模を示すマグニチュードは、" + mg + "震源の深さは、" + depth + "です。" + coment2
          }else if(head.Title === "遠地地震に関する情報"){
          document.getEleentById("title").innerHTML = head.Title
          document.getEleentById("date").innerHTML = dateRP + "発行"
          if(dateQuake !== "調査中"){
            document.getEleentById("body").innerHTML = dateQuake + "ころ、海外" + hypo + "を震源とする、地震がありました。地震の規模を示すマグニチュードは、" + mg + "です。" + coment2
          }else if(dateQuake === "調査中"){
            document.getEleentById("body").innerHTML = coment1 + "震源地は、" + hypo + "を震源とする、地震がありました。地震の規模を示すマグニチュードは、" + mg + "です。" + coment2
          }else {
            document.getEleentById("body").innerHTML = "入電情報なし"
          }
        }
        }
      }
    }
  })
})
