const makeInstance = () => {
  class EventBroker {
    // @ts-ignore
    eventTarget = new EventTarget();

    dispatch(type: CustomEvents) {
      this.eventTarget.dispatchEvent(new Event(type));
    }
  }

  const eventBus = new EventBroker();
  return eventBus;
};

let instance: ReturnType<typeof makeInstance>;

const eventBus = {
  getInstance: () => {
    if (!instance) {
      instance = makeInstance();
    }
    return instance;
  },
};

type CustomEvents = 'MOVIE_DETAILS_TRIGGERED';

export default eventBus;
