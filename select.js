const select = document.getElementById('serect')
  select.addEventListener('change', (e) => {
  //コピーするテキストを取得
  let getTxt = e.target.value;
 
  //取得したテキストをクリップボードに書き込み
  navigator.clipboard.writeText(getTxt);
  });
