import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, IconButton, Typography, useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { React } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './ContentTopBar.module.css';

export default function ContentTopBar({ title, redirectLink, showButton = true }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const history = useHistory();

    const handleCreate = () => {
        history.push(redirectLink);
    }

    const handleGoBack = () => {
        history.goBack();
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <IconButton onClick={handleGoBack}>
                    <ArrowBackIcon />
                </IconButton>
                <Box sx={{ width: 10 }} />
                <Typography variant="h5" component="div" sx={{ mr: 1 }} >
                    {title}
                </Typography>
                
            </div>
            {showButton && <Button fullWidth={isMobile} variant="contained" size="small" startIcon={<AddIcon />} onClick={handleCreate}> Create </Button>}
            
        </div>
    )
}