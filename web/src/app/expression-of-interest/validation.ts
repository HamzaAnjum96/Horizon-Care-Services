import type { ExpressionData } from './types'

export type ValidationErrors = Record<string, string>

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^[\d\s+()-]{7,}$/
const POSTCODE_REGEX = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i

export function validate(data: ExpressionData): ValidationErrors {
  const errors: ValidationErrors = {}

  if (!data.fullName.trim()) errors['fullName'] = 'Your full name is required'
  if (!data.position.trim()) errors['position'] = 'Please tell us the position you’re applying for'

  if (!data.contact.email.trim()) {
    errors['contact.email'] = 'Email is required'
  } else if (!EMAIL_REGEX.test(data.contact.email.trim())) {
    errors['contact.email'] = 'Enter a valid email address'
  }

  if (!data.contact.phone.trim()) {
    errors['contact.phone'] = 'Phone number is required'
  } else if (!PHONE_REGEX.test(data.contact.phone.trim())) {
    errors['contact.phone'] = 'Enter a valid phone number'
  }

  if (!data.address.line1.trim()) errors['address.line1'] = 'Address line 1 is required'
  if (!data.address.town.trim()) errors['address.town'] = 'Town / city is required'
  if (!data.address.postcode.trim()) {
    errors['address.postcode'] = 'Postcode is required'
  } else if (!POSTCODE_REGEX.test(data.address.postcode.trim())) {
    errors['address.postcode'] = 'Enter a valid UK postcode'
  }

  if (!data.cvFileName.trim()) {
    errors['cvFileName'] = 'Please attach your CV'
  }

  if (!data.consent) {
    errors['consent'] = 'Consent for data processing is required'
  }

  return errors
}
