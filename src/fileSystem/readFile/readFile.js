import { promises as fs } from 'fs'

export async function readFile({ path, encoding }) {
    const data = await fs.readFile(path, {
        encoding,
    })
    return data
}
