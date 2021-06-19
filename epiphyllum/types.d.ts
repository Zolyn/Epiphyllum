interface UpyunSdk {
  service: string
  operator: string
  password: string
}

type SDKs = UpyunSdk

type StorageTypes = 'upyun'

interface Config<S extends SDKs> {
  storage: StorageTypes
  apiConfig: S
}

export { Config as EpiphyllumConfig, UpyunSdk }
