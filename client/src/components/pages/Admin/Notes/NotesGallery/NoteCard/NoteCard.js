import React from "react";
import styles from "./NoteCard.module.css";
import { useUpdateNoteMutation } from "../../../../../../feature/services/note";
import Button from '../../../../../common/Button/Button';
import { useHistory } from "react-router-dom";
import ModalImage from "react-modal-image";

/*
    NoteCard component
    Displays a single note
    
    props: {
        note: {
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
    }
*/

const NoteCard = ({ note }) => {
    const [updateNote] = useUpdateNoteMutation();
    const history = useHistory();

    return (
        <>
            <div className={styles.container}>
                <div className={styles.first__row}>
                <ModalImage
                            small={`http://localhost:8000/file/notes/${note.image}`}
                            large={`http://localhost:8000/file/notes/${note.image}`}
                            alt="Hello World!"
                        />
                    <div className={styles.details}>
                        <p>{note.createdAt.replace(/T|Z|\.\d{3}/g, ' ').trim()}</p>
                        <p>ID: {note.noteNo}</p>
                        <p>status: {note.status}</p>
                        <p>Amount: {note.amount}</p>
                        <p>Method: {note.method}</p>
                    </div>
                    
                </div>
               
                    <div className={styles.actions}>
                        <Button
                            label="Approve"
                            onClick={() => {
                                note.status = "approved";
                                updateNote(note)
                                history.push("/admin/notes")
                            }}
                        />
                        <Button
                            label="Reject"
                            btnColor="#E4E5F1"
                            color="#000000"
                            onClick={() => {
                                note.status = "rejected";
                                updateNote(note)
                                history.push("/admin/notes")
                            }}
                        />
                    </div>
            </div>

        </>
    );
};

export default NoteCard;
