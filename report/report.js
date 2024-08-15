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
      if((month % 2) !== 0){
        date = 31
      }else {
        date = 30
      }
    }else {
      if((month % 2) === 0){
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

// ↓グローバル関数↓
const imageInput1 = document.getElementById('imageInput01');
const previewImage1 = document.getElementById('imageDisplay01');
const imageInput2 = document.getElementById('imageInput02');
const previewImage2 = document.getElementById('imageDisplay02');
const imageInput3 = document.getElementById('imageInput03');
const previewImage3 = document.getElementById('imageDisplay03');
const imageInput4 = document.getElementById('imageInput04');
const previewImage4 = document.getElementById('imageDisplay04');
// ↑ここまで↑
imageInput1.addEventListener('change', function(event) {
  const file = event.target.files[0];

  // 画像ファイルでない場合の処理
  if (!file.type.match('image.*')) {
    alert('画像ファイルを選択してください');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    previewImage1.src = e.target.result;
  };
  reader.readAsDataURL(file);
  document.getElementById("Img02").style.display = "block"
  imageInput1.style.display = "none"
  previewImage1.style.display = "block"
});
imageInput2.addEventListener('change', function(event) {
  const file = event.target.files[0];

  // 画像ファイルでない場合の処理
  if (!file.type.match('image.*')) {
    alert('画像ファイルを選択してください');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    previewImage2.src = e.target.result;
  };
  reader.readAsDataURL(file);
  document.getElementById("Img03").style.display = "block"
  imageInput2.style.display = "none"
  previewImage2.style.display = "block"
});
imageInput3.addEventListener('change', function(event) {
  const file = event.target.files[0];

  // 画像ファイルでない場合の処理
  if (!file.type.match('image.*')) {
    alert('画像ファイルを選択してください');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    previewImage3.src = e.target.result;
  };
  reader.readAsDataURL(file);
  document.getElementById("Img04").style.display = "block"
  imageInput3.style.display = "none"
  previewImage3.style.display = "block"
});
imageInput4.addEventListener('change', function(event) {
  const file = event.target.files[0];

  // 画像ファイルでない場合の処理
  if (!file.type.match('image.*')) {
    alert('画像ファイルを選択してください');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    previewImage4.src = e.target.result;
  };
  reader.readAsDataURL(file);
  imageInput4.style.display = "none"
  previewImage4.style.display = "block"
});

// ↓画像のキャセル関数
function delatePicuture(num) {
  if(num === "1"){
    imageInput1.style.display = "block"
    previewImage1.style.display = "none"
    previewImage1.src = ""
    imageInput1.value = ""
    document.getElementById("Img02").style.display = "none"
    document.getElementById("Img03").style.display = "none"
    document.getElementById("Img04").style.display = "none"
  }else if(num === "2"){
    imageInput2.style.display = "block"
    previewImage2.style.display = "none"
    previewImage2.src = ""
    imageInput2.value = ""
    document.getElementById("Img03").style.display = "none"
    document.getElementById("Img04").style.display = "none"
  }else if(num === "3"){
    imageInput3.style.display = "block"
    previewImage3.style.display = "none"
    previewImage3.src = ""
    imageInput3.value = ""
    document.getElementById("Img04").style.display = "none"
  }else if(num === "4"){
    imageInput4.style.display = "block"
    previewImage4.style.display = "none"
    previewImage4.src = ""
    imageInput4.value = ""
  }
}
// ↑ここまで

// ↓ここから確定ボタンの動作
function submit(num){
  if(num === 0){
    document.getElementById("submit_button").setAttribute("onclick","submit(1)")
    document.getElementById("content0").style.border = "1px dashed white"
    document.getElementById("content1").style.border = "1px dashed white"
    document.getElementById("content2").style.border = "1px dashed white"
    document.getElementById("tableMemo01_p").innerText = document.getElementById("tableMemo01").value
    document.getElementById("memo0_p").innerText = document.getElementById("memo0").value
    document.getElementById("memo1_p").innerText = document.getElementById("memo1").value
    document.getElementById("tableMemo01_p").style.display = "block"
    document.getElementById("tableMemo01").style.display = "none"
    document.getElementById("memo0_p").style.display = "block"
    document.getElementById("memo0").style.display = "none"
    document.getElementById("memo1_p").style.display = "block"
      document.getElementById("memo1").style.display = "none"
    if(document.getElementById("memo1").value === ""){
      document.getElementById("memo1").style.display = "none"
    }
    if(document.getElementById("imageMemo1").value === ""){
      document.getElementById("Img01").style.display = "none"
    }
    if(document.getElementById("imageMemo2").value === ""){
      document.getElementById("Img02").style.display = "none"
    }
    if(document.getElementById("imageMemo3").value === ""){
      document.getElementById("Img03").style.display = "none"
    }
    if(document.getElementById("imageMemo4").value === ""){
      document.getElementById("Img04").style.display = "none"
    }
  }else {
    document.getElementById("submit_button").setAttribute("onclick","submit(0)")
    document.getElementById("content0").style.border = "1px dashed black"
    document.getElementById("content1").style.border = "1px dashed black"
    document.getElementById("content2").style.border = "1px dashed black"
    document.getElementById("memo1").style.display = "block"
    document.getElementById("tableMemo01_p").style.display = "none"
    document.getElementById("tableMemo01").style.display = "block"
    document.getElementById("memo0_p").style.display = "none"
    document.getElementById("memo0").style.display = "block"
    document.getElementById("memo1_p").style.display = "none"
      document.getElementById("memo1").style.display = "block"
    if(document.getElementById("imageMemo1").value === ""){
      document.getElementById("Img01").style.display = "block"
    }else if(document.getElementById("imageMemo2").value === ""){
      document.getElementById("Img02").style.display = "block"
    }else if(document.getElementById("imageMemo3").value === ""){
      document.getElementById("Img03").style.display = "block"
    }else if(document.getElementById("imageMemo4").value === ""){
      document.getElementById("Img04").style.display = "block"
    }
  }
}
// ↑ここまで
