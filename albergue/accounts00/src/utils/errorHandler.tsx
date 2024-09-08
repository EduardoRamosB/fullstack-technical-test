import { AxiosError } from 'axios';
import { showNotification } from '@mantine/notifications';

export const handleApiError = (error: unknown) => {
  if (error instanceof AxiosError && error.response?.data) {
    const errorsNotification: string[] = [];
    const errorData = error.response.data;

    Object.keys(errorData).forEach((key) => {
      const errorMessages = errorData[key];
      if (Array.isArray(errorMessages) && errorMessages.length > 0) {
        errorsNotification.push(errorMessages[0]);
        console.error(errorMessages[0]);
      }
    });

    showNotification({
      title: 'Sign up error :(',
      message: (
        <ul>
          {errorsNotification.map((e, idx) => (
            <li key={idx}>{e}</li>
          ))}
        </ul>
      ),
      position: 'top-center',
      color: 'red',
    });
  } else {
    // Handle other types of errors if necessary
    console.error('An unexpected error occurred:', error);
  }
};
