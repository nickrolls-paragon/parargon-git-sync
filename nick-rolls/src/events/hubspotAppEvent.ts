import { IEventInit } from '@useparagon/core/event';

export type EventSchema = {
  url: '';
  creator: {
    name: '';
    email: '';
  };
  meeting: {
    date: '';
    title: '';
    company_name: '';
    workspace_id: '';
    company_domain: '';
    workspace_name: '';
  };
  note_id: '';
  created_at: '';
  host_email: '';
  meeting_id: '';
  event_title: '';
  note_content: '';
  participants: [
    {
      name: '';
      email: '';
      company: '';
      display: '';
    },
    {
      name: '';
      email: '';
      company: '';
      display: '';
    },
    {
      name: '';
      email: '';
      company: '';
      display: '';
    },
    {
      name: '';
      email: '';
      company: '';
      display: '';
    },
    {
      name: '';
      email: '';
      company: '';
      display: '';
    },
  ];
  scheduled_end_at: '';
  scheduled_start_at: '';
  notification_content: '';
};

const event: IEventInit<EventSchema> = {
  /**
   *  name of event
   */
  name: 'Hubspot App Event',

  /**
   * schema of event payload
   */
  schema: {
    url: '',
    creator: {
      name: '',
      email: '',
    },
    meeting: {
      date: '',
      title: '',
      company_name: '',
      workspace_id: '',
      company_domain: '',
      workspace_name: '',
    },
    note_id: '',
    created_at: '',
    host_email: '',
    meeting_id: '',
    event_title: '',
    note_content: '',
    participants: [
      {
        name: '',
        email: '',
        company: '',
        display: '',
      },
      {
        name: '',
        email: '',
        company: '',
        display: '',
      },
      {
        name: '',
        email: '',
        company: '',
        display: '',
      },
      {
        name: '',
        email: '',
        company: '',
        display: '',
      },
      {
        name: '',
        email: '',
        company: '',
        display: '',
      },
    ],
    scheduled_end_at: '',
    scheduled_start_at: '',
    notification_content: '',
  },
};

export default event;
