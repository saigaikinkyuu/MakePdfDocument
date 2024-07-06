document.querySelector("#button").addEventListener("click", () => {
  const content = document.querySelector("#content");
  const filename = "sample.pdf";
  html2pdf(content).save(filename);
});
