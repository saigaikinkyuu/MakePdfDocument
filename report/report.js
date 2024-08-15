// ↓ここから初期実行
function first(){
  function toFullWidthNumber(str) {
    return str.replace(/[0-9]/g, (s) => {
      return String.fromCharCode(s.charCodeAt(0) + 65248);
    });
  }
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
  var title = document.getElementById("ttl").value
  document.getElementById("head_first").textContent = date(1) +  + new Date().getDate() + "日 " + toFullWidthNumber(new Date().getHours()) + "時　発行"
  document.getElementById("head_last").textContent = title
  document.getElementById("ttl_memo").textContent = date(0) + "1日から同年" + date(0) + lastDate(0) + "日までの地震解説"
  document.getElementById("tableMemo01").value = "月別地震発生回数及びEEW発表回数は、" + month(0) + "月中に発表されたものであり、" + month(-1) + "・" + month(1) + "月に発表されたものに関しては含んでいません。\nまた、第一報の発表回数で、報数をすべて含んだ数ではありません。"
  document.getElementById("table_month_01").value = month(0)
  document.getElementById("table_month_02").value = month(0)
}
// ↑ここまで

function content(){
  var num = document.getElementById("select").value
  if(num === "1"){
    document.getElementById("content0").style.display = "block"
    document.getElementById("content1").style.display = "none"
    document.getElementById("content2").style.display = "none"
    document.getElementById("number01").style.display = "1/1"
  }else if(num === "2"){
    document.getElementById("content0").style.display = "block"
    document.getElementById("content1").style.display = "block"
    document.getElementById("content2").style.display = "none"
    document.getElementById("number01").style.display = "1/2"
    document.getElementById("number02").style.display = "2/2"
  }else if(num === "3"){
    document.getElementById("content0").style.display = "block"
    document.getElementById("content1").style.display = "block"
    document.getElementById("content2").style.display = "block"
    document.getElementById("number01").style.display = "1/3"
    document.getElementById("number02").style.display = "2/3"
    document.getElementById("number03").style.display = "3/3"
  }
}
