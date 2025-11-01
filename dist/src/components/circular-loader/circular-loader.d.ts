export default CircularLoader;
declare function CircularLoader({ Grid, CircularProgress, Typography, height, color, text, onFinished }: {
    Grid?: (() => void) | undefined;
    CircularProgress?: (() => void) | undefined;
    Typography?: (() => void) | undefined;
    height?: string | undefined;
    color?: string | undefined;
    text?: string | undefined;
    onFinished?: (() => void) | undefined;
}): React.JSX.Element | "Required: import { Grid, CircularProgress, Typography } from '@mui/material'";
import React from 'react';
