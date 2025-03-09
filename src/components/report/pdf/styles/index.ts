
import { StyleSheet } from '@react-pdf/renderer';
import { baseStyles } from './baseStyles';
import { fieldStyles } from './fieldStyles';
import { tableStyles } from './tableStyles';
import { rtaStyles } from './rtaStyles';
import { injuryStyles } from './injuryStyles';
import { signatureStyles } from './signatureStyles';
import { claimantReportStyles } from './claimantReportStyles';
import { dailyLifeStyles } from '../../dailyLife/dailyLifeStyles';

// Combine all styles into one stylesheet
export const pdfStyles = StyleSheet.create({
  ...baseStyles,
  ...fieldStyles,
  ...tableStyles,
  ...rtaStyles,
  ...injuryStyles,
  ...signatureStyles,
  ...dailyLifeStyles,
});

export { claimantReportStyles };
