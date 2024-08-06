// Fetch APIを使用した例
fetch("https://www.data.jma.go.jp/developer/xml/feed/extra.xml")
    .then(response => response.text())
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    .then(xmlDoc => {
        const entries = xmlDoc.getElementsByTagName("entry");
        for (let i = 0; i < entries.length; i++) {
          if(entries[i].getElementsByTagName("title") && entries[i].getElementsByTagName("updated") && entries[i].getElementsByTagName("id") && entries[i].getElementsByTagName("author").getElementsByTagName("name") && entries[i].getElementsByTagName("link") && entries[i].getElementsByTagName("content")){
            //
          }
        }
    })
    .catch(error => {
        console.error("Failed to load XML file:", error);
    });

