import { IEventInit } from '@useparagon/core/event';

export type EventSchema = {
  job: 'dark lord';
  fname: 'Tom';
  lname: 'Riddle';
  email_address: 'snakesarecool@gmail.com';
};

const event: IEventInit<EventSchema> = {
  /**
   *  name of event
   */
  name: 'Field Map Testing',

  /**
   * schema of event payload
   */
  schema: {
    job: 'dark lord',
    fname: 'Tom',
    lname: 'Riddle',
    email_address: 'snakesarecool@gmail.com',
  },
};

export default event;
