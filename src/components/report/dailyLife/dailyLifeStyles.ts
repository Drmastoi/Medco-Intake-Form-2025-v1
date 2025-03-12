
import { StyleSheet } from '@react-pdf/renderer';

export const dailyLifeStyles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
    lineHeight: 1.4,
  },
  listContainer: {
    marginLeft: 10,
    marginBottom: 5,
  },
  listItem: {
    fontSize: 10,
    marginBottom: 3,
    lineHeight: 1.4,
  },
  conclusionText: {
    fontSize: 10,
    marginTop: 10,
    fontStyle: 'italic',
  },
  bulletStyle: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 3,
  },
  bullet: {
    width: 10,
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    paddingLeft: 5,
  },
  // Additional styles needed for the components
  paragraph: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bulletPoint: {
    fontSize: 10,
    marginBottom: 3,
    marginLeft: 10,
  },
  explanationText: {
    fontSize: 10,
    marginTop: 5,
    marginBottom: 5,
    fontStyle: 'italic',
  },
  bulletList: {
    marginLeft: 10,
    marginBottom: 10,
  },
  bulletItem: {
    fontSize: 10,
    marginBottom: 3,
    lineHeight: 1.4,
  }
});
