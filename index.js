/*document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("button").addEventListener("click", () => {
    const content = document.querySelector("#content");
    const opt = {
      margin:       0,
      filename:     new Date().getFullYear() + "" + ("0" + (new Date().getMonth()+1)).slice(-2) + "" + ("0" + new Date().getDate()).slice(-2) + "" + ("0" + new Date().getHours()).slice(-2) + "" + ("0" + new Date().getMinutes()).slice(-2) + "" + ("0" + new Date().getSeconds()).slice(-2) + '.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(content).set(opt).save();
  });
});
*/
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("button").addEventListener("click", () => {
        const content = document.querySelector("#content");
        
        // デフォルトのファイル名を作成
        let defaultFilename = new Date().getFullYear() + "" + 
            ("0" + (new Date().getMonth()+1)).slice(-2) + "" + 
            ("0" + new Date().getDate()).slice(-2) + "" + 
            ("0" + new Date().getHours()).slice(-2) + "" + 
            ("0" + new Date().getMinutes()).slice(-2) + "" + 
            ("0" + new Date().getSeconds()).slice(-2);
        
        // ユーザーにファイル名を入力させる（デフォルト値を指定）
        let filename = prompt("保存するファイル名を入力してください (拡張子不要):", defaultFilename);
        if (filename) {
            filename = filename + '.pdf';
        } else {
            filename = defaultFilename + '.pdf';
        }

        const opt = {
            margin:       0,
            filename:     filename,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().from(content).set(opt).save();
    });
});
