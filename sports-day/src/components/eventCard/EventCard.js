import React from 'react';
import { convertToAMPM } from '../../utils/utilities';
import './eventCard.css';

const EventCard = ({ event, onClick, isSelected }) => {
    const { event_name, event_category, start_time, end_time } = event;
    return (
        <div className={`event-card ${isSelected ? 'selected' : ''}`}>
            <div className='card-name'>
                <p className=''>{event_category.charAt(0)}</p></div>
            <div className='card-details'>
                <h3>{event_name}</h3>
                <p>({event_category})</p>
                <p>{convertToAMPM(start_time)} - {convertToAMPM(end_time)}</p>
                <button
                    className={
                        `card-button ${isSelected ? 'remove' : 'select'}`
                    }
                    onClick={
                        () => onClick(event)}>{isSelected ? 'Remove' : 'Select'
                    }
                </button>
            </div>
        </div>
    );
}

export default EventCard;
