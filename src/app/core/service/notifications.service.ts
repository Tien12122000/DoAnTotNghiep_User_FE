import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private notification:NzNotificationService) { }
  createNotification(type: string, title:string, content:string): void {
    this.notification.create(
      type,
      title,
      content
    );
  }
}
// import { Component } from '@angular/core';

// import { NzNotificationService } from 'ng-zorro-antd/notification';

// @Component({
//   selector: 'nz-demo-notification-with-icon',
//   template: `
//     <button nz-button (click)="createNotification('success')">Success</button>
//     <button nz-button (click)="createNotification('info')">Info</button>
//     <button nz-button (click)="createNotification('warning')">Warning</button>
//     <button nz-button (click)="createNotification('error')">Error</button>
//   `,
//   styles: [
//     `
//       button {
//         margin-right: 1em;
//       }
//     `
//   ]
// })
// export class NzDemoNotificationWithIconComponent {
//   createNotification(type: string): void {
//     this.notification.create(
//       type,
//       'Notification Title',
//       'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
//     );
//   }

//   constructor(private notification: NzNotificationService) {}
// }
