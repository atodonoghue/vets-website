import {
  evidenceTypeHelp,
  noEvidenceDescription
} from '../content/evidenceTypes';

export const uiSchema = {
  'view:hasEvidence': {
    'ui:title': 'Do you have any evidence that you’d like to submit with your claim?',
    'ui:widget': 'yesNo'
  },
  'view:hasEvidenceFollowUp': {
    'ui:options': {
      expandUnder: 'view:hasEvidence'
    },
    'view:selectableEvidenceTypes': {
      'ui:title': ' ',
      'ui:description': 'What type of evidence do you want to submit with your claim?',
      'view:hasVAMedicalRecords': { 'ui:title': 'VA medical records' },
      'view:hasPrivateMedicalRecords': { 'ui:title': 'Private medical records' },
      'view:hasOtherEvidence': { 'ui:title': 'Supporting (lay) statements or other evidence' }
    },
    'view:evidenceTypeHelp': {
      'ui:description': evidenceTypeHelp
    }
  },
  'view:noEvidenceFollowUp': {
    'ui:title': ' ',
    'ui:description': noEvidenceDescription,
    'ui:options': {
      expandUnder: 'view:hasEvidence',
      expandUnderCondition: false
    }
  }
};

export const schema = {
  type: 'object',
  properties: {
    'view:hasEvidence': {
      type: 'boolean'
    },
    'view:hasEvidenceFollowUp': {
      type: 'object',
      properties: {
        'view:selectableEvidenceTypes': {
          type: 'object',
          properties: {
            'view:hasVAMedicalRecords': { type: 'boolean' },
            'view:hasPrivateMedicalRecords': { type: 'boolean' },
            'view:hasOtherEvidence': { type: 'boolean' }
          }
        },
        'view:evidenceTypeHelp': {
          type: 'object',
          properties: {}
        }
      }
    },
    'view:noEvidenceFollowUp': {
      type: 'object',
      properties: {}
    }
  }
};
