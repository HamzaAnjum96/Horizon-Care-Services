// Expression of Interest — the lightweight first-stage form gathered just
// before formal onboarding. Deliberately short: name, address, contact,
// the position applied for, and a CV (attached to the follow-up email).
export type ExpressionData = {
  fullName: string
  position: string
  contact: {
    email: string
    phone: string
  }
  address: {
    line1: string
    line2: string
    town: string
    county: string
    postcode: string
  }
  cvFileName: string
  consent: boolean
}

export function emptyExpression(position = ''): ExpressionData {
  return {
    fullName: '',
    position,
    contact: { email: '', phone: '' },
    address: { line1: '', line2: '', town: '', county: '', postcode: '' },
    cvFileName: '',
    consent: false,
  }
}
