// Function to format the date to 'Feb 10, 2025'
export function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' }; // Format 'Feb 10, 2025'
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
  
  // Function to format the time to 'AM'/'PM'
 export function formatTime(timeString) {
    const date = new Date(`1970-01-01T${timeString}Z`); // Creating a date object with the time
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12; // Convert to 12-hour format
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  }
  