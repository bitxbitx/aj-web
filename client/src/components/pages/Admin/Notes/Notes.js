import React from "react";
import styles from "./Notes.module.css";
import { useGetNotesQuery } from "../../../../feature/services/note";
import NotesGallery from "./NotesGallery/NotesGallery";
import BounceLoader from "react-spinners/BounceLoader";
import MuiToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/material/styles';

const ToggleButton = styled(MuiToggleButton)(() => ({
    '&.Mui-selected, &.Mui-selected:hover': {
        color: 'white',
        backgroundColor: '#484B6A',
    },
}));

const Notes = () => {
    const { data, error, isLoading } = useGetNotesQuery();
    const [search, setSearch] = React.useState("");
    const [status, setStatus] = React.useState("pending");

    return (
        <div className={styles.container}>
            <div className={styles.toolbar}>
                <div className={styles.toolbar__left}>
                    {/* Implement Toggle Button? */}
                    <ToggleButtonGroup value={status} exclusive onChange={(ev) => {
                        setStatus(ev.target.value);
                    }}>
                        <ToggleButton value="pending" >
                            Pending
                        </ToggleButton>
                        <ToggleButton value="approved" >
                            Approved
                        </ToggleButton>
                        <ToggleButton value="rejected" >
                            Rejected
                        </ToggleButton>

                    </ToggleButtonGroup>
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
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.content}>
                {isLoading ? (
                    <div className={styles.loader}>
                        <BounceLoader color="#484B6A" />
                    </div>
                ) : (
                    <NotesGallery notes={data.filter((el) => {
                        if (el && el.status === status) {
                            return el.noteNo.toString().match(new RegExp(search, "i"))
                        }
                        return null;
                    })
                    } />
                )}
                

            </div>
        </div>
    );
};

export default Notes;