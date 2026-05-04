import type { ApplicationData } from './types'

export type ValidationErrors = Record<string, string>

const NI_REGEX = /^[A-CEGHJ-PR-TW-Z][A-CEGHJ-NPR-TW-Z]\d{6}[A-D]$/i
const POSTCODE_REGEX = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^[\d\s+()-]{7,}$/

export function validate(data: ApplicationData): ValidationErrors {
  const errors: ValidationErrors = {}

  // Role
  if (!data.role.code.trim()) errors['role.code'] = 'Role code is required'
  if (!data.role.title.trim()) errors['role.title'] = 'Role title is required'

  // Personal
  if (!data.personal.firstName.trim()) errors['personal.firstName'] = 'First name is required'
  if (!data.personal.surname.trim()) errors['personal.surname'] = 'Surname is required'
  if (!data.personal.dob) errors['personal.dob'] = 'Date of birth is required'

  // Contact
  if (!data.contact.email.trim()) {
    errors['contact.email'] = 'Email is required'
  } else if (!EMAIL_REGEX.test(data.contact.email.trim())) {
    errors['contact.email'] = 'Enter a valid email address'
  }
  if (!data.contact.mobile.trim()) {
    errors['contact.mobile'] = 'Mobile number is required'
  } else if (!PHONE_REGEX.test(data.contact.mobile.trim())) {
    errors['contact.mobile'] = 'Enter a valid phone number'
  }

  // Address
  if (!data.address.line1.trim()) errors['address.line1'] = 'Address line 1 is required'
  if (!data.address.town.trim()) errors['address.town'] = 'Town / city is required'
  if (!data.address.postcode.trim()) {
    errors['address.postcode'] = 'Postcode is required'
  } else if (!POSTCODE_REGEX.test(data.address.postcode.trim())) {
    errors['address.postcode'] = 'Enter a valid UK postcode'
  }

  // Right to work
  if (!data.rightToWork.nationality.trim()) {
    errors['rightToWork.nationality'] = 'Nationality is required'
  } else if (
    data.rightToWork.nationality === 'Other' &&
    !data.rightToWork.nationalityOther.trim()
  ) {
    errors['rightToWork.nationalityOther'] = 'Please enter your nationality'
  }
  if (!data.rightToWork.hasRightToWork)
    errors['rightToWork.hasRightToWork'] = 'Please confirm your right to work in the UK'
  if (data.rightToWork.hasRightToWork === 'yes' && !data.rightToWork.documentType) {
    errors['rightToWork.documentType'] = 'Please indicate the document evidencing right to work'
  }
  if (
    data.rightToWork.documentType === 'share-code' &&
    !data.rightToWork.shareCode.trim()
  ) {
    errors['rightToWork.shareCode'] = 'Share code is required when this option is selected'
  }
  if (
    (data.rightToWork.documentType === 'brp' || data.rightToWork.documentType === 'evisa') &&
    !data.rightToWork.documentRef.trim()
  ) {
    errors['rightToWork.documentRef'] = 'Document reference is required'
  }

  // Identification — NI required
  if (!data.identification.niNumber.trim()) {
    errors['identification.niNumber'] = 'National Insurance number is required'
  } else if (!NI_REGEX.test(data.identification.niNumber.replace(/\s+/g, ''))) {
    errors['identification.niNumber'] = 'Enter a valid UK National Insurance number'
  }

  // DBS
  if (!data.dbs.status) errors['dbs.status'] = 'Please indicate your DBS status'

  // Driving
  if (!data.driving.hasLicence) errors['driving.hasLicence'] = 'Please indicate driving licence status'
  if (!data.driving.hasVehicle) errors['driving.hasVehicle'] = 'Please indicate vehicle access'

  // Experience
  if (!data.experience.yearsInCare.trim())
    errors['experience.yearsInCare'] = 'Years of experience is required'
  if (!data.experience.summary.trim() || data.experience.summary.trim().length < 30) {
    errors['experience.summary'] = 'Please provide at least a short paragraph (30+ characters)'
  }

  // Employment — at least one with employer
  const firstEmp = data.employment[0]
  if (!firstEmp || !firstEmp.employer.trim() || !firstEmp.role.trim()) {
    errors['employment.0'] = 'At least one employment entry is required (most recent)'
  }

  // References — currently hidden in the UI. Re-enable by setting
  // SHOW_REFERENCES=true in apply-client.tsx. Validation kept here in case.
  // data.references.forEach((ref, i) => {
  //   if (!ref.name.trim()) errors[`references.${i}.name`] = 'Referee name is required'
  //   if (!ref.organisation.trim())
  //     errors[`references.${i}.organisation`] = 'Organisation is required'
  //   if (!ref.email.trim() && !ref.phone.trim()) {
  //     errors[`references.${i}.contact`] = 'Provide at least an email or a phone number'
  //   }
  //   if (ref.email.trim() && !EMAIL_REGEX.test(ref.email.trim())) {
  //     errors[`references.${i}.email`] = 'Enter a valid email address'
  //   }
  // })

  // Emergency
  if (!data.emergency.name.trim()) errors['emergency.name'] = 'Emergency contact name is required'
  if (!data.emergency.phone.trim()) errors['emergency.phone'] = 'Emergency contact phone is required'
  if (!data.emergency.relationship.trim())
    errors['emergency.relationship'] = 'Relationship is required'

  // Declarations
  if (!data.declarations.convictions)
    errors['declarations.convictions'] = 'Required declaration'
  if (data.declarations.convictions === 'yes' && !data.declarations.convictionsDetail.trim())
    errors['declarations.convictionsDetail'] = 'Please provide details'
  if (!data.declarations.safeguarding)
    errors['declarations.safeguarding'] = 'Required declaration'
  if (data.declarations.safeguarding === 'yes' && !data.declarations.safeguardingDetail.trim())
    errors['declarations.safeguardingDetail'] = 'Please provide details'
  if (!data.declarations.healthCondition)
    errors['declarations.healthCondition'] = 'Required declaration'
  if (data.declarations.healthCondition === 'yes' && !data.declarations.healthDetail.trim())
    errors['declarations.healthDetail'] = 'Please provide details'
  if (!data.declarations.fitToWork)
    errors['declarations.fitToWork'] = 'You must confirm fitness to work'
  if (!data.declarations.accuracy)
    errors['declarations.accuracy'] = 'You must confirm accuracy of information'
  if (!data.declarations.signature.trim())
    errors['declarations.signature'] = 'Signature is required'
  if (!data.declarations.signatureDate)
    errors['declarations.signatureDate'] = 'Date is required'

  // Consent — data processing required (lawful basis)
  if (!data.consent.dataProcessing)
    errors['consent.dataProcessing'] = 'Consent for data processing is required'

  return errors
}
