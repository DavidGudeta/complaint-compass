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

export type CaseType = 'Individual' | 'Business' | 'Organization';

export interface Complaint {
  id: string;
  complaint_code: string;
  case_status: string;
  taxpayer_name: string;
  tin: string;
  taxpayer_phone: string;
  complainant_name: string;
  complainant_phone: string;
  complainant_email: string;
  category_id: string;
  sub_category_id: string;
  complaints_on: string;
  status_id: string;
  status: ComplaintStatus;
  case_type: CaseType;
  applied_date: string;
  complaint_title: string;
  details: string;
  machine_code?: string;
  reference_number?: string;
  tax_center?: string;
  assigned_to?: string;
  // legacy compat
  fullName: string;
  contact: string;
  category?: string;
  subcategory?: string;
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
