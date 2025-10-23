import { IApiResponse } from '@utils/api-util';

export type INotification = {
  id: number;
  title: string;
  message: string;
  date: string;
  read: boolean;
};

export type INotificationResponse = IApiResponse<INotification[]>;
