export type OnboardingData = {
  personal: {
    title: string
    firstName: string
    middleNames: string
    surname: string
    preferredName: string
    dob: string
    gender: string
    pronouns: string
  }
  contact: {
    email: string
    mobile: string
    telephone: string
  }
  address: {
    line1: string
    line2: string
    town: string
    county: string
    postcode: string
    yearsAtAddress: string
    previousAddress: string
  }
  emergency: {
    name: string
    relationship: string
    phone: string
    email: string
  }
  bank: {
    accountName: string
    sortCode: string
    accountNumber: string
    bankName: string
  }
  payroll: {
    niNumber: string
    // HMRC starter declaration (equivalent of P46):
    // A = First job since 6 Apr, no state benefits / occupational pension
    // B = Only job now but had another since 6 Apr, or received state benefit / pension
    // C = Have another job or receive a state / occupational pension
    starterDeclaration: 'A' | 'B' | 'C' | ''
    studentLoan: 'yes' | 'no' | ''
    studentLoanPlan: 'plan1' | 'plan2' | 'plan4' | 'postgrad' | ''
    hasPreviousP45: 'yes' | 'no' | ''
  }
  contract: {
    type: 'zero-hours' | 'part-time' | 'full-time' | ''
    hoursMin: string
    hoursMax: string
    earliestStart: string
  }
  availability: {
    days: string[]
    shifts: string[]
  }
  preferences: {
    settings: string[]
    skills: string[]
    additionalNotes: string
  }
  transport: {
    hasCar: 'yes' | 'no' | ''
    businessInsurance: 'yes' | 'no' | 'na' | ''
    maxTravelMiles: string
    usesPublicTransport: 'yes' | 'no' | ''
  }
  declaration: {
    accuracy: boolean
    dataConsent: boolean
    signature: string
    date: string
  }
}

export function emptyOnboarding(): OnboardingData {
  return {
    personal: {
      title: '',
      firstName: '',
      middleNames: '',
      surname: '',
      preferredName: '',
      dob: '',
      gender: '',
      pronouns: '',
    },
    contact: { email: '', mobile: '', telephone: '' },
    address: {
      line1: '',
      line2: '',
      town: '',
      county: '',
      postcode: '',
      yearsAtAddress: '',
      previousAddress: '',
    },
    emergency: { name: '', relationship: '', phone: '', email: '' },
    bank: { accountName: '', sortCode: '', accountNumber: '', bankName: '' },
    payroll: {
      niNumber: '',
      starterDeclaration: '',
      studentLoan: '',
      studentLoanPlan: '',
      hasPreviousP45: '',
    },
    contract: { type: 'zero-hours', hoursMin: '', hoursMax: '', earliestStart: '' },
    availability: { days: [], shifts: [] },
    preferences: { settings: [], skills: [], additionalNotes: '' },
    transport: { hasCar: '', businessInsurance: '', maxTravelMiles: '', usesPublicTransport: '' },
    declaration: { accuracy: false, dataConsent: false, signature: '', date: '' },
  }
}

export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const

export const SHIFT_OPTIONS = [
  'Early',
  'Late',
  'Long day',
  'Night',
  'Weekend',
  'Sleep-in',
  'Live-in',
  'Bank / ad-hoc',
] as const

export const SETTINGS_OPTIONS = [
  'Hospital / acute',
  'Nursing home',
  'Residential care',
  'Supported living',
  'Domiciliary / home care',
  'Community / outreach',
  'Hospice / end-of-life',
  'Mental health',
  'Learning disabilities',
  'Dementia / Alzheimer's',
  'Children & young people',
] as const

export const SKILL_OPTIONS = [
  'Personal care',
  'Medication support',
  'Dementia care',
  'Catheter care',
  'PEG feeding',
  'End-of-life care',
  'Behaviours that challenge',
  'Hoist / mobility aids',
  'Care planning',
  'Record keeping',
  'Lone working',
  'Team working',
] as const
