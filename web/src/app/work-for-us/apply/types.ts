export type ApplicationData = {
  role: {
    code: string
    title: string
  }
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
  rightToWork: {
    nationality: string
    hasRightToWork: 'yes' | 'no' | ''
    rightToWorkBasis: string
    visaStatus: string
    visaExpiry: string
    documentType: 'brp' | 'evisa' | 'share-code' | 'passport' | 'other' | ''
    documentRef: string
    shareCode: string
  }
  identification: {
    niNumber: string
    siaApplicable: 'yes' | 'no' | ''
    siaNumber: string
    siaExpiry: string
  }
  dbs: {
    status: 'yes' | 'no' | 'pending' | ''
    certificateNumber: string
    issueDate: string
    onUpdateService: 'yes' | 'no' | ''
  }
  driving: {
    hasLicence: 'yes' | 'no' | ''
    licenceType: string
    penaltyPoints: string
    hasVehicle: 'yes' | 'no' | ''
    businessInsurance: 'yes' | 'no' | 'na' | ''
  }
  experience: {
    yearsInCare: string
    settings: string[]
    summary: string
  }
  employment: EmploymentEntry[]
  education: EducationEntry[]
  training: {
    items: string[]
    other: string
  }
  skills: {
    list: string[]
    languages: string
    availableDays: string[]
    shiftPreferences: string[]
    earliestStart: string
    additionalNotes: string
  }
  references: ReferenceEntry[]
  emergency: {
    name: string
    relationship: string
    phone: string
    email: string
  }
  declarations: {
    convictions: 'yes' | 'no' | ''
    convictionsDetail: string
    safeguarding: 'yes' | 'no' | ''
    safeguardingDetail: string
    healthCondition: 'yes' | 'no' | ''
    healthDetail: string
    fitToWork: boolean
    accuracy: boolean
    signature: string
    signatureDate: string
  }
  consent: {
    dataProcessing: boolean
    referenceCheck: boolean
    dbsCheck: boolean
  }
}

export type EmploymentEntry = {
  employer: string
  role: string
  from: string
  to: string
  current: boolean
  reasonForLeaving: string
  responsibilities: string
}

export type EducationEntry = {
  institution: string
  qualification: string
  year: string
  grade: string
}

export type ReferenceEntry = {
  name: string
  role: string
  organisation: string
  relationship: string
  email: string
  phone: string
  yearsKnown: string
}

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
  'Dementia / Alzheimer’s',
  'Children & young people',
] as const

export const TRAINING_OPTIONS = [
  'Care Certificate (15 standards)',
  'Manual Handling',
  'Safeguarding Adults',
  'Safeguarding Children',
  'Basic Life Support / First Aid',
  'Medication Administration',
  'Infection Prevention & Control',
  'Food Hygiene',
  'Health & Safety',
  'Fire Safety',
  'Equality & Diversity',
  'Mental Capacity Act / DoLS',
  'Dementia Awareness',
  'End of Life Care',
  'Moving & Handling People',
  'PEG / Catheter / Stoma Care',
  'Epilepsy Awareness',
  'Autism Awareness',
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

export function emptyApplication(role: { code: string; title: string }): ApplicationData {
  return {
    role,
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
    rightToWork: {
      nationality: '',
      hasRightToWork: '',
      rightToWorkBasis: '',
      visaStatus: '',
      visaExpiry: '',
      documentType: '',
      documentRef: '',
      shareCode: '',
    },
    identification: { niNumber: '', siaApplicable: '', siaNumber: '', siaExpiry: '' },
    dbs: { status: '', certificateNumber: '', issueDate: '', onUpdateService: '' },
    driving: {
      hasLicence: '',
      licenceType: '',
      penaltyPoints: '',
      hasVehicle: '',
      businessInsurance: '',
    },
    experience: { yearsInCare: '', settings: [], summary: '' },
    employment: [emptyEmployment()],
    education: [emptyEducation()],
    training: { items: [], other: '' },
    skills: {
      list: [],
      languages: '',
      availableDays: [],
      shiftPreferences: [],
      earliestStart: '',
      additionalNotes: '',
    },
    references: [emptyReference(), emptyReference()],
    emergency: { name: '', relationship: '', phone: '', email: '' },
    declarations: {
      convictions: '',
      convictionsDetail: '',
      safeguarding: '',
      safeguardingDetail: '',
      healthCondition: '',
      healthDetail: '',
      fitToWork: false,
      accuracy: false,
      signature: '',
      signatureDate: '',
    },
    consent: { dataProcessing: false, referenceCheck: false, dbsCheck: false },
  }
}

export function emptyEmployment(): EmploymentEntry {
  return {
    employer: '',
    role: '',
    from: '',
    to: '',
    current: false,
    reasonForLeaving: '',
    responsibilities: '',
  }
}

export function emptyEducation(): EducationEntry {
  return { institution: '', qualification: '', year: '', grade: '' }
}

export function emptyReference(): ReferenceEntry {
  return {
    name: '',
    role: '',
    organisation: '',
    relationship: '',
    email: '',
    phone: '',
    yearsKnown: '',
  }
}
