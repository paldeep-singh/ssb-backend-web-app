import { FC, ChangeEvent } from 'react'
import { camelCase } from 'lodash'

export const TextInput: FC<{
  label: string
  name?: string
  onChange: (ChangeEvent: ChangeEvent<HTMLInputElement>) => void
}> = ({ label, name, onChange }) => {
  return (
    <div className="block">
      <label>{label}</label>
      <input
        name={name || camelCase(label)}
        type="text"
        className="border-purple-700 border-2 ml-2"
        onChange={onChange}
      />
    </div>
  )
}
