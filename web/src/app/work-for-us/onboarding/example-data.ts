import type { OnboardingData } from './types'

export function exampleOnboarding(): OnboardingData {
  const today = new Date().toISOString().slice(0, 10)
  const nextWeek = (() => {
    const d = new Date()
    d.setDate(d.getDate() + 7)
    return d.toISOString().slice(0, 10)
  })()

  return {
    personal: {
      title: 'Ms',
      firstName: 'Amelia',
      middleNames: 'Rose',
      surname: 'Carter',
      preferredName: 'Amelia',
      dob: '1992-04-18',
      sex: 'female',
      gender: 'Female',
      pronouns: 'she/her',
      employmentStartDate: nextWeek,
    },
    contact: {
      email: 'amelia.carter@example.co.uk',
      mobile: '07700 900123',
      telephone: '01582 123456',
    },
    address: {
      line1: '12 Acacia Avenue',
      line2: 'Flat 3',
      town: 'Luton',
      county: 'Bedfordshire',
      postcode: 'LU1 2AB',
      country: 'England',
      yearsAtAddress: '4',
      previousAddress: '',
    },
    emergency: {
      name: 'Robert Carter',
      relationship: 'Father',
      phone: '07700 900456',
      email: 'robert.carter@example.co.uk',
    },
    bank: {
      accountName: 'Amelia Rose Carter',
      sortCode: '200000',
      accountNumber: '55779911',
      bankName: 'Barclays',
    },
    payroll: {
      niNumber: 'AB123456C',
      starterDeclaration: 'A',
      studentLoan: 'no',
      studentLoanPlan: '',
      studentLoanNotRepaying: '',
      hasPreviousP45: 'no',
    },
    contract: {
      type: 'zero-hours',
      hoursMin: '',
      hoursMax: '40',
      earliestStart: nextWeek,
    },
    availability: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      shifts: ['Early', 'Late', 'Long day'],
    },
    preferences: {
      settings: ['Nursing home', 'Domiciliary / home care', "Dementia / Alzheimer's"],
      skills: ['Personal care', 'Medication support', 'Dementia care', 'Record keeping'],
      additionalNotes: 'Happy to take on extra shifts at short notice. Prefer not to work lone nights.',
    },
    transport: {
      hasCar: 'yes',
      businessInsurance: 'yes',
      maxTravelMiles: '15',
      usesPublicTransport: 'no',
    },
    declaration: {
      accuracy: true,
      dataConsent: true,
      signature: 'Amelia Rose Carter',
      date: today,
    },
  }
}
