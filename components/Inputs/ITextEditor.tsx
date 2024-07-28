'use client'
import { useRef, useMemo } from 'react'
import JoditEditor from 'jodit-react'

// type DeepPartial<T> = T extends object
//   ? {
//       [P in keyof T]?: DeepPartial<T[P]>
//     }
//   : T

interface Props {
  value: string
  placeholder: string
  setValue: ( val: string ) => void
}
const ITextEditor = ( {
  value,
  setValue,
  placeholder = 'Start typings...',
  ...props
}: Props ) => {
  const editor = useRef( null )
  // const [content, setContent] = useState( '' )

  const config = useMemo( () => {
    return {
      readonly    : false, // all options from https://xdsoft.net/jodit/docs/,
      tabIndex    : 1,
      placeholder : placeholder,
      ...props,
    }
  }, [] )

  return (
    <JoditEditor
      className="!text-dark"
      ref={editor}
      value={value}
      config={config}
      // tabIndex={1} // tabIndex of textarea
      // onBlur={( newContent ) => setValue( newContent )} // preferred to use only this option to update the content for performance reasons
      onChange={( newContent ) => setValue( newContent )}
    />
  )
}

export default ITextEditor
