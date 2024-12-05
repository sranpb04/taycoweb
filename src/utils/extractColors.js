export const extractColor = (description) => {
    const parts = description.split(',');
    if (parts.length > 2 && parts[2].trim()) {
      return parts[2].trim(); // Returns the color if it exists after second comma
    }
    return 'N/A'; // Returns N/A if no color is found
  };