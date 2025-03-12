export const formatList = (items: string[] = [], otherText?: string) => {
  if (!items || !items.length) return '';
  const mainItems = items.filter(item => item !== 'other');
  const formattedList = mainItems.join(', ');
  return otherText ? `${formattedList}${mainItems.length ? ', and ' : ''}${otherText}` : formattedList;
};

export const getVehiclePosition = (value: string) => {
  const positions: { [key: string]: string } = {
    "1": "Driver",
    "2": "Front Passenger",
    "3": "Back Passenger",
    "4": "Other"
  };
  return positions[value] || value;
};

export const getTimeOfDay = (value: string) => {
  const times: { [key: string]: string } = {
    "1": "Morning",
    "2": "Afternoon",
    "3": "Evening",
    "4": "Night"
  };
  return times[value] || value;
};

export const getVehicleType = (value: string) => {
  const types: { [key: string]: string } = {
    "1": "Car",
    "2": "Van",
    "3": "Bus",
    "4": "Other"
  };
  return types[value] || value;
};

export const getVehicleStatus = (value: string) => {
  const statuses: { [key: string]: string } = {
    "1": "Moving",
    "2": "Stationary",
    "3": "Parked",
    "4": "Other"
  };
  return statuses[value] || value;
};

export const getImpactLocation = (value: string) => {
  const locations: { [key: string]: string } = {
    "1": "Rear",
    "2": "Front",
    "3": "Passenger Side",
    "4": "Driver Side"
  };
  return locations[value] || value;
};

export const getDamageLevel = (value: string) => {
  const levels: { [key: string]: string } = {
    "1": "Mild Damage",
    "2": "Moderate Damage",
    "3": "Written Off"
  };
  return levels[value] || value;
};

export const getPainSeverity = (value: string) => {
  const severities: { [key: string]: string } = {
    "1": "Mild",
    "2": "Moderate",
    "3": "Severe",
    "4": "Resolved"
  };
  return severities[value] || value;
};

export const isLongTermPrognosis = (severityValue: string) => {
  return severityValue === "3";
};

export const getTravelAnxietySymptomLabel = (id: string) => {
  const labels: { [key: string]: string } = {
    "cautious-driver": "Being a more cautious driver",
    "frequent-mirror-checking": "Looking in the mirror more frequently",
    "avoid-accident-road": "Avoiding the road where the accident happened",
    "avoid-passenger": "Avoiding being a passenger in a car",
    "avoid-driving": "Avoiding driving a car",
    "panic-attacks": "Getting panic attacks when in a car",
    "passenger-anxiety": "Anxiety when traveling as a passenger",
    "busy-road-anxiety": "Anxiety on busy roads or highways",
  };
  return labels[id] || id;
};

export const formatTravelAnxietySymptoms = (symptoms: string[] = [], otherSymptom?: string) => {
  if (!symptoms.length) return '';
  
  const mainSymptoms = symptoms.filter(s => s !== 'other');
  const formattedSymptoms = mainSymptoms.map(s => getTravelAnxietySymptomLabel(s));
  
  let resultText = '';
  if (formattedSymptoms.length === 1) {
    resultText = formattedSymptoms[0];
  } else if (formattedSymptoms.length === 2) {
    resultText = `${formattedSymptoms[0]} and ${formattedSymptoms[1]}`;
  } else if (formattedSymptoms.length > 2) {
    const lastSymptom = formattedSymptoms.pop();
    resultText = `${formattedSymptoms.join(', ')}, and ${lastSymptom}`;
  }
  
  if (otherSymptom && symptoms.includes('other')) {
    resultText = resultText ? `${resultText}, and ${otherSymptom}` : otherSymptom;
  }
  
  return resultText;
};
