  /* ================= 
   APP FUNCTIONS 
  ================= */
  
  /* =================
     APP INFO POPUP 
  ================= */
function openInfo(){

  alert(
`📱 APP INFO

1. Customer Number Add Karo

2. OTP Verify Karo

3. Har Lead Par Reward Points Milenge

4. UPI Se Withdraw Kar Sakte Ho

5. Jyada Leads = Jyada Earning 😄`
  );

}
/* ================= 
   IMAGE SLIDER
================= */
  let slides = document.querySelectorAll(".slide");

let index = 0;

setInterval(()=>{

  slides[index].classList.remove("active");

  index = (index + 1) % slides.length;

  slides[index].classList.add("active");

},3000);
/* ================= 
  APP VARIABLES 
================ */
let rewardPoints = 0;

let generatedOTP = "1234";

let timeLeft = 30;

let timerInterval;
/* =================
    OTP SYSTEM 
================= */
function openEarn(){

let number = prompt("📱 Enter Customer Number");

if(!number) return;

if(number.startsWith("+91")){
    number = number.replace("+91","");
    }
    
if(!number) return;

var configuration = {
widgetId: "366545743059323634343735",
tokenAuth: "514362TgMDsByeCxf6a1c900aP1",
identifier: "+91" + number,

success: async function(data){

let check = await window.getDoc(
window.doc(window.db,"verifiedNumbers",number)
);

if(check.exists()){
alert("Number Already Verified");
return;
}
await setDoc(
doc(window.db,"verifiedNumbers",number),
{
mobile:number,
addedBy:user.mobile,
addedByName:user.name,
date:new Date().toISOString()
}
);

user.points = Number(user.points || 0) + 300;

user.totalLeads =
Number(user.totalLeads || 0) + 1;

updatePoints();

await window.updateDoc(
window.doc(window.db,"users",user.mobile),
{
points:user.points,
totalLeads:user.totalLeads
}
);

alert("✅ OTP Verified Successfully");
},
  failure:function(error){

alert("❌ OTP Verification Failed");

console.log(error);

}
};
window.initSendOTP(configuration);

}

/* =================
     OTP RESET 
================= */
function resetOTP(){

generatedOTP = "1234";

// clear input
document.getElementById("otpInput").value = "";

// show verify button
document.getElementById("verifyBtn").style.display = "block";

// hide reset button
document.getElementById("resetBtn").style.display = "none";

// restart timer
timeLeft = 30;

document.getElementById("timer").innerText =
"⏳ OTP expires in 30s";

clearInterval(timerInterval);

timerInterval = setInterval(function(){

timeLeft--;

document.getElementById("timer").innerText =
"⏳ OTP expires in " + timeLeft + "s";

if(timeLeft <= 0){

clearInterval(timerInterval);

document.getElementById("timer").innerText =
"❌ OTP Expired";

document.getElementById("verifyBtn").style.display = "none";

document.getElementById("resetBtn").style.display = "block";

}

},1000);

alert("📩 New OTP Sent Successfully");

}
  // USER DATA

  let user = {};

  // LOGIN FUNCTION

async function login(){

let mobile =
document.getElementById("mobile").value;

let pin =
document.getElementById("pin").value;

let userSnap;
try {
  
const userRef = window.doc(window.db, "users", mobile);
userSnap = await window.getDoc(userRef);

   if(userSnap.exists()){


   user = userSnap.data();
   user.mobile = mobile;
user.points = Number(user.points || 0);


   if(pin == user.pin){

        localStorage.setItem(
"currentUser",
JSON.stringify(user)
);

      document.getElementById("loginPage")
.classList.add("hidden");

document.getElementById("dashboard")
.classList.remove("hidden");

document.getElementById("topbar")
.classList.remove("hidden");

document.getElementById("sideMenu")
.classList.remove("hidden");

updatePoints();

   }else{

      alert("WRONG PIN");

   }

}else{

   alert("USER NOT FOUND");

}

} catch(error){
    console.log(error);
    alert(error.message);
}
}
   
  // UPDATE POINTS

