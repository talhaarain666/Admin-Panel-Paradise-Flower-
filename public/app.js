// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-analytics.js";
import { getDatabase, ref, onValue, remove } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBOLfCd9sx92zaFcXNX4lJ3IAFaQ3JKxc8",
    authDomain: "flowersweb-498cf.firebaseapp.com",
    projectId: "flowersweb-498cf",
    storageBucket: "flowersweb-498cf.appspot.com",
    messagingSenderId: "782773943101",
    appId: "1:782773943101:web:dbb6a2930aed81a2732354",
    measurementId: "G-SSNLKXTYX4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();
const dbRef = ref(db, "ContactForm");



// ================================================ MY WORK ===============================================

var ordersData = [];

window.renderAll = function () {
    var ordersList = document.getElementById("ordersList");
    ordersList.innerHTML = "";

    ordersData.forEach(function (e) {
        ordersList.innerHTML += ` <div class="p-3 bg-white rounded shadow my-2">
        <div class="py-1">
            <h5><i class="fas fa-user pe-2"></i> ${e.fullName}</h5>
        </div>
        <div class="py-1">
            <h5><i class="fas fa-phone-alt pe-2"></i> ${e.phoneNumber}</h5>
        </div>
        <div class="py-1">
            <h5><i class="fas fa-envelope pe-2"></i> ${e.UserMessage}</h5>
        </div>
        <div class="py-1">
            <div class="row">
                <div class="col-9">
                    <h5><i class="fas fa-images pe-2"></i> ${e.pic}</h5>
                </div>
                <div class="col-3 text-end">
                    <button onclick="deleteOrderchk('${e.id}')" class="p-2"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        </div>
    </div>`;



    });
}

window.deleteOrderchk = function (elemId) {
    remove(ref(db, "ContactForm/" + elemId ), {

    });
}



onValue(
    dbRef,
    function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            ordersData.push(childSnapshot.val());
            renderAll();
            // ...
        });
    },
    {
        onlyOnce: false,
    }
);
