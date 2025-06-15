import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const TeacherContentManager = () => {
    return (
        <Box sx={{ mt: 4, p: 2, border: '1px dashed grey', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
                Управление контентом
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Здесь вы можете создавать, редактировать и удалять тесты для студентов.
            </Typography>
            <Button
                variant="contained"
                component={RouterLink}
                to="/teacher/test-manager"
            >
                Управлять тестами
            </Button>
        </Box>
    );
};

export default TeacherContentManager; 