function updatePoints(){


document.getElementById("profilePoints").innerText =
Number(user.points || 0);

document.getElementById("menuPoints").innerText =
Number(user.points || 0);

document.getElementById("profileName").innerText =
user.name;

document.getElementById("profileJoined").innerText =
user.joined || "N/A";

if((user.totalLeads || 0) >= 20){
document.getElementById("refStatus")
.innerText = "Unlocked 🔓";
}else{
document.getElementById("refStatus")
.innerText = "Locked 🔒";
}

document.getElementById("totalLeads")
.innerText = user.totalLeads || 0;

}
  // SEND OTP

  function sendOTP(){

    let number = document.getElementById("customerNumber").value;

    if(number == ""){

      alert("Enter Customer Number");

      return;

    }


    document.getElementById("otpSection").classList.remove("hidden");

  }

  // VERIFY OTP
/* ================= 
      OTP VERIFY 
================= */
 

  // SAVE UPI

  async function saveUPI(){

let upi = document.getElementById("upi").value;

user.upi = upi;

await updateDoc(
doc(window.db,"users",user.mobile),
{
upi: upi
}
);

alert("✅ UPI Added Successfully");

}

let photos =
document.querySelectorAll(".photo");

let photoIndex = 0;

setInterval(()=>{
  photos[photoIndex]
  .classList.remove("active-photo");

  photoIndex =
  (photoIndex + 1)
  % photos.length;

  photos[photoIndex]
  .classList.add("active-photo");
let slides = document.querySelectorAll(".slide");
let index = 0;

function showSlides(){

slides.forEach(slide => {
slide.classList.remove("active");
});

slides[index].classList.add("active");

index++;

if(index >= slides.length){
index = 0;
}

}

showSlides();

setInterval(showSlides,5000);
},3000);
let textSlides = document.querySelectorAll(".textSlide");

let textIndex = 0;
function showTextSlides(){

textSlides.forEach(slide => {
slide.classList.remove("active");
});

textSlides[textIndex].classList.add("active");

textIndex++;

if(textIndex >= textSlides.length){
textIndex = 0;
}

}

showTextSlides();

setInterval(showTextSlides,3000);
function loadProfile(){

document.getElementById("profileName")
.innerText = user.name

document.getElementById("profileMobile")
.innerText = user.mobile;

document.getElementById("profileUpi")
.innerText = user.upi || "Not Added";

document.getElementById("profilePoints")
.innerText = user.points;

document.getElementById("profileRefCode")
.innerText = user.refCode || "Not Generated";

if((user.totalLeads || 0) < 20){

document.getElementById("profileRefCode")
.style.display = "none";

}else{

document.getElementById("profileRefCode")
.style.display = "inline";

document.getElementById("profileRefCode")
.innerText = user.refCode;

}
document.getElementById("profileJoined")
.innerText = user.joined;


document.getElementById("totalLeads")
.innerText = user.totalLeads || 0;

if((user.totalLeads || 0) >= 20){

document.getElementById("refStatus")
.innerText = "Unlocked 🔓";

}else{

document.getElementById("refStatus")
.innerText = "Locked 🔒";

}
}
async function addUpi(){

let upi = prompt("Enter UPI ID");

if(upi == "" || upi == null){
return;
}

user.upi = upi;

await window.updateDoc(
window.doc(window.db,"users",user.mobile),
{
upi: upi
}
);

loadProfile();

alert("✅ UPI Added Successfully");

}
/* ================= 
    PROFILE PAGE
  ================= */
function openProfile(){

closeMenu();

// dashboard hide
document.getElementById("dashboard")
.classList.add("hidden");

// profile show
document.getElementById("profilePage")
.classList.remove("hidden");

// profile data load
loadProfile();

}


function backAdmin(){

document.getElementById("withdrawAdminPage")
.classList.add("hidden");

document.getElementById("adminPage")
.classList.remove("hidden");

}
function openAdminLogin(){

let pass = prompt("Enter Admin Password");

if(pass == "Danishma@780"){

document.getElementById("loginPage")
.classList.add("hidden");

document.getElementById("adminPage")
.classList.remove("hidden");

loadAdminData();

}else{

alert("Wrong Admin Password");

}

}
function openAdminPanel(){

closeMenu();

document.getElementById("dashboard")
.classList.add("hidden");

document.getElementById("adminPage")
.classList.remove("hidden");

loadAdminData();
loadTeamList();

}

function backAdminDashboard(){

document.getElementById("adminPage")
.classList.add("hidden");

document.getElementById("dashboard")
.classList.remove("hidden");

}
async function loadAdminData(){

try{

let usersSnap = await window.getDocs(
window.collection(window.db,"users")
);

let totalUsers = usersSnap.size;
let totalLeads = 0;
let totalRewards = 0;

usersSnap.forEach((doc)=>{

let data = doc.data();

totalLeads += Number(data.totalLeads || 0);
totalRewards += Number(data.points || 0);

});

document.getElementById("totalUsers").innerText = totalUsers;
document.getElementById("totalLeads").innerText = totalLeads;
document.getElementById("totalRewards").innerText = totalRewards;

loadTeamList();

}catch(error){

alert("ADMIN ERROR = " + error.message);

}

}
window.loadAdminData = loadAdminData;

