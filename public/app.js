// firebase auth
const auth = firebase.auth();

const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');

const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');

const userDetails = document.getElementById('userDetails');

const provider = new firebase.auth.GoogleAuthProvider();

// sign in event
signInBtn.onclick = () => auth.signInWithPopup(provider);

// sign out event
signOutBtn.onclick = () => auth.signOut();

// auth state changed
auth.onAuthStateChanged(user => {
  if (user) {
    // signed in
    whenSignedIn.hidden = false;
    whenSignedOut.hidden = true;
    userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3> <p>User ID: ${user.uid}</p>`;
  } else {
    // signed out
    whenSignedIn.hidden = true;
    whenSignedOut.hidden = false;
    userDetails.innerHTML = '';
  }
});

// Firestore
const db = firebase.firestore();

