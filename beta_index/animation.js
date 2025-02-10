document.getElementById("display_cont_list").addEventListener("mouseover", (event) => {
  const height_1 = document.getElementById('display_cont_list').clientHeight
  const height_2 = document.getElementById('edit_hover').clientHeight
  document.getElementById('edit_hover').style.padding = ((height_1 - height_2) / 2) + "px 0px " + ((height_1 - height_2) / 2) + "px 0px"
  document.getElementById("display_cont_list").style.display = "none"
  document.getElementById("edit_hover").style.display = "block"
});

document.getElementById("display_cont_list").addEventListener("mouseout", (event) => {
  document.getElementById("display_cont_list").style.display = "block"
  document.getElementById("edit_hover").style.display = "none"
});