async function loadTeamList(){

let usersSnap = await window.getDocs(
window.collection(window.db,"users")
);

let html = "";

usersSnap.forEach((doc)=>{

let data = doc.data();

html += `
<div style="
padding:10px;
margin:5px;
border:1px solid #ddd;
border-radius:10px;
">

<b>${data.name}</b><br>

📱 ${data.mobile}<br>

👥 Referrals:
${data.totalReferrals || 0}<br>
<br>
📢 Referral Code:
${data.refCode || "N/A"}

🔥 Leads:
${data.totalLeads || 0}<br>

💰 Points:
${data.points || 0}

</div>
`;

});
document.getElementById("teamList").innerHTML = html;
if(html === ""){
document.getElementById("teamList").innerHTML =
"No Team Members Found";
}

window.loadTeamList = loadTeamList;
console.log("loadTeamList exported");
}
/* ================= 
     SIDE MENU 
================= */
function openMenu(){

document.getElementById("sideMenu")
.classList.add("show");

}

/* ================= 
    CLOSE MENU 
================= */
function closeMenu(){

document.getElementById("sideMenu")
.classList.remove("show");

}
/* ================= 
    HELP POPUP 
  ================= */
function openHelpPopup(){

closeMenu();

document.getElementById("helpPopup")
.style.display = "flex";

}

function closeHelpPopup(){

document.getElementById("helpPopup")
.style.display = "none";

}

function openInstagram(){

window.open(
"https://instagram.com/a1mobile.official",
"_blank"
);

}

function openWhatsapp(){

window.open(
"https://wa.me/917898957751",
"_blank"
);

}

/* =================
   FOLLOW POPUP
 ================= */
function openFollowPopup(){

closeMenu();

document.getElementById("followPopup")
.style.display = "flex";

}

function closeFollowPopup(){

document.getElementById("followPopup")
.style.display = "none";

}
function openWebsite(){

window.open(
"https://a1mobile.shop",
"_blank"
);

}

function openWhatsappChannel(){

window.open(
"https://whatsapp.com/channel/",
"_blank"
);

}

function openYoutube(){

window.open(
"https://youtube.com/",
"_blank"
);

}
/* ================= SPLASH SCREEN ================= */

window.onload = function(){

setTimeout(()=>{

document.getElementById("splashScreen").style.display = "none";

document.getElementById("introScreen").style.display = "block";

},2500);

}

/* ================= INTRO SCREEN ================= */

let introIndex = 0;

let introSlides = document.querySelectorAll(".intro-slide");

function nextIntro(){

introSlides[introIndex].classList.remove("active");

introIndex++;

if(introIndex >= introSlides.length){

closeIntro();

return;

}

introSlides[introIndex].classList.add("active");

}

function closeIntro(){

document.getElementById("introScreen").style.display = "none";

document.getElementById("loginPage")
.classList.remove("hidden");

localStorage.setItem("introSeen","yes");

}
/* ================= SPLASH + INTRO ================= */

window.onload = function(){

setTimeout(()=>{

document.getElementById("splashScreen").style.display = "none";

if(localStorage.getItem("introSeen") != "yes"){

document.getElementById("introScreen").style.display = "block";

}else{

document.getElementById("loginPage")
.classList.remove("hidden");

}

},2500);

}

window.backDashboard = backDashboard;

     function backDashboard(){

document.getElementById("profilePage")
.classList.add("hidden");

document.getElementById("dashboard")
.classList.remove("hidden");

}

function showProfile(){

document.getElementById("withdrawPage")
.classList.add("hidden");

document.getElementById("profilePage")
.classList.remove("hidden");

}

