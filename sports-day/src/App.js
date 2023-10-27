import React, { useState } from 'react';
import './App.css';
import EventList from './components/eventList/EventList';
import Header from './components/header/Header';
import { useDataFetching, useDebounce, useErrorBoundary } from './utils/customHooks';
import { areEventsInConflict, groupEventsByCategory } from './utils/utilities';
import { EVENTS_DATA_URI } from './constants/constants';
import { mockEvents } from './mockData/mockEvents'

const App = () => {
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [searchText, setSearchText] = useState('');

  const { hasError } = useErrorBoundary()

  const { data: events = mockEvents, loading } = useDataFetching(EVENTS_DATA_URI);

  const debouncedSearchText = useDebounce(searchText, 500);

  const handleSelect = (event) => {
    if (selectedEvents?.length < 3 &&
      !selectedEvents?.some((selectedEvent) => areEventsInConflict(selectedEvent, event))) {
      setSelectedEvents([...selectedEvents, event]);
    }
  };

  const handleDeselect = (event) => {
    setSelectedEvents(selectedEvents?.filter((selectedEvent) => selectedEvent.id !== event.id));
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const allEvents = (events, selectedEvents) => {
    const filteredEvents = events?.filter((event) =>
      event.event_name.toLowerCase().includes(debouncedSearchText.toLowerCase())
    );
    const selectedEventIds = new Set(selectedEvents?.map((event) => event.id));
    const availableEvents = filteredEvents?.filter((event) => !selectedEventIds.has(event.id));
    return availableEvents;
  };

  if (hasError) return <div>{hasError}</div>

  return (
    <div className="app">
      <Header />
      <main className="mainContainer">
        <section className="event-container">
          <section className="all-event-container">
            <h2>All events</h2>
            <section className="search-bar-container">
              <input
                type="search"
                placeholder="Search by event name"
                value={searchText}
                className="search-bar"
                onChange={handleSearch}
              />
            </section>
          </section>
          {loading ?
            <section className='events-typography'>Loading...</section> : <EventList
              eventsData={groupEventsByCategory(allEvents(events, selectedEvents))}
              onClick={handleSelect}
              selectedEvents={selectedEvents}
            />
          }
        </section>
        <section className="event-container">
          <h2 className="events-typography">Selected Events</h2>
          {selectedEvents?.length > 0 ?
            <EventList
              eventsData={groupEventsByCategory(selectedEvents)}
              onClick={handleDeselect}
              selectedEvents={selectedEvents}
            />
            : <section className='events-typography'>No Selected Events</section>}
        </section>
      </main>
    </div>
  );
}

export default App;
