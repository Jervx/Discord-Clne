import React from 'react'

type Props = { children : React.ReactNode}

const AuthLayout = (props: Props) => {
  return (
    <div className='h-full bg-red-400'>{props.children}</div>
  )
}

export default AuthLayout