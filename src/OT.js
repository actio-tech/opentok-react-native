import { NativeModules, NativeEventEmitter } from 'react-native';
import { each } from 'underscore';

const OT = NativeModules.OTSessionManager;
const nativeEvents = new NativeEventEmitter(OT);

const setNativeEvents = (events) => {
  const eventNames = Object.keys(events);
  OT.setNativeEvents(eventNames);
  
  let hasRegisteredEvents;
  if (nativeEvents.listeners) {
    const allEvents = nativeEvents.listeners();
    hasRegisteredEvents = (eventType) => allEvents.includes(eventType);
  } else {
    hasRegisteredEvents = (eventType) => nativeEvents.listenerCount(eventType) > 0;
  }

  each(events, (eventHandler, eventType) => {
    if (!hasRegisteredEvents(eventType)) {
      nativeEvents.addListener(eventType, eventHandler);
    }
  });
};

const removeNativeEvents = (events) => {
  const eventNames = Object.keys(events);
  OT.removeNativeEvents(eventNames);
  each(events, (_eventHandler, eventType) => {
    nativeEvents.removeAllListeners(eventType);
  });
};

export {
  OT,
  nativeEvents,
  setNativeEvents,
  removeNativeEvents,
};
