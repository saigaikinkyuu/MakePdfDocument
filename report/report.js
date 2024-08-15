// ↓ここから初期実行
function first(){
  function date(num){
    let month = new Date().getMonth()+num
    if(month === 0){
      month = 12
    }
    return new Date().getFullYear() + "年" + month + "月"
  }
  function lastDate(num){
    let month = new Date().getMonth()+num
    let date = 0
    if(month === 0){
      month = 12
    }
    if(month <= 7){
      if((month % 2) === 0){
        date = 31
      }else {
        date = 30
      }
    }else {
      if((month % 2) !== 0){
        date = 31
      }else {
        date = 30
      }
    }
    return date
  }
  function month(num){
    let month = new Date().getMonth()+num
    if(month === 0){
      month = 12
    }
    return month + "月"
  }
  document.getElementById("head_first").textContent = date(1) +  + new Date().getDate() + "日 " + new Date().getHours() + "時　発行"
  document.getElementById("ttl_memo").value = date(0) + "1日から同年" + date(0) + lastDate(0) + "日までの地震解説"
  document.getElementById("tableMemo01").value = "月別地震発生回数及びEEW発表回数は、" + month(0) + "月中に発表されたものであり、" + month(-1) + "・" + month(1) + "月に発表されたものに関しては含んでいません。\nまた、第一報の発表回数で、報数をすべて含んだ数ではありません。"
  document.getElementById("table_month_01").value = month(0)
  document.getElementById("table_month_02").value = month(0)
}

first()
// ↑ここまで

function content(){
  var title = document.getElementById("ttl").value
  document.getElementById("head_last").innerHTML = title + " [" + new Date().getFullYear() + "/" + ("0" + (new Date().getMonth()+1)).slice(-2) + "/" + ("0" + new Date().getDate()).slice(-2) + " 版]"
  document.getElementById("title").innerHTML = title + "<br> (" + new Date().getFullYear() + "." + (new Date().getMonth()+1) + "." + new Date().getDate() + ")"
  var num = document.getElementById("serect").value
  if(num === "1"){
    document.getElementById("content0").style.display = "block"
    document.getElementById("content1").style.display = "none"
    document.getElementById("content2").style.display = "none"
    document.getElementById("number01").textContent = "1/1"
  }else if(num === "2"){
    document.getElementById("content0").style.display = "block"
    document.getElementById("content1").style.display = "block"
    document.getElementById("content2").style.display = "none"
    document.getElementById("number01").textContent = "1/2"
    document.getElementById("number02").textContent = "2/2"
  }else if(num === "3"){
    document.getElementById("content0").style.display = "block"
    document.getElementById("content1").style.display = "block"
    document.getElementById("content2").style.display = "block"
    document.getElementById("number01").textContent = "1/3"
    document.getElementById("number02").textContent = "2/3"
    document.getElementById("number03").textContent = "3/3"
  }
}