function backLogin(){

document.getElementById("registerPage")
.classList.add("hidden");

document.getElementById("loginPage")
.classList.remove("hidden");

}
async function registerUser(){
let name =
document.getElementById("regName").value;

let mobile =
document.getElementById("regMobile").value;

const existingUser = await getDoc(
  doc(window.db, "users", mobile)
);

if (existingUser.exists()) {
  alert("Mobile Number Already Registered");
  return;
}

let pin =
document.getElementById("regPin").value;

let referralCode =
document.getElementById("referralCode").value
.trim()
.toUpperCase();

if(name=="" || mobile=="" || pin==""){

alert("Please Fill All Fields");

return;

}

try{
  let refCode =
name.substring(0,3).toUpperCase() +
mobile.slice(-3);

await window.setDoc(
window.doc(window.db,"users",mobile),
{
  
name:name,
mobile:mobile,
pin:pin,
upi:"",
referredBy: referralCode || "",
refCode: refCode,
refBy: "",
points:0,
totalLeads:0,
referralUnlocked:false,
joined:new Date().toLocaleDateString()
}
);

if(referralCode){

const usersSnap = await getDocs(
collection(window.db,"users")
);

usersSnap.forEach(async (userDoc)=>{

let data = userDoc.data();

if(data.refCode === referralCode){

await updateDoc(
doc(window.db,"users",userDoc.id),
{
totalReferrals: Number(data.totalReferrals || 0) + 1,
points: Number(data.points || 0) + 1000
}
);

}

});

}

alert("Account Created Successfully");

backLogin();

}
catch(error){
console.log(error);
alert(error.message);
}

}
window.openRegister = openRegister;
window.backLogin = backLogin;
window.registerUser = registerUser;
window.copyRefCode = copyRefCode;
window.openWithdraw = openWithdraw;
window.showProfile = showProfile;
window.withdrawRequest = withdrawRequest;
function copyRefCode(){

let code =
document.getElementById("profileRefCode")
.innerText;

navigator.clipboard.writeText(code)
.then(()=>{
alert("✅ Referral Code Copied");
})
.catch(()=>{
prompt("Copy Referral Code", code);
});

}

function openRegister(){
  document.getElementById("loginPage")
.classList.add("hidden");

document.getElementById("registerPage")
.classList.remove("hidden");

}
function openWithdraw(){
document.getElementById("profilePage")
.classList.add("hidden");

document.getElementById("withdrawPage")
.classList.remove("hidden");

}

async function withdrawRequest(){

let points =
Number(document.getElementById(
"withdrawPoints").value);

if(points < 1000){

alert("Minimum 1000 Points Required");

return;

}

let user = JSON.parse(
localStorage.getItem("currentUser")
);
     
if(points > Number(user.points || 0)){
alert("Insufficient Points");
return;
}

// 👇 यहीं Paste करो

let pendingCheck = await getDocs(
collection(window.db,"withdrawRequests")
);

let alreadyPending = false;

pendingCheck.forEach((doc)=>{
let data = doc.data();

if(
data.userId === user.mobile &&
data.status === "pending"
){
alreadyPending = true;
}
});
if(alreadyPending){
alert("Your withdrawal request is already pending");
return;
}


await window.setDoc(
window.doc(
window.db,
"withdrawRequests",
Date.now().toString()
),
{
userId:user.mobile,
name:user.name,
mobile:user.mobile,
points:points,
upi:user.upi || "",
status:"pending",
date:new Date().toLocaleDateString()
}
);

alert("Withdrawal Saved Successfully");

await window.updateDoc(
  window.doc(window.db, "users", user.mobile),
  {
    points: Number(user.points || 0) - points
  }
);


user.points = Number(user.points || 0) - points;
localStorage.setItem("currentUser", JSON.stringify(user));

alert("Withdrawal Request Submitted");

}

let currentFilter = "approved";

window.openWithdrawAdmin = async function(){
     
 alert("Withdraw Button Working");
     alert("Before Firebase");
  
  document.getElementById("adminPage")
.classList.add("hidden");

document.getElementById("withdrawAdminPage")
.classList.remove("hidden");

let snap = await window.getDocs(
window.collection(window.db, "withdrawRequests")
);
alert("After Firebase");
     alert("Docs Count = " + snap.size);
let html = "";

snap.forEach((doc)=>{
  let data = doc.data();
     alert(JSON.stringify(data));

if(data.status !== currentFilter){
return;
}

let requestId = doc.id;

html += `
<div>
<b>${data.name}</b><br>
${data.mobile}<br>
${data.points} Points<br>
${data.status}<br><br>

<button onclick="approveWithdraw('${requestId}')">
✅ Approve
</button>

<button onclick="rejectWithdraw('${requestId}')">
❌ Reject
</button>

<hr>
</div>
`;

});
alert("HTML = " + html);
     document.getElementById("withdrawList").style.background = "yellow";
document.getElementById("withdrawList").style.color = "black";
     
     document.getElementById("withdrawList").innerHTML = html;

}


