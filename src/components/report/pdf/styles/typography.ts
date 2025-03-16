
import { Font } from '@react-pdf/renderer';

// Register fonts using actual font files included with the package
Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/opensans/v23/mem8YaGs126MiZpBA-UFVZ0e.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/opensans/v23/mem5YaGs126MiZpBA-UN7rgOUuhs.ttf', fontWeight: 'bold' },
    { src: 'https://fonts.gstatic.com/s/opensans/v23/mem8YaGs126MiZpBA-UFVp0e.ttf', fontStyle: 'italic' },
    { src: 'https://fonts.gstatic.com/s/opensans/v23/mem5YaGs126MiZpBA-UNirkOUuhs.ttf', fontWeight: 'bold', fontStyle: 'italic' },
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
