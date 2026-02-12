export type UserRole = 'admin' | 'director' | 'team_leader' | 'officer' | 'directorate';

export type ComplaintStatus =
  | 'New'
  | 'Categorized'
  | 'Assigned'
  | 'In Progress'
  | 'Sent to Directorate'
  | 'Assessment Completed'
  | 'Responded'
  | 'Closed'
  | 'Rejected';

export interface Complaint {
  id: string;
  tin: string;
  fullName: string;
  contact: string;
  details: string;
  category?: string;
  subcategory?: string;
  status: ComplaintStatus;
  assignedOfficer?: string;
  directorate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  directorate?: string;
}

export interface Assessment {
  id: string;
  complaintId: string;
  assessedBy: string;
  type: 'officer' | 'directorate';
  content: string;
  createdAt: string;
}

export interface Response {
  id: string;
  complaintId: string;
  respondedBy: string;
  content: string;
  sentToUser: boolean;
  createdAt: string;
}