window.approveWithdraw = async function(id){

let reqDoc = await window.getDoc(
window.doc(window.db,"withdrawRequests",id)
);

let reqData = reqDoc.data();

if(reqData.status === "approved"){
alert("Already Approved");
return;
}

let userDoc = await window.getDoc(
window.doc(window.db,"users",reqData.userId)
);

let userData = userDoc.data();

if(reqData.status === "rejected"){
await updateDoc(
doc(window.db,"users",reqData.userId),
{
points: Number(userData.points || 0) - Number(reqData.points || 0)
}
);
}

await window.updateDoc(
window.doc(window.db,"withdrawRequests",id),
{
status:"approved"
}
);

alert("Request Approved");

openWithdrawAdmin();

}
window.rejectWithdraw = async function(id){

let reqDoc = await window.getDoc(
window.doc(window.db,"withdrawRequests",id)
);

let reqData = reqDoc.data();

let userDoc = await window.getDoc(
window.doc(window.db,"users",reqData.userId)
);

let userData = userDoc.data();

     if(reqData.status === "rejected"){
alert("Already Rejected");
return;
     }

     if(reqData.status === "approved"){
alert("Already Approved");
return;
     }

await updateDoc(
doc(window.db,"users",reqData.userId),
{
points: Number(userData.points || 0) + Number(reqData.points || 0)
}
);

await updateDoc(
doc(window.db,"withdrawRequests",id),
{
status:"rejected"
}
);

alert("Request Rejected");

openWithdrawAdmin();

}

window.filterWithdraw = function(status){

currentFilter = status;

openWithdrawAdmin();

}

window.loadWithdrawalHistory = async function() {

  let historyDiv =
document.getElementById("withdrawHistoryList");

  let snapshot = await getDocs(
    collection(window.db, "withdrawRequests")
  );
  let html = "";

  snapshot.forEach((docSnap) => {

    let data = docSnap.data();
    if(
    String(data.userId) === String(user.mobile) ||
    String(data.mobile) === String(user.mobile)
){

      html += `
      <div class="card">
        <p>Points: ${data.points}</p>
        <p>Status: ${data.status}</p>
        <p>Date: ${data.date}</p>
      </div>
      `;
    }
historyDiv.innerHTML = html;
  });

  historyDiv.innerHTML = html;
}

function openHistoryPage(){

document.getElementById("profilePage")
.classList.add("hidden");

document.getElementById("historyPage")
.classList.remove("hidden");
loadWithdrawalHistory();

}

function backProfile(){

document.getElementById("historyPage")
.classList.add("hidden");

document.getElementById("profilePage")
.classList.remove("hidden");

}
window.openHistoryPage = openHistoryPage;
window.backProfile = backProfile;

function openTeamPage(){

document.getElementById("adminPage")
.classList.add("hidden");

document.getElementById("teamPage")
.classList.remove("hidden");

loadTeamList();

}

function backToAdmin(){

alert("Back Clicked");

document.getElementById("withdrawAdminPage")
.classList.add("hidden");

document.getElementById("teamPage")
.classList.add("hidden");

document.getElementById("leadDetailsPage")
.classList.add("hidden");

document.getElementById("adminPage")
.classList.remove("hidden");

}
window.backToAdmin = backToAdmin;
     
window.openTeamPage = openTeamPage;
window.backToAdmin = backToAdmin;

