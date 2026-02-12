export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'system' | 'complaint' | 'assignment' | 'status';
  read: boolean;
  createdAt: string;
}

export const mockNotifications: Notification[] = [
  { id: 'n1', title: 'New Complaint Received', message: 'Complaint #CMP-2024-001 has been submitted by Abebe Kebede.', type: 'complaint', read: false, createdAt: '2024-01-15T10:30:00' },
  { id: 'n2', title: 'Complaint Assigned', message: 'Complaint #CMP-2024-003 has been assigned to Officer Tigist Haile.', type: 'assignment', read: false, createdAt: '2024-01-15T09:15:00' },
  { id: 'n3', title: 'Status Updated', message: 'Complaint #CMP-2024-002 status changed to "Sent to Directorate".', type: 'status', read: false, createdAt: '2024-01-14T16:45:00' },
  { id: 'n4', title: 'System Maintenance', message: 'Scheduled maintenance on Jan 20, 2024 from 2:00 AM - 4:00 AM.', type: 'system', read: true, createdAt: '2024-01-14T08:00:00' },
  { id: 'n5', title: 'Response Ready', message: 'Directorate response for #CMP-2024-001 is ready for review.', type: 'status', read: false, createdAt: '2024-01-13T14:20:00' },
  { id: 'n6', title: 'New Role Assignment', message: 'You have been assigned the Team Leader role by Admin.', type: 'system', read: true, createdAt: '2024-01-12T11:00:00' },
];
