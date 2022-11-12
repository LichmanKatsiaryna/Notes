const inputTitle = document.querySelector(".inputTitle");
const inputContent = document.querySelector(".inputContent");
const setOfItems = document.querySelector(".setOfItems");

var db = new Dexie("DataBaseNotes");
db.version(1).stores({
    notes:`
    id,
    title,
    content`
});

function saveNote(){
    let title = inputTitle.value;
    let content = inputContent.value;
    let id = `ID-${title.slice(0,5)}-${content.slice(0,5)}`;
    db.notes.bulkPut([
        { id: id, title: title, content: content }
    ]).then(location.reload());
}

function createNote(note){
    const btnForNote = document.createElement("button");
    btnForNote.className = "one";
    let nameBtn = note.title;
    btnForNote.innerHTML = nameBtn;
    setOfItems.appendChild(btnForNote);
    btnForNote.onclick = function() {hello(note)};
}

function hello(note){
    inputTitle.value = note.title;
    inputContent.value = note.content;
}

function loadOfDatas(){
    db.notes.each(note => {
        createNote(note);
    })
}

window.onload = loadOfDatas;

function deleteBtn(){
    Dexie.delete("DataBaseNotes");
}

function createNewNote(){
    inputTitle.value = "";
    inputContent.value = "";
}