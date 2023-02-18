import React from "react";
import styles from "./NotesGallery.module.css";
import NoteCard from "./NoteCard/NoteCard";

/*
    NotesGallery component
    Displays a gallery of notes

    props: {
        notes: [
            {
                _id: string,
                amount: number,
                method: string,
                image: string,
                status: string,
                account: {
                    _id: string,
                    username: string,
                    email: string,
                    role: string,
                }
            }
        ]
    }
*/

const NotesGallery = ({ notes }) => {
    return (
        <div className={styles.container}>
            {notes.map((note) => (
                <NoteCard note={note} key={note._id} />
            ))}
        </div>
    );
}

export default NotesGallery;