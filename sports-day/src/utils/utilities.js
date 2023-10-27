const convertToAMPM = (dateTimeString) => {
    const [hours, minutes] = dateTimeString.split(" ")[1].split(":").map(Number);
    const amOrPm = hours >= 12 ? "PM" : "AM";
    const amPmHours = (hours % 12) || 12;
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${amPmHours}:${paddedMinutes}${amOrPm}`;
}

const areEventsInConflict = (eventOne, eventTwo) => {
    const startTime1 = new Date(eventOne.start_time).getTime();
    const endTime1 = new Date(eventOne.end_time).getTime();
    const startTime2 = new Date(eventTwo.start_time).getTime();
    const endTime2 = new Date(eventTwo.end_time).getTime();
    const conflictStatus = startTime1 < endTime2 && startTime2 < endTime1;
    if (conflictStatus) {
        alert('Cannot select an event which is conflicting with the timings of already selected events');
    }
    return conflictStatus;
};

const groupEventsByCategory = (eventData) => {
    const eventsByCategory = eventData?.reduce((accumulator, event) => {
      const category = event.event_category;
      if (!accumulator[category]) {
        accumulator[category] = [];
      }
      accumulator[category].push(event);
      return accumulator;
    }, {});

  
  
    const groupedEvents =  eventsByCategory && Object.entries(eventsByCategory).map(([category, events]) => ({
      category,
      events,
    }));
    console.log('Vineet',groupedEvents);
    return groupedEvents;
  };

export { convertToAMPM, areEventsInConflict, groupEventsByCategory }