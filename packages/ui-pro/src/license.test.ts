import { describe, it, expect } from 'vitest'
import { validateLicense, isProEnabled, setConfig, getConfig, checkPro } from './license'

describe('license validation', () => {
  it('validates correct license format', () => {
    expect(validateLicense('FVUI-ABCD-1234-EFGH')).toBe(true)
    expect(validateLicense('FVUI-0000-AAAA-ZZZZ')).toBe(true)
  })

  it('rejects incorrect license format', () => {
    expect(validateLicense('')).toBe(false)
    expect(validateLicense('FVUI-ABCD-1234')).toBe(false)
    expect(validateLicense('FVUI-ABCD-1234-EFGH-IJKL')).toBe(false)
    expect(validateLicense('fvui-abcd-1234-efgh')).toBe(false)
  })

  it('isProEnabled returns false when pro or license missing', () => {
    expect(isProEnabled({})).toBe(false)
    expect(isProEnabled({ pro: true })).toBe(false)
    expect(isProEnabled({ license: 'FVUI-ABCD-1234-EFGH' })).toBe(false)
  })

  it('isProEnabled returns true when pro and valid license', () => {
    expect(isProEnabled({ pro: true, license: 'FVUI-ABCD-1234-EFGH' })).toBe(true)
  })

  it('setConfig and getConfig work', () => {
    setConfig({ pro: true, license: 'FVUI-ABCD-1234-EFGH' })
    expect(getConfig()).toEqual({ pro: true, license: 'FVUI-ABCD-1234-EFGH' })
  })

  it('checkPro returns current config status', () => {
    setConfig({})
    expect(checkPro()).toBe(false)
    setConfig({ pro: true, license: 'FVUI-ABCD-1234-EFGH' })
    expect(checkPro()).toBe(true)
  })
})