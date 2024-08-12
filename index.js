document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("button").addEventListener("click", () => {
    let pathname = location.pathname
    pathname = pathname.replace(/[/ ]/g,"")
    pathname = pathname.replace("MakePdfDocument","")
    const content = document.querySelector("#content");
    const opt = {
      margin:       0,
      filename:     "[" + pathname + "]" + new Date().getFullYear() + "" + ("0" + (new Date().getMonth()+1)).slice(-2) + "" + ("0" + new Date().getDate()).slice(-2) + "" + ("0" + new Date().getHours()).slice(-2) + "" + ("0" + new Date().getMinutes()).slice(-2) + "" + ("0" + new Date().getSeconds()).slice(-2) + '.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(content).set(opt).save();
  });
});
