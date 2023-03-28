import React from "react";
import ModalImage from "react-modal-image";
import { useHistory } from "react-router-dom";
import { useUpdateNoteMutation } from "../../../../../../feature/services/note";
import Button from '../../../../../common/Button/Button';
import styles from "./NoteCard.module.css";

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
                                // Create new JSON object with status being different
                                let payload = {
                                    status: "approved",
                                    id: note._id
                                }
                                updateNote(payload)
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
