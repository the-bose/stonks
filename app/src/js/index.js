// ELECTRON CODE
const electron = require('electron')
const BrowserWindow = electron.remote.BrowserWindow

// const btn = $('#empLoginBtn');
//
// btn.addEventListener('click', function(e) {
//   let win = new BrowserWindow({
//     frame: false,
//     transparent: true,
//     alwaysOnTop: true,
//     width: 400,
//     height: 200,
//     webPreferences: {
//       nodeIntegration: true
//     }
//   })
//   win.on('closed', () => { win = null })
//   win.loadFile('src/add.html')
// })


// NON ELECTRON CODE
let usrID;
let uname;

var cAvail, cPrice, cWorth, uCount, uValue;


// COMPANY DETAILS
function loadCompanyDetails() {
  $.getJSON('files/company.json', function(data) {
    cAvail = data["availShares"];
    cPrice = data["sharePrice"];
    cWorth = cAvail * cPrice;
    $('#cAvail').html(cAvail);
    $('#cPrice').html('₹ ' + cPrice);
    $('#cWorth').html('₹ ' + cWorth);
    console.log(cAvail, cPrice, cWorth);
  });
}

// SHAREHOLDER DETAILS
function loadShrDetails() {
  $.getJSON('files/shr.json', function(data) {
    uCount = data[usrID]["shareCount"];
    uValue = uCount * cPrice;
    $('#uName').html(uname);
    $('#uCount').html(uCount);
    $('#uValue').html('₹ ' + uValue);
    console.log(uname, uCount, uValue);
  });
}

// LOAD BUY SHARES SCREEN
function loadBuyShares() {
  $('#mainBody').load('buyShares.html');
  loadCompanyDetails();
  loadShrDetails();
}

// LOGOUT
function logoutFunc() {
  console.log("logout");
  location.reload(true);
}
$('#logoutBtn').click(logoutFunc);

// BUY SHARES BUTTON
function buyShares() {
  let bShare = $('#buyShareValue').val();
  console.log("Buy Shares", bShare);

  if(parseInt(bShare) > cAvail || parseInt(bShare) < 0 || bShare == "") {
    alert("Enter valid share amount to buy!");
  } else {
    // BUYING SHARES
    alert("Share bought!");
    loadBuyShares();
  }
}
$('#buySharesBtn').click(buyShares);

window.onload = function() {

  // SHAREHOLDER LOGIN VALID
  function loginSubmit() {
    usrID = $('#usrID').val();
    uname = usrID.replace(/[0-9]/g, '');

    $.getJSON('files/shr.JSON', function (data) {
      try {
        if (data[usrID].name == uname) {
          loadBuyShares();
        } else {
          $('#warnTxt').html("Invalid Credentials");
        }
      } catch (e) {
        $('#warnTxt').html("Invalid Credentials");
      }
    });

    return false;
  }
  $('#shrLoginBtn').click(loginSubmit);

  // EMPLOYEE LOGIN
  $('#empLoginBtn').click(function() {
    alert('Module Under Progress..');
  });

}
