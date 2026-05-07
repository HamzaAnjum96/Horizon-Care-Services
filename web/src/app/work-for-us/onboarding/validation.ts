import type { OnboardingData } from './types'

export type ValidationErrors = Record<string, string>

const NI_REGEX = /^[A-CEGHJ-PR-TW-Z][A-CEGHJ-NPR-TW-Z]\d{6}[A-D]$/i
const POSTCODE_REGEX = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^[\d\s+()-]{7,}$/
const SORT_CODE_REGEX = /^\d{6}$/
const ACCOUNT_NUMBER_REGEX = /^\d{8}$/

export function validate(data: OnboardingData): ValidationErrors {
  const errors: ValidationErrors = {}

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

  // Emergency contact
  if (!data.emergency.name.trim()) errors['emergency.name'] = 'Emergency contact name is required'
  if (!data.emergency.relationship.trim()) errors['emergency.relationship'] = 'Relationship is required'
  if (!data.emergency.phone.trim()) {
    errors['emergency.phone'] = 'Emergency contact phone is required'
  } else if (!PHONE_REGEX.test(data.emergency.phone.trim())) {
    errors['emergency.phone'] = 'Enter a valid phone number'
  }

  // Bank details
  if (!data.bank.accountName.trim()) errors['bank.accountName'] = 'Account name is required'
  const sortCodeStripped = data.bank.sortCode.replace(/[-\s]/g, '')
  if (!sortCodeStripped) {
    errors['bank.sortCode'] = 'Sort code is required'
  } else if (!SORT_CODE_REGEX.test(sortCodeStripped)) {
    errors['bank.sortCode'] = 'Enter a valid 6-digit sort code (e.g. 01-02-03)'
  }
  const accountNumStripped = data.bank.accountNumber.replace(/\s/g, '')
  if (!accountNumStripped) {
    errors['bank.accountNumber'] = 'Account number is required'
  } else if (!ACCOUNT_NUMBER_REGEX.test(accountNumStripped)) {
    errors['bank.accountNumber'] = 'Enter a valid 8-digit account number'
  }
  if (!data.bank.bankName.trim()) errors['bank.bankName'] = 'Bank / building society name is required'

  // Payroll
  if (!data.payroll.niNumber.trim()) {
    errors['payroll.niNumber'] = 'National Insurance number is required'
  } else if (!NI_REGEX.test(data.payroll.niNumber.replace(/\s+/g, ''))) {
    errors['payroll.niNumber'] = 'Enter a valid UK National Insurance number'
  }
  if (!data.payroll.starterDeclaration) {
    errors['payroll.starterDeclaration'] = 'Starter declaration is required for HMRC payroll setup'
  }

  // Contract
  if (!data.contract.earliestStart) {
    errors['contract.earliestStart'] = 'Earliest available start date is required'
  }

  // Availability
  if (!data.availability.days.length) {
    errors['availability.days'] = 'Please select at least one available day'
  }

  // Declaration
  if (!data.declaration.accuracy) {
    errors['declaration.accuracy'] = 'You must confirm the information is accurate'
  }
  if (!data.declaration.dataConsent) {
    errors['declaration.dataConsent'] = 'Consent for data processing is required'
  }
  if (!data.declaration.signature.trim()) errors['declaration.signature'] = 'Signature is required'
  if (!data.declaration.date) errors['declaration.date'] = 'Date is required'

  return errors
}
