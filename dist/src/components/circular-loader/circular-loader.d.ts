export default CircularLoader;
declare function CircularLoader({ Grid, CircularProgress, Typography, height, color, text, onFinished }: {
    Grid?: () => void;
    CircularProgress?: () => void;
    Typography?: () => void;
    height?: string;
    color?: string;
    text?: string;
    onFinished?: () => void;
}): React.JSX.Element | "Required: import { Grid, CircularProgress, Typography } from '@mui/material'";
import React from 'react';
