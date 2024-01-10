import React from "react"
import { Button } from "@/ui"
import { IconLogin, IconLogout } from "@tabler/icons-react"

function LogoutButton() {
  return (
    <form action='/auth/sign-out' method='post'>
      <Button className='flex items-center gap-1' size='md' type='submit'>
        Log out
        <IconLogout width={20} height={20} />
      </Button>
    </form>
  )
}

function LoginButton() {
  return (
    <form action='/auth/sign-in' method='post'>
      <Button className='flex items-center gap-1' size='md' type='submit'>
        Log in
        <IconLogin width={20} height={20} />
      </Button>
    </form>
  )
}

export { LogoutButton, LoginButton }
