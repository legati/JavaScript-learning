var myHeading = document.querySelector('H1');
myHeading.textContent = 'Hello, World!';


var currentdate = new Date();
var datetime = currentdate.getDate() + "/"+ (currentdate.getMonth() + 1) + "/" 
+ currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" 
+ currentdate.getMinutes() + ":" + currentdate.getSeconds();
document.write(datetime + '\n' + Math.random());

/*
var myImage = document.querySelector('img');
myImage.onclick = function() {
    var mySrc = myImage.getAttribute('src');
    var oldSrc = 'images/firefox-icon.png';
    var newSrc = 'images/firefoxa-icon.png'; 
    if (mySrc === oldSrc) {
        myImage.setAttribute('src', newSrc);
    } else {
        myImage.setAttribute('src', oldSrc); 
    };
};
*/

var myButton = document.querySelector('button');
function setUserName() {
    var myName = prompt("Please enter you name:");
    localStorage.setItem('name', myName);
    myHeading.textConent = "Greetings, " + myName;
    window.location.reload();
};

var storedName = localStorage.getItem('name');
if (!storedName) {
    setUserName();
} else {
    myHeading.textContent =  "Greetings, " + storedName;
};

myButton.onclick = function() {
    setUserName();
};
