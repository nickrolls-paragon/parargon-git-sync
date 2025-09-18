import { IEventInit } from '@useparagon/core/event';

export type EventSchema = {
  board: 'Active Deals';
  title: 'Send follow up checkin';
  summary: 'It has been one week since the last communication with Example Industries. Send a friendly hello to see how things are goin!';
};

const event: IEventInit<EventSchema> = {
  /**
   *  name of event
   */
  name: 'Task Created',

  /**
   * schema of event payload
   */
  schema: {
    board: 'Active Deals',
    title: 'Send follow up checkin',
    summary:
      'It has been one week since the last communication with Example Industries. Send a friendly hello to see how things are goin!',
  },
};

export default event;
