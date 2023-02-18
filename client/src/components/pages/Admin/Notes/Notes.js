import React from "react";
import styles from "./Notes.module.css";
import ToggleButton from "@mui/material/ToggleButton";
import { useGetNotesQuery } from "../../../../feature/services/note";
import NotesGallery from "./NotesGallery/NotesGallery";
import BounceLoader from "react-spinners/BounceLoader";

// TODO: Implement search

const Notes = () => {
    const [showPending, setShowPending] = React.useState(true);
    const [showCompleted, setShowCompleted] = React.useState(true);
    const [search, setSearch] = React.useState("");
    const { data, error, isLoading } = useGetNotesQuery();

    return (
        <div className={styles.container}>
            <div className={styles.toolbar}>
                <div className={styles.toolbar__left}>
                    <ToggleButton
                        value="check"
                        selected={showPending}
                        onChange={() => setShowPending(!showPending)}
                    >
                        Pending
                    </ToggleButton>
                    <ToggleButton
                        value="check"
                        selected={showCompleted}
                        onChange={() => setShowCompleted(!showCompleted)}
                        sx={{
                            ml: 1,
                            backgroundColor: showCompleted ? '#484B6A' : '#CC6577',
                            color: showCompleted ? '#fff' : '#fff',
                        }}
                    >
                        Completed
                    </ToggleButton>
                </div>

                <div className={styles.toolbar__right}>
                    <input
                        type="text"
                        placeholder="Search"
                        className={styles.search}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className={styles.content}>
                {isLoading ? (
                    <div className={styles.loader}>
                        <BounceLoader color="#484B6A" />
                    </div>
                ): (
                    <NotesGallery notes={data.filter( ( note ) => {
                    if (showPending && showCompleted) {
                        return true;
                    }
                    if (showPending && !showCompleted) {
                        return note.status === 'pending';
                    }
                    if (!showPending && showCompleted) {
                        return note.status === 'completed';
                    }
                    return false;
                })} />   
                )}
                {error && <div className={styles.error}>{error}</div>}
                
            </div>
        </div>
    );
};

export default Notes;