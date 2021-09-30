// @ts-ignore

declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      UPYUN_SERVICE?: string
      UPYUN_OPERATOR?: string
      UPYUN_PASSWORD?: string
    }
  }
}

interface UpyunSdk {
  service: string
  operator: string
  password: string
}

type SDKs = UpyunSdk

type StorageTypes = 'upyun'

interface Config<S extends SDKs> {
  storage: StorageTypes
  host: string
  apiConfig?: S
}

export { Config as EpiphyllumConfig, SDKs, UpyunSdk }
