type EventType = {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
};

export interface Event {
  event: EventType;
}
export interface Events {
  events: EventType[];
}
