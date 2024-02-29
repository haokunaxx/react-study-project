import { Link as OriginalLink, type LinkProps } from 'react-router-dom'

export const Link = (props: LinkProps) => {
  return (
    <div
      style={{
        display: 'inline-block',
        margin: '12px'
      }}
    >
      <OriginalLink {...props}></OriginalLink>
    </div>
  )
}
