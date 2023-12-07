import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export function Signout( props ) {
  const nav = useNavigate()

  useEffect(() => {
    props.handler()
    nav("/")
  })

  return
}