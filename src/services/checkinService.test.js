import { describe, it, expect, beforeEach, vi } from 'vitest'
import { convertCausesToLabels } from './checkinService'

describe('checkinService', () => {
  describe('convertCausesToLabels', () => {
    it('should convert API causes to French labels', () => {
      const apiCauses = ['WORKLOAD', 'RELATIONS', 'MOTIVATION']
      const expected = ['Charge / Rythme', 'Relations / Ambiance', 'Sens / Motivation']
      
      const result = convertCausesToLabels(apiCauses)
      
      expect(result).toEqual(expected)
    })

    it('should handle all valid causes', () => {
      const allCauses = ['WORKLOAD', 'RELATIONS', 'MOTIVATION', 'CLARITY', 'RECOGNITION', 'BALANCE']
      const expected = [
        'Charge / Rythme',
        'Relations / Ambiance',
        'Sens / Motivation',
        'Organisation / Clarté',
        'Reconnaissance',
        'Équilibre pro/perso'
      ]
      
      const result = convertCausesToLabels(allCauses)
      
      expect(result).toEqual(expected)
    })

    it('should return unknown causes as-is', () => {
      const causes = ['WORKLOAD', 'UNKNOWN_CAUSE']
      const result = convertCausesToLabels(causes)
      
      expect(result).toEqual(['Charge / Rythme', 'UNKNOWN_CAUSE'])
    })

    it('should handle empty array', () => {
      const result = convertCausesToLabels([])
      
      expect(result).toEqual([])
    })
  })
})
