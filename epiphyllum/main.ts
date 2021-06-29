import { awaitHelper, E, DirectoryMap } from './utils'
import { getUSSDirectoryTree } from '~/epiphyllum/upyun'
import { UpyunSdk, EpiphyllumConfig, SDKs } from '~/epiphyllum/types'

async function main(): Promise<DirectoryMap> {
  // @ts-ignore
  const [importErr, module] = await awaitHelper(import('../epiphyllum.config'))

  if (!module) {
    throw E(importErr)
  }

  const config: EpiphyllumConfig<SDKs> = module.default

  let result: DirectoryMap | null
  let treeError: string = 'Unknown error'

  switch (config.storage) {
    case 'upyun': {
      const upyunEnv: UpyunSdk = {
        service: process.env.UPYUN_SERVICE ?? '',
        operator: process.env.UPYUN_OPERATOR ?? '',
        password: process.env.UPYUN_PASSWORD ?? '',
      }

      const apiConfig: UpyunSdk = (config.apiConfig as UpyunSdk) ?? upyunEnv
      ;[treeError, result] = await awaitHelper(getUSSDirectoryTree(apiConfig))
    }
  }

  if (!result) {
    throw E(treeError)
  }

  return result
}

export { main as EpiphyllumEntry }