async function searchUsers(){

let search = document.getElementById("searchUser")
.value.toLowerCase();

let snap = await window.getDocs(
collection(window.db,"users")
);

let html = "";

snap.forEach(doc=>{

let data = doc.data();

if(
(data.name || "").toLowerCase().includes(search) ||
(data.mobile || "").toLowerCase().includes(search)
){

html += `
<div style="
padding:10px;
margin:8px 0;
border:1px solid #ddd;
border-radius:10px;
background:#fff;
">

<b>👤 ${data.name}</b><br>
📱 ${data.mobile}<br>
💰 Points: ${data.points || 0}<br>
📈 Leads: ${data.totalLeads || 0}<br><br>

<div style="
display:flex;
gap:8px;
margin-top:10px;
">

<button onclick="addPoints('${doc.id}')" style="
flex:1;
background:#28a745;
color:white;
border:none;
padding:10px;
border-radius:8px;
">
➕ Add
</button>

<button onclick="removePoints('${doc.id}')" style="
flex:1;
background:#dc3545;
color:white;
border:none;
padding:10px;
border-radius:8px;
">
➖ Remove
</button>

<button onclick="viewUser('${doc.id}')" style="
flex:1;
background:#007bff;
color:white;
border:none;
padding:10px;
border-radius:8px;
">
👁 Details
</button>

</div>

</div>
`;

}

});

document.getElementById("searchResults").innerHTML = html;

     if(html !== ""){
   document.getElementById("searchResults").style.display = "block";
}else{
   document.getElementById("searchResults").style.display = "none";
     }

}
async function addPoints(userId){

let points = prompt("Kitne Points Add Karne Hai?");

if(!points) return;
  alert("Before History Save");
     
alert("Update Start");
     
await window.updateDoc(
window.doc(window.db,"users",userId),
{
points: Number(points)
}
);

try{
 await window.addDoc(
   collection(window.db,"pointsHistory"),
   {
     userId:userId,
     points:Number(points),
     action:"Add",
     date:new Date().getTime()
   }
 );

 alert("After History Save");
 alert("Points Removed Successfully");

 searchUsers();

}catch(error){
 console.log(error);
 alert(error.message);
}
}

window.searchUsers = searchUsers;
window.addPoints = addPoints;  
     
async function removePoints(userId){

let points = prompt("Kitne Points Remove Karne Hai?");
if(!points) return;

let userDoc = await window.getDoc(
window.doc(window.db,"users",userId)
);

let currentPoints = userDoc.data().points || 0;

let newPoints = currentPoints - Number(points);

if(newPoints < 0){
   newPoints = 0;
}

await window.updateDoc(
window.doc(window.db,"users",userId),
{
   points:newPoints
}
);

try{

   await window.addDoc(
      collection(window.db,"pointsHistory"),
      {
         userId:userId,
         points:Number(points),
         action:"Remove",
         date:new Date().getTime()
      }
   );

   alert("Points Removed Successfully");
   searchUsers();

}catch(error){

   console.log(error);
   alert(error.message);

}
}
window.removePoints = removePoints;     
async function viewUser(userId){

let userDoc = await window.getDoc(
window.doc(window.db,"users",userId)
);

let data = userDoc.data();
  alert(
"Name: " + (data.name || "") +
"\nMobile: " + (data.mobile || "") +
"\nPoints: " + (data.points || 0) +
"\nLeads: " + (data.totalLeads || 0) +
"\nUPI: " + (data.upi || "Not Added") +
"\nReferral Code: " + (data.refCode || "")
);

}

window.viewUser = viewUser;


     async function openPointsHistoryPage(){

document.getElementById("adminPage")
.classList.add("hidden");

document.getElementById("pointsHistoryPage")
.classList.remove("hidden");

let snap = await window.getDocs(
collection(window.db,"pointsHistory")
);

let html = "";

snap.forEach(doc=>{

let data = doc.data();

html += `
<div style="
padding:10px;
margin:8px 0;
border:1px solid #ddd;
border-radius:10px;
background:#fff;
">

👤 User ID: ${data.userId}<br>
💰 Points: ${data.points}<br>
📌 Action: ${data.action}<br>
📅 ${new Date(data.date).toLocaleString()}

</div>
`;
});

document.getElementById("historyList").innerHTML = html;

}

function backHistory(){

document.getElementById("pointsHistoryPage")
.classList.add("hidden");

document.getElementById("adminPage")
.classList.remove("hidden");

}

window.backHistory = backHistory;
window.openPointsHistoryPage = openPointsHistoryPage;     

     
async function openLeadDetails(){

document.getElementById("adminPage")
.classList.add("hidden");

document.getElementById("leadDetailsPage")
.classList.remove("hidden");

let snap = await window.getDocs(
collection(window.db,"verifiedNumbers")
);

let html = "";

snap.forEach((doc)=>{

let data = doc.data();

html += `
<div style="
padding:10px;
margin:5px;
border:1px solid #ddd;
border-radius:10px;
">
📱 ${data.mobile}<br>
👤 ${data.addedByName || "Old Lead"}<br>
📅 ${new Date(data.date).toLocaleString()}

</div>
`;

});

document.getElementById("leadDetailsList").innerHTML = html;

}

function backAdminFromLead(){

document.getElementById("leadDetailsPage")
.classList.add("hidden");

document.getElementById("adminPage")
.classList.remove("hidden");

}

window.openLeadDetails = openLeadDetails;
window.backAdminFromLead = backAdminFromLead;
