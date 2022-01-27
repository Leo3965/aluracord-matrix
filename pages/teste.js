import React from 'react';
import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import CircularProgressWithLabel from './components/utils/circularProgressWithLabel';

export default function Teste() {
    return (
        <Box styleSheet={{
            display: 'flex',
            margin: '0 auto 0 auto',
            width: '300px'
        }}>
            <div>Oi</div>
            <CircularProgressWithLabel></CircularProgressWithLabel>
        </Box>
    );
}