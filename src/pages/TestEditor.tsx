import React from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';

const TestEditor = () => {
    // This will be filled with a form to create/edit a test
    return (
        <Container>
            <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Редактор тестов
                </Typography>
                <Paper sx={{ p: 3 }}>
                    <Typography>
                        Форма для создания и редактирования тестов появится здесь.
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default TestEditor; 