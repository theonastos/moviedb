export interface SubscriberType<T> {
  (value: T): void;
}

export interface PubSubType<T> {
  subscribe: (subscriber: SubscriberType<T>) => () => void;
  publish: (value: T) => void;
}

export const createPubSub = <T>(): PubSubType<T> => {
  const subscribers: SubscriberType<T>[] = [];

  const subscribe = (subscriber: SubscriberType<T>): () => void => {
    subscribers.push(subscriber);

    // Return unsubscribe function
    return () => {
      const index = subscribers.indexOf(subscriber);
      if (index !== -1) {
        subscribers.splice(index, 1);
      }
    };
  }

  const publish = (value: T): void => {
    subscribers.forEach((subscriber) => subscriber(value));
  }

  return {
    subscribe,
    publish,
  };
};

export default createPubSub;