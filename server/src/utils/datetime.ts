function datetime(){
  let  currentdate = new Date();

  let seconds = currentdate.getSeconds();
  

  if(seconds<30) seconds = 0;
  else seconds = 30;

  let datetime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    seconds;

    return datetime;
}

export default datetime;