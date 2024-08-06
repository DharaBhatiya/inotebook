import React, { useContext } from "react";
import NoteContex from "./noteContext";
import { useState } from "react";
import { json } from "react-router-dom";

const NoteState = (props) => {
   const host = "http://localhost:5000";
   const notesInitial = [];
const [notes, setNotes] = useState(notesInitial);


  // get all Note
  const getNotes = async () => {
   try{
   const response = await fetch(`${host}/api/notes/fetchallnotes`, {
     method: "GET",
     headers: {
       "Content-Type": "application/json",
       "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4NmJiZDBhM2NhYTM1MzM1ZTNkOGI0In0sImlhdCI6MTcyMDEwODI4MH0.5ZGxMPCDSyBeAW3UDfi0QTTUjj9MDzpgHa-5l7DaQKo"
     },
   });
   const json = await response.json();
   // console.log(json)
   // setNotes(json)
   console.log("Fetched notes:", json);
    if (Array.isArray(json)) {
      setNotes(json);
    } else {
      console.error("Fetched data is not an array", json);
      setNotes([]);
    }
}catch (error) {
   console.error("Failed to fetch notes", error);
   setNotes([]); // Set to an empty array on error
 }
 };

  // Add a Note
  const addNote = async (title, description, tag) => {
    // const newNote = { _id: Date.now(), title, description, tag };
    // setNotes([...notes, newNote]);
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4NmJiZDBhM2NhYTM1MzM1ZTNkOGI0In0sImlhdCI6MTcyMDEwODI4MH0.5ZGxMPCDSyBeAW3UDfi0QTTUjj9MDzpgHa-5l7DaQKo"
      },
      body: JSON.stringify({title, description,tag}),
    });
    console.log(json)

   //  console.log("Adding a new note");
   //  const note = {
   //    _id: "66844428852c1903871e75cc6",
   //    user: "6682acee15a4f6260642e726",
   //    title: title,
   //    description: "Please acces the playlist",
   //    tag: "YouTube",
   //    date: "2024-07-02T18:17:12.999+00:00",
   //    __v: "0",
   //  };
    const note = await response.json();
    const notes= json;
    setNotes(notes.concat(note));
  };

  // const addNote = (note) => {
  //    const newNote = { ...note, _id: Date.now() };
  //    setNotes([...notes, newNote]);
  //  };

//   // Delete a Note
//   const deleteNote = (id) => {
//    //  console.log("Deleting the note with id" + id);
//     const newNotes = notes.filter((note) => {
//       return note._id !== id;
//     });
//     setNotes(newNotes);
//   };

 const deleteNote = async (id) => {
    try {
      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4NmJiZDBhM2NhYTM1MzM1ZTNkOGI0In0sImlhdCI6MTcyMDEwODI4MH0.5ZGxMPCDSyBeAW3UDfi0QTTUjj9MDzpgHa-5l7DaQKo"
        },
      });
      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
    } catch (error) {
      console.error("Failed to delete note", error);
    }
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4NmJiZDBhM2NhYTM1MzM1ZTNkOGI0In0sImlhdCI6MTcyMDEwODI4MH0.5ZGxMPCDSyBeAW3UDfi0QTTUjj9MDzpgHa-5l7DaQKo"
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json();

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  //    // Add a Note
  //   const addNote = (note) => {
  //    const newNote = { ...note, _id: Date.now() };
  //    setNotes([...notes, newNote]);
  //  };

  //  // Delete a Note
  //  const deleteNote = (id) => {
  //    setNotes(notes.filter(note => note._id !== id));
  //  };

  //  // Edit a Note
  //  const editNote = (id, updatedNote) => {
  //    setNotes(notes.map(note => (note._id === id ? { ...note, ...updatedNote } : note)));
  //  };

  return (
    <NoteContex.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContex.Provider>
  );
};

export default NoteState;
