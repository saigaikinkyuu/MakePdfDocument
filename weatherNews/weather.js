var idArray = []
function date(time){
  const year = new Date(time).getFullYear()
  const month = ("0" + (new Date(time).getMonth()+1)).slice(-2)
  const date = ("0" + new Date(time).getDate()).slice(-2)
  const hour = ("0" + new Date(time).getHours()).slice(-2)
  const minute = ("0" + new Date(time).getMinutes()).slice(-2)
  const normalDate = year + "年" + month + "月" + date + "日 " + hour + "時" + minute + "分"
  return normalDate
}
function setSerect(){
  fetch("https://www.data.jma.go.jp/developer/xml/feed/extra.xml")
    .then(response => response.text())
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    .then(xmlDoc => {
        const entries = xmlDoc.getElementsByTagName("entry");
        let dataContent = ""
        for (let i = 0; i < entries.length; i++) {
          if(entries[i].getElementsByTagName("title") && entries[i].getElementsByTagName("updated") && entries[i].getElementsByTagName("id") && entries[i].getElementsByTagName("author").getElementsByTagName("name") && entries[i].getElementsByTagName("link") && entries[i].getElementsByTagName("content")){
            document.getElementById('serect').innerHTML = ""
            dataContent += "<option value='" + entries[i].getElementsByTagName("id").textContent + "'>" + "[" + entries[i].getElementsByTagName("title").textContent + "]" + date(entries[i].getElementsByTagName("updated").textContent) + "(" + entries[i].getElementsByTagName("author").getElementsByTagName("name").textContent + ")"
            idArray.push(entries[i].getElementsByTagName("id").textContent)
          }
        }
        document.getElementById('serect').innerHTML = dataContent
    })
    .catch(error => {
        console.error("Failed to load XML file:", error);
    });
}

function content(){
    let field1 = document.getELementById("field1").value
    let field2 = document.getELementById("field2").value
    let field3 = document.getELementById("field3").value
    let field4 = document.getELementById("field4").value
    if(field1 !== "" && idArray.includes(field1) === true){
	//
    }
}
function dataGet(url){
  fetch(url)
    .then(response => response.text())
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    .then(xmlDoc => {
	var title = ""
	var date = ""
	var body = ""
	title = xmlDoc.getElementsByTagName("Head").getElementsByTagName("Title").textContent
	date = date(xmlDoc.getElementsByTagName("Head").getElementsByTagName("ReportDateTime").textContent) + "発表"
	var area = ""
	var warnings = xmlDoc.getElementsByTagName("Body").getElementsByTagName("Warning")
	var items = warnings[0].getElementsByTagName("Item")
	return [title,date,body]
    })
}
