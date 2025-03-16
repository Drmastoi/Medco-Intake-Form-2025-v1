
import { Font } from '@react-pdf/renderer';

// Register fonts (these should be in the public directory)
Font.register({
  family: 'Open Sans',
  fonts: [
    { src: '/fonts/OpenSans-Regular.ttf' },
    { src: '/fonts/OpenSans-Bold.ttf', fontWeight: 'bold' },
    { src: '/fonts/OpenSans-Italic.ttf', fontStyle: 'italic' },
    { src: '/fonts/OpenSans-BoldItalic.ttf', fontWeight: 'bold', fontStyle: 'italic' },
  ],
});

// Typography constants for the PDF report
export const typography = {
  fontFamily: 'Open Sans',
  
  // Font sizes
  fontSize: {
    xs: 8,
    sm: 9,
    base: 10,
    md: 11,
    lg: 12,
    xl: 14,
    xxl: 16,
    xxxl: 18,
  },
  
  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
  
  // Font weights
  fontWeight: {
    normal: 'normal',
    bold: 'bold',
  },
};
