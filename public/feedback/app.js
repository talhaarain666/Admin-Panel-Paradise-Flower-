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
const dbRef = ref(db, "FeedBackForm");



var ordersData = [];

window.renderFbForm = function () {
    var ordersList = document.getElementById("ordersList");
    ordersList.innerHTML = "";

    ordersData.forEach(function (ev) {
        ordersList.innerHTML += ` <div class="p-3 bg-white rounded shadow">
        <div class="py-1">
            <h5><i class="fas fa-user pe-2"></i> ${ev.fullName}</h5>
        </div>
        <div class="py-1">
            <h5><i class="fas fa-envelope pe-2"></i> ${ev.email}</h5>
        </div>
        <div class="py-1">
            <h5><i class="fas fa-comments"></i> ${ev.feedback}</h5>
        </div>
        <div class="py-1 text-end">

            <button onclick="deletefbMsg('${ev.id}')" class="p-2"><i class="fas fa-trash"></i></button>

        </div>
    </div>`;



    });
}

window.deletefbMsg = function (elemId) {
    remove(ref(db, "FeedBackForm/" + elemId ), {

    });
}



onValue(
    dbRef,
    function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            ordersData.push(childSnapshot.val());
            renderFbForm();
            // ...
        });
    },
    {
        onlyOnce: false,
    }
);
