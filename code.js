const notesContainer = document.getElementById("app");
const addNodeButton = notesContainer.querySelector(".add-note");

getNotes().forEach(note => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNodeButton);
});

addNodeButton.addEventListener("click", () => addNote());

function getNotes(){
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function saveNotes(notes){
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNoteElement(id, content){
    const element = document.createElement("textarea");

    element.classList.add("note");
    element.value = content;
    element.placeholder = "Empty Sticky Note";

    element.addEventListener("change", () => {
        updateNotes(id, element.value);
    });

    element.addEventListener("dblclick", () => {
        const doDelete = confirm("Do you want to delete?");

        if(doDelete){
            deleteNotes(id, element);
        }
    });

    return element;
}

function addNote(){
    const notes = getNotes();
    const noteObject = {
        id : Math.floor(Math.random() * 100000),
        content:""
    };

    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNodeButton);

    notes.push(noteObject);
    saveNotes(notes);
}

function updateNotes(id, newContent){
    const notes = getNotes();
    const targetNote = notes.filter(note => note.id == id)[0];

    targetNote.content = newContent;
    saveNotes(notes);
}

function deleteNotes(id, element){
    const notes = getNotes().filter(note => note.id != id);

    saveNotes(notes);
    notesContainer.removeChild(element);
}