auth.onAuthStateChanged(user => {
  if (!user) window.location.href = "index.html";
  else listFiles();
});

function uploadFile() {
  const file = document.getElementById("fileInput").files[0];
  if (!file) return alert("Select a file first!");

  const userId = auth.currentUser.uid;
  const storageRef = storage.ref(`${userId}/${file.name}`);

  storageRef.put(file).then(() => {
    db.collection("users").doc(userId).collection("files").add({
      name: file.name,
      uploadedAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => listFiles());
  }).catch(err => alert("Upload failed: " + err.message));
}

function listFiles() {
  const userId = auth.currentUser.uid;
  const list = document.getElementById("fileList");
  list.innerHTML = "";
  db.collection("users").doc(userId).collection("files")
    .orderBy("uploadedAt", "desc")
    .get().then(snapshot => {
      snapshot.forEach(doc => {
        const li = document.createElement("li");
        const fileName = doc.data().name;
        const storageRef = storage.ref(`${userId}/${fileName}`);
        storageRef.getDownloadURL().then(url => {
          li.innerHTML = `
            <a href="${url}" target="_blank">${fileName}</a>
            <button onclick="deleteFile('${doc.id}', '${fileName}')">Delete</button>`;
          list.appendChild(li);
        });
      });
    });
}

function deleteFile(docId, fileName) {
  const userId = auth.currentUser.uid;
  storage.ref(`${userId}/${fileName}`).delete().then(() => {
    db.collection("users").doc(userId).collection("files").doc(docId).delete().then(() => {
      listFiles();
    });
  }).catch(err => alert("Delete failed: " + err.message));
}

function logout() {
  auth.signOut().then(() => window.location.href = "index.html");
}
