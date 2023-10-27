import React from 'react';
import EventCard from '../eventCard/EventCard';
import './eventList.css';

const EventList = ({ eventsData, onClick, selectedEvents }) => {

  if (!eventsData?.length) return <p className='events-typography'>No Events Exists</p>;
  
  return (
    eventsData.map((item) => <div className='event-list-card'>
      <p className='category-name'>{item?.category}</p>
      <div className="event-list">
        {item?.events?.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onClick={onClick}
            isSelected={selectedEvents.includes(event)}
          />
        ))}
      </div>
    </div>)
  );
}

export default EventList;
