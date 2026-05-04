import type { ApplicationData } from './types'

// Realistic example application used by the "Fill with test data" button.
// Keeps testing the form, validation, and PDF output a one-click affair.
export function exampleApplication(role: { code: string; title: string }): ApplicationData {
  const today = new Date().toISOString().slice(0, 10)
  const nextMonth = (() => {
    const d = new Date()
    d.setMonth(d.getMonth() + 1)
    return d.toISOString().slice(0, 10)
  })()

  return {
    role: {
      code: role.code || 'HCS-HCA-001',
      title: role.title || 'Healthcare Assistant',
    },
    personal: {
      title: 'Ms',
      firstName: 'Amelia',
      middleNames: 'Rose',
      surname: 'Carter',
      preferredName: 'Amelia',
      dob: '1992-04-18',
      gender: 'Female',
      pronouns: 'she/her',
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
      yearsAtAddress: '4',
      previousAddress: '',
    },
    rightToWork: {
      nationality: 'British',
      nationalityOther: '',
      hasRightToWork: 'yes',
      rightToWorkBasis: 'British citizen',
      visaStatus: '',
      visaExpiry: '',
      documentType: 'passport',
      documentRef: '987654321',
      shareCode: '',
    },
    identification: {
      niNumber: 'QQ123456C',
    },
    dbs: {
      status: 'yes',
      certificateNumber: '001234567890',
      issueDate: '2024-09-12',
      onUpdateService: 'yes',
    },
    driving: {
      hasLicence: 'yes',
      licenceType: 'Full',
      penaltyPoints: '0',
      hasVehicle: 'yes',
      businessInsurance: 'yes',
    },
    experience: {
      yearsInCare: '6',
      settings: ['Nursing home', 'Domiciliary / home care', 'Dementia / Alzheimer’s'],
      summary:
        'Six years across nursing-home and domiciliary settings, primarily supporting older adults with dementia and complex needs. Comfortable lone-working, leading hand-overs, and supporting end-of-life care. Calm under pressure and a steady advocate for the people I support.',
    },
    employment: [
      {
        employer: 'Birch House Nursing Home',
        role: 'Senior Healthcare Assistant',
        from: '2022-01-10',
        to: '',
        current: true,
        reasonForLeaving: '',
        responsibilities:
          'Lead HCA on a 28-bed dementia unit. Medication support, care planning, family liaison, and induction of new starters.',
      },
      {
        employer: 'Bright Horizons Home Care',
        role: 'Care Worker',
        from: '2019-06-01',
        to: '2021-12-20',
        current: false,
        reasonForLeaving: 'Sought a senior role with leadership responsibility.',
        responsibilities:
          'Domiciliary care across a Luton round of 14 clients: personal care, medication prompts, meal prep, companionship, and detailed daily reporting.',
      },
    ],
    education: [
      {
        institution: 'Bedford College',
        qualification: 'Level 3 Diploma in Adult Care',
        year: '2020',
        grade: 'Distinction',
      },
      {
        institution: 'Luton Sixth Form College',
        qualification: 'A-Levels — Biology, Psychology, English',
        year: '2010',
        grade: 'BBC',
      },
    ],
    training: {
      items: [
        'Care Certificate (15 standards)',
        'Manual Handling',
        'Safeguarding Adults',
        'Basic Life Support / First Aid',
        'Medication Administration',
        'Infection Prevention & Control',
        'Mental Capacity Act / DoLS',
        'Dementia Awareness',
        'End of Life Care',
      ],
      other: 'NAPPI Level 3, Oliver McGowan Mandatory Training (Tier 2).',
    },
    skills: {
      list: [
        'Personal care',
        'Medication support',
        'Dementia care',
        'End-of-life care',
        'Care planning',
        'Record keeping',
        'Lone working',
        'Team working',
      ],
      languages: 'English (native), basic conversational French',
      availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      shiftPreferences: ['Long day', 'Night', 'Weekend'],
      earliestStart: nextMonth,
      additionalNotes:
        'Open to overtime when needed. Prefer to keep Sundays free where possible.',
    },
    references: [
      {
        name: 'Sarah Whitmore',
        role: 'Registered Manager',
        organisation: 'Birch House Nursing Home',
        relationship: 'Line manager',
        email: 'sarah.whitmore@example.co.uk',
        phone: '01582 654321',
        yearsKnown: '4',
      },
      {
        name: 'Daniel Olu',
        role: 'Care Coordinator',
        organisation: 'Bright Horizons Home Care',
        relationship: 'Former line manager',
        email: 'daniel.olu@example.co.uk',
        phone: '01582 555010',
        yearsKnown: '5',
      },
    ],
    emergency: {
      name: 'Robert Carter',
      relationship: 'Father',
      phone: '07700 900456',
      email: 'robert.carter@example.co.uk',
    },
    declarations: {
      convictions: 'no',
      convictionsDetail: '',
      safeguarding: 'no',
      safeguardingDetail: '',
      healthCondition: 'no',
      healthDetail: '',
      fitToWork: true,
      accuracy: true,
      signature: 'Amelia Rose Carter',
      signatureDate: today,
    },
    consent: {
      dataProcessing: true,
      referenceCheck: true,
      dbsCheck: true,
    },
  }
}
