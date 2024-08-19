export const changeNumber = (hours, minutes, seconds) => {
  console.log(seconds);
  const block = document.getElementById("test");
  const blockBTM = document.getElementById("test-btm");
  //console.log(block);
  block.classList.add("change");
  blockBTM.classList.add("change");

  block.ontransitionend = (event) => {
    console.log("fired");
    block.classList.remove("change");
    blockBTM.classList.remove("change");
  };

  //const numberTimer = setTimeout(() => {
  // block.classList.remove("change");
  //blockBTM.classList.remove("change");
  // clearTimeout(numberTimer);
  //}, 950);

  //clearTimeout(numberTimer);
};
