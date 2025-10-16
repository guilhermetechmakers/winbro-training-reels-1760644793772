export interface Certificate {
  id: string;
  user_id: string;
  course_id: string;
  course_title: string;
  user_name: string;
  issued_at: string;
  expires_at?: string;
  verification_code: string;
  verification_url: string;
  status: CertificateStatus;
  pdf_url?: string;
  qr_code_url?: string;
  issuer_name: string;
  issuer_signature?: string;
}

export type CertificateStatus = 'active' | 'expired' | 'revoked';

export interface CreateCertificateInput {
  user_id: string;
  course_id: string;
  expires_at?: string;
}

export interface CertificateVerification {
  certificate_id: string;
  is_valid: boolean;
  user_name: string;
  course_title: string;
  issued_at: string;
  expires_at?: string;
  status: CertificateStatus;
  verification_date: string;
}

export interface CertificateTemplate {
  id: string;
  name: string;
  description: string;
  template_html: string;
  background_image_url?: string;
  logo_url?: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}
