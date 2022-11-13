import { FC } from 'react'

const SUBMIT = 'Submit'

export const SubmitButton: FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
  return (
    <button
      className="bg-orange-200 border-4 border-purple-400 p-2 block mx-auto"
      onClick={onSubmit}>
      {SUBMIT}
    </button>
  )
}
