import { translationSymmetry } from './translation'
import { rotation90Symmetry } from './rotation90'
import { rotation180Symmetry } from './rotation180'

export const symmetries = {
  translation: translationSymmetry,
  rotation90: rotation90Symmetry,
  rotation180: rotation180Symmetry,
}

export const symmetryOptions = Object.values(symmetries).map(s => ({
  value: s.id,
  label: s.name
}))