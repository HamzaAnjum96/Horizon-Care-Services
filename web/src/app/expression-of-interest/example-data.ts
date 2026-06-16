import type { ExpressionData } from './types'

// Realistic example data for the "Fill with test data" QA button.
export function exampleExpression(position = ''): ExpressionData {
  return {
    fullName: 'Amelia Rose Carter',
    position: position || 'Support Worker',
    contact: {
      email: 'amelia.carter@example.co.uk',
      phone: '07700 900123',
    },
    address: {
      line1: '12 Acacia Avenue',
      line2: 'Flat 3',
      town: 'Luton',
      county: 'Bedfordshire',
      postcode: 'LU1 2AB',
    },
    cvFileName: 'Amelia-Carter-CV.pdf',
    consent: true,
  }
}
