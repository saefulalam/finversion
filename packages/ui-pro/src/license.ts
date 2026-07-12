export interface FvUiConfig {
  pro?: boolean
  license?: string
}

const LICENSE_REGEX = /^FVUI-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/

export function validateLicense(key: string): boolean {
  if (!key) return false
  return LICENSE_REGEX.test(key)
}

export function isProEnabled(config: FvUiConfig): boolean {
  if (!config.pro || !config.license) return false
  return validateLicense(config.license)
}

let _config: FvUiConfig = {}

export function setConfig(config: FvUiConfig): void {
  _config = config
}

export function getConfig(): FvUiConfig {
  return _config
}

export function checkPro(): boolean {
  return isProEnabled(_config)
}