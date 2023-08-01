// Using enviroment variables to save data from being published online
import dotenv from "dotenv";
dotenv.config();

import QRCode from "qrcode";
import md5 from "md5";
import dateM from "./datetime";

const JWT_SECRET = process.env.JWT_SECRET as string;
const ADDRESS_SECRET = process.env.ADDRESS_SECRET as string;

var datetime;

async function generateQR() {

  datetime = dateM();
  console.log(datetime);

  // Crating a salt from bcrypt
  var sURI = md5(datetime+ADDRESS_SECRET);
  const securedURI = sURI.replaceAll("/", "slash");

  const uri = "http://192.168.29.73:9000/api/scan/" + securedURI;
  console.log(uri);
  const imageQR = QRCode.toDataURL(uri, function (err: any, url: string) {
    return url;
  });
  const QR = {imageQR, uri};
  return QR;
}

function qrt() {

  //firing the initial case when qrt is called
  generateQR();

  //setting the interval
  let seconds = new Date().getSeconds() * 1000;
  let waitingTime = seconds<=30000?30000-seconds:60000-seconds;

  setTimeout(
    ()=> { 
      generateQR();
      setInterval(generateQR, 30000)
    }
  , waitingTime);
}
export default qrt;
