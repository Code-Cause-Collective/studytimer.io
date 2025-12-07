import logoIcon from '../assets/images/logo-icon.png';
import { appStore } from '../stores/app.js';
import {
  CLIENT_ERROR_MESSAGE,
  NOTIFICATION_PERMISSION,
} from '../utils/constants.js';

const USER_AGENT = appStore.userAgent;

class NotificationApiService {
  /**
   * @param {string} title
   * @param {string} message
   */
  sendDesktopNotification(title, message) {
    if (!this.isNotificationSupported()) {
      return;
    }

    /** @type {NotificationOptions} */
    const notificationOptions = { body: message, icon: logoIcon };

    if (Notification.permission === NOTIFICATION_PERMISSION.GRANTED) {
      new Notification(title, { ...notificationOptions });
    } else {
      this.requestNotificationPermission().then(function (permissionGranted) {
        if (permissionGranted) {
          new Notification(title, { ...notificationOptions });
        }
      });
    }
  }

  /** @returns {Promise<boolean>} */
  async requestNotificationPermission() {
    if (!this.isNotificationSupported()) {
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === NOTIFICATION_PERMISSION.GRANTED) {
        return true;
      } else {
        console.warn(CLIENT_ERROR_MESSAGE.NOTIFICATION_PERMISSION_DENIED);
        return false;
      }
    } catch (error) {
      console.error(
        CLIENT_ERROR_MESSAGE.NOTIFICATION_REQUEST_PERMISSION_FAILED,
        error
      );
      return false;
    }
  }

  isNotificationSupported() {
    if ('Notification' in window) {
      return true;
    }

    console.warn(
      `This browser [${USER_AGENT}] does not support notifications.`
    );
    return false;
  }
}

export const notificationApiService = new NotificationApiService();
