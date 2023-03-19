
import React from 'react'
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Eventcalendar, getJson, toast } from '@mobiscroll/react';
import './Schedule.css'
export const Schedule = () => {

    const [myEvents, setEvents] = React.useState([]);

    React.useEffect(() => {
        getJson('https://trial.mobiscroll.com/events/?vers=5', (events) => {
            setEvents(events);
        }, 'jsonp');
    }, []);
    
    const onEventClick = React.useCallback((event) => {
        toast({
            message: event.event.title
        });
    }, []);
    
    const view = React.useMemo(() => {
        return {
            schedule: { type: 'week' }
        };
    }, []);

    return (
        <div style={{ height: '100%', width: '100%' }}>
        <Eventcalendar
          theme="ios" 
          themeVariant="light"
          clickToCreate={true}
          dragToCreate={true}
          dragToMove={true}
          dragToResize={true}
          eventDelete={true}
          data={myEvents}
          view={view}
          onEventClick={onEventClick}
          style={{ height: 'inherit', width: 'inherit' }}
          header={{
            weekdays: { display: 'none' },
            date: { display: 'none' },
            navigation: { prev: false, next: false }
          }}
          className="custom-event-calendar"
        />
      </div>
  
    ); 
}

