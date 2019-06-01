
export  const normalTime=(time)=>{
  if(time){
    var dateee = new Date(time);
    var newDate = new Date(+new Date(dateee)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'') 
    return newDate
  }
    
}

export const normalMoney=(money)=>{
  if(money){
    return (money/100).toFixed(2)
  }else{
    return 0
  }
}
export const formatSeconds = (a) => {
  var hh = parseInt(a / 3600);
  if (hh < 10) hh = "0" + hh;
  var mm = parseInt((a - hh * 3600) / 60);
  if (mm < 10) mm = "0" + mm;
  var ss = parseInt((a - hh * 3600) % 60);
  if (ss < 10) ss = "0" + ss;
  var length = hh + ":" + mm + ":" + ss;
  if (a > 0) {
    return length;
  } else {
    return "00:00:00";
  }
}
export default {
  normalTime,
  normalMoney,
  formatSeconds
}