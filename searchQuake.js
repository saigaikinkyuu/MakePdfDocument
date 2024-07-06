function searchQuake(){
  let field1 = document.getElementById("field1").textContent
  let field2 = document.getElementById("field2").textContent
  let field3 = document.getElementById("field3").textContent
  let field4 = document.getElementById("field4").textContent
  for(var n = 0;n<4;n++){
    $.getJSON("https://www.jma.go.jp/bosai/quake/data/list.json", function (data) {
      function date(time){
        let year = new Date(time).getFullYear()
        let month = ("0" + new Date(time).getMonth()).slice(-2)
        let date = ("0" + new Date(time).getDate()).slice(-2)
        let hour = ("0" + new Date(time).getHours()).slice(-2)
        let minute = ("0" + new Date(time).getMinutes()).slice(-2)
        return year + month + date + hour + minute
      }
      if(n === 0){
        if(field1 !== ""){
          for(var s = 0;s<data.length;s++){
            if(date(data[s].at) === date(field1)){
              settingQuake(s,n)
              s = data.length
            }
          }
        }
      }else if(n === 1){
        if(field2 !== ""){
          for(var s = 0;s<data.length;s++){
            if(date(data[s].at) === date(field2)){
              settingQuake(s,n)
              s = data.length
            }
          }
        }
      }else if(n === 2){
        if(field3 !== ""){
          for(var s = 0;s<data.length;s++){
            if(date(data[s].at) === date(field3)){
              settingQuake(s,n)
              s = data.length
            }
          }
        }
      }else if(n === 3){
        if(field4 !== ""){
          for(var s = 0;s<data.length;s++){
            if(date(data[s].at) === date(field4)){
              settingQuake(s,n)
              s = data.length
            }
          }
        }
      }
    })
  }
}
