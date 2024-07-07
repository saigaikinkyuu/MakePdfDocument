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
        console.log(field1)
        if(field1 !== ""){
          console.log(data)
          for(var s = 0;s<data.length;s++){
            console.log(Number(date(data[s].at)))
            if(Number(date(data[s].at)) === Number(field1)){
              document.getElementById("content" + s).style.display = "block"
              s = data.length
              settingField(s,n)
            }
          }
        }
        if(field2 !== ""){
          for(var s = 0;s<data.length;s++){
            if(Number(date(data[s].at)) === Number(field2)){
              document.getElementById("content" + s).style.display = "block"
              s = data.length
              settingField(s,n)
            }
          }
        }
        if(field3 !== ""){
          for(var s = 0;s<data.length;s++){
            if(Number(date(data[s].at)) === Number(field3)){
              document.getElementById("content" + s).style.display = "block"
              s = data.length
              settingField(s,n)
            }
          }
        }
        if(field4 !== ""){
          for(var s = 0;s<data.length;s++){
            if(Number(date(data[s].at)) === Number(field4)){
              document.getElementById("content" + s).style.display = "block"
              s = data.length
              settingField(s,n)
            }
          }
        }
    })
}
