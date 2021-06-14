import * as fs from 'fs'
import { join, resolve } from 'path'

const dataPath = '../assets/data.json'

interface FileMeta {
  isDir: boolean
  pathname: string
  files?: FileMeta[]
}

type Files = FileMeta[]

function generateFileList(path: string): Files {
  const result: Files = []
  const fileList = fs.readdirSync(path)

  fileList.map((val) => {
    const file = join(path, val)
    const stats = fs.statSync(file)

    if (stats.isDirectory()) {
      result.push({
        isDir: true,
        pathname: val,
        files: generateFileList(file),
      })
    } else if (stats.isFile()) {
      result.push({
        isDir: false,
        pathname: val,
      })
    }

    return undefined
  })

  return result
}

const files = generateFileList(resolve(__dirname, '../repo'))

fs.writeFile(dataPath, JSON.stringify({ pathname: '/', files }), (err) => {
  if (err) {
    console.error(err)
  } else {
    console.log('Complete!')
  }
})

export { FileMeta, Files }
