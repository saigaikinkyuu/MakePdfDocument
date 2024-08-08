const select = document.getElementById('serect')
  select.addEventListener('change', (e) => {
    document.getElementById("example").style.display = "none"
    //コピーするテキストを取得
    let getTxt = e.target.value;
 
    //取得したテキストをクリップボードに書き込み
    navigator.clipboard.writeText(getTxt);
  });
