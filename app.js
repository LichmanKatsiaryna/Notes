const inputTitle = document.querySelector(".inputTitle");
const inputContent = document.querySelector(".inputContent");
const setOfItems = document.querySelector(".setOfItems");


window.onload = loadOfDatas;

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
    btnForNote.id = "one";
    const testDel = document.createElement("i");
    testDel.className = "fa-solid fa-trash";
    let nameBtn = note.title;
    btnForNote.innerHTML = nameBtn;
    btnForNote.appendChild(testDel);
    setOfItems.appendChild(btnForNote);
    btnForNote.onclick = function() {hello(note)};
    testDel.onclick = function() {testTest(note)}
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

function testTest(note){
    db.notes.delete(note.id)
    .then(location.reload());
}
