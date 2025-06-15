import React from 'react';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const TestManager = () => {
    // This will be filled with state and logic to list and manage tests
    return (
        <Container>
            <Box sx={{ mt: 4, mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography variant="h4">
                        Менеджер тестов
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to="/teacher/test-editor/new"
                    >
                        Создать новый тест
                    </Button>
                </Box>
                <Paper>
                    <Typography sx={{ p: 2 }}>
                        Здесь будет список всех тестов с возможностью их редактирования и удаления.
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default TestManager; 