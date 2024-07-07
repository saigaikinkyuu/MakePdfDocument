function date(time){
  let year = new Date(time).getFullYear()
  let month = ("0" + (new Date(time).getMonth()+1)).slice(-2)
  let date = ("0" + new Date(time).getDate()).slice(-2)
  let hour = ("0" + new Date(time).getHours()).slice(-2)
  let minute = ("0" + new Date(time).getMinutes()).slice(-2)
  return year + month + date + hour + minute
}
function searchQuake(){
  let field1 = document.getElementById("field1").value
  let field2 = document.getElementById("field2").value
  let field3 = document.getElementById("field3").value
  let field4 = document.getElementById("field4").value
    $.getJSON("https://www.jma.go.jp/bosai/quake/data/list.json", function (data) {
        if(field1 !== ""){
          for(var s = 0;s<data.length;s++){
            let kindN
            if(data[s].ttl == "震度速報"){
              kindN = "01"
            }else if(data[s].ttl == "震源に関する情報"){
              kindN = "02"
            }else if(data[s].ttl == "震源・震度情報"){
              kindN = "03"
            }else if(data[s].ttl == "遠地地震に関する情報"){
              kindN = "04"
            }else {
              kindN = "05"
            }
            console.log(Number(date(data[s].ctt) + kindN) + "," + Number(field1))
            if(Number(date(data[s].ctt) + kindN) === Number(field1)){
              document.getElementById("content0").style.display = "block"
              let dataN = s
              s = data.length
              settingField(dataN,0)
            }
          }
        }
        if(field2 !== ""){
          for(var s = 0;s<data.length;s++){
            let kindN
            if(data[s].ttl == "震度速報"){
              kindN = "01"
            }else if(data[s].ttl == "震源に関する情報"){
              kindN = "02"
            }else if(data[s].ttl == "震源・震度情報"){
              kindN = "03"
            }else if(data[s].ttl == "遠地地震に関する情報"){
              kindN = "04"
            }else {
              kindN = "05"
            }
            if(Number(date(data[s].ctt) + kindN) === Number(field2)){
              document.getElementById("content1").style.display = "block"
              let dataN = s
              s = data.length
              settingField(dataN,1)
            }
          }
        }
        if(field3 !== ""){
          for(var s = 0;s<data.length;s++){
            let kindN
            if(data[s].ttl == "震度速報"){
              kindN = "01"
            }else if(data[s].ttl == "震源に関する情報"){
              kindN = "02"
            }else if(data[s].ttl == "震源・震度情報"){
              kindN = "03"
            }else if(data[s].ttl == "遠地地震に関する情報"){
              kindN = "04"
            }else {
              kindN = "05"
            }
            if(Number(date(data[s].ctt) + kindN) === Number(field3)){
              document.getElementById("content2").style.display = "block"
              let dataN = s
              s = data.length
              settingField(dataN,2)
            }
          }
        }
        if(field4 !== ""){
          for(var s = 0;s<data.length;s++){
            let kindN
            if(data[s].ttl == "震度速報"){
              kindN = "01"
            }else if(data[s].ttl == "震源に関する情報"){
              kindN = "02"
            }else if(data[s].ttl == "震源・震度情報"){
              kindN = "03"
            }else if(data[s].ttl == "遠地地震に関する情報"){
              kindN = "04"
            }else {
              kindN = "05"
            }
            if(Number(date(data[s].ctt) + kindN) === Number(field4)){
              document.getElementById("content3").style.display = "block"
              let dataN = s
              s = data.length
              settingField(dataN,3)
            }
          }
        }
    })
}
