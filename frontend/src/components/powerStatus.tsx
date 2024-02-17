import React, { useEffect, useRef, useState } from "react";

const PowerStatusComponent = () => {
  const [dataStream, setDataStream] = useState({});
  const [powerStatus, setPowerStatus] = useState('');
  const eventSourceRef = useRef<EventSource | null>(null); // Define the type of eventSourceRef

  const updatePowerStatus = (data) => {
    // Determine the power status based on the provided conditions
    let newPowerStatus = '';
    if (data.soc === 100 && (data.toGrid || data.gridTo)) {
      newPowerStatus = 'Looking good';
    } else if (data.soc >= 60 && (data.toGrid || data.gridTo)) {
      newPowerStatus = 'Check soon';
    } else if (data.soc >= 40 && !data.toGrid && !data.gridTo) {
      newPowerStatus = 'Check ASAP';
    } else {
      newPowerStatus = 'Urgent';
    }

    setPowerStatus(newPowerStatus);
  };

  useEffect(() => {
    if (!eventSourceRef.current) {
      eventSourceRef.current = new EventSource(
        "http://localhost:8080/powerview",
      );

      eventSourceRef.current.onmessage = (e) => {
        const data = JSON.parse(e.data);
        setDataStream(data);
        updatePowerStatus(data);
      };

      eventSourceRef.current.onerror = (e) => {
        console.error("EventSource failed:", e);
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
          eventSourceRef.current = null;
        }
      };
    }

    return () => {
      // Cleanup the EventSource when the component unmounts
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div>
      <h1>Status: {powerStatus}</h1>
      <p>Battery: {dataStream.soc}%</p>
      <p>Grid: {dataStream.toGrid || dataStream.gridTo ? 'On' : 'Off'}</p>
    </div>
  );
};

export default PowerStatusComponent;
