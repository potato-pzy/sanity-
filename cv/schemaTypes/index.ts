import {documentTypes} from './documents'
import {objectTypes} from './objects'

export const schemaTypes = [...documentTypes, ...objectTypes]

export * from './documents'
export * from './objects'
