import { Complaint, StaffUser, Assessment, Response, ComplaintStatus } from './types';

export const STATUSES: ComplaintStatus[] = [
  'New', 'Categorized', 'Assigned', 'In Progress',
  'Sent to Directorate', 'Assessment Completed', 'Responded', 'Closed', 'Rejected'
];

export const STATUS_FLOW: ComplaintStatus[] = [
  'New', 'Categorized', 'Assigned', 'In Progress',
  'Sent to Directorate', 'Assessment Completed', 'Responded', 'Closed'
];

export const CATEGORIES = [
  { name: 'Tax Assessment', subcategories: ['Income Tax', 'VAT', 'Corporate Tax', 'Withholding Tax'] },
  { name: 'Service Delivery', subcategories: ['Delay', 'Quality', 'Accessibility', 'Staff Behavior'] },
  { name: 'Refund', subcategories: ['Pending Refund', 'Incorrect Amount', 'Delayed Processing'] },
  { name: 'Registration', subcategories: ['TIN Issue', 'Business Registration', 'Update Request'] },
];

export const DIRECTORATES = [
  'Domestic Tax', 'Customs & Excise', 'Legal Affairs', 'Taxpayer Services', 'Audit & Investigation'
];

export const mockStaffUsers: StaffUser[] = [
  { id: '1', name: 'Admin User', email: 'admin@portal.gov', role: 'admin' },
  { id: '2', name: 'Director General', email: 'director@portal.gov', role: 'director' },
  { id: '3', name: 'Team Lead A', email: 'teamlead@portal.gov', role: 'team_leader' },
  { id: '4', name: 'Officer Ahmed', email: 'ahmed@portal.gov', role: 'officer', directorate: 'Domestic Tax' },
  { id: '5', name: 'Officer Sara', email: 'sara@portal.gov', role: 'officer', directorate: 'Customs & Excise' },
  { id: '6', name: 'Dir. Domestic Tax', email: 'domestic@portal.gov', role: 'directorate', directorate: 'Domestic Tax' },
];

export const mockComplaints: Complaint[] = [
  {
    id: 'CMP-2026-001', tin: '1234567890', fullName: 'John Doe', contact: '+251911223344',
    details: 'Incorrect tax assessment on my annual income tax filing for 2025.',
    category: 'Tax Assessment', subcategory: 'Income Tax', status: 'In Progress',
    assignedOfficer: '4', directorate: 'Domestic Tax',
    createdAt: '2026-01-15T09:30:00Z', updatedAt: '2026-02-01T14:20:00Z',
  },
  {
    id: 'CMP-2026-002', tin: '0987654321', fullName: 'Jane Smith', contact: '+251922334455',
    details: 'Delayed VAT refund for Q3 2025, submitted documents 3 months ago.',
    category: 'Refund', subcategory: 'Delayed Processing', status: 'Sent to Directorate',
    assignedOfficer: '5', directorate: 'Customs & Excise',
    createdAt: '2026-01-20T11:00:00Z', updatedAt: '2026-02-05T16:45:00Z',
  },
  {
    id: 'CMP-2026-003', tin: '1122334455', fullName: 'Ali Hassan', contact: '+251933445566',
    details: 'Unable to update my business registration details online.',
    category: 'Registration', subcategory: 'Update Request', status: 'New',
    createdAt: '2026-02-10T08:15:00Z', updatedAt: '2026-02-10T08:15:00Z',
  },
  {
    id: 'CMP-2026-004', tin: '5566778899', fullName: 'Fatima Yusuf', contact: '+251944556677',
    details: 'Staff at the branch office were unhelpful during my visit.',
    category: 'Service Delivery', subcategory: 'Staff Behavior', status: 'Assigned',
    assignedOfficer: '4', directorate: 'Taxpayer Services',
    createdAt: '2026-02-08T13:00:00Z', updatedAt: '2026-02-09T10:30:00Z',
  },
  {
    id: 'CMP-2026-005', tin: '6677889900', fullName: 'Michael Tesfaye', contact: '+251955667788',
    details: 'Withholding tax amount is incorrectly calculated on my payslip.',
    category: 'Tax Assessment', subcategory: 'Withholding Tax', status: 'Responded',
    assignedOfficer: '5', directorate: 'Domestic Tax',
    createdAt: '2026-01-25T07:45:00Z', updatedAt: '2026-02-11T09:00:00Z',
  },
];

export const mockAssessments: Assessment[] = [
  { id: 'ASS-001', complaintId: 'CMP-2026-001', assessedBy: '4', type: 'officer', content: 'Reviewed tax filing. Found discrepancy in reported income vs employer records.', createdAt: '2026-01-28T10:00:00Z' },
  { id: 'ASS-002', complaintId: 'CMP-2026-002', assessedBy: '5', type: 'officer', content: 'All refund documents verified. Amount eligible for refund confirmed.', createdAt: '2026-02-03T11:30:00Z' },
  { id: 'ASS-003', complaintId: 'CMP-2026-005', assessedBy: '6', type: 'directorate', content: 'Confirmed withholding tax calculation error. Correction issued.', createdAt: '2026-02-08T14:00:00Z' },
];

export const mockResponses: Response[] = [
  { id: 'RES-001', complaintId: 'CMP-2026-005', respondedBy: '5', content: 'Dear Mr. Tesfaye, the withholding tax error has been corrected. Your updated tax certificate is available.', sentToUser: true, createdAt: '2026-02-11T09:00:00Z' },
];
