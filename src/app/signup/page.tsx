import React from 'react'
import { SignUp } from '@clerk/nextjs'


const SignUpPage = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <SignUp appearance={{
        elements: {
          alertText: 'text-primary',  
          card: ' rounded-lg border border-border bg-card',
          headerTitle: 'text-primary',
          headerSubtitle: 'text-primary opacity-60',
          socialButtonsBlockButton: 'rounded-lg py-3 border border-secondary hover:bg-secondary',
          socialButtonsBlockButtonText: 'text-secondary-foreground',
          footerActionText: 'text-primary opacity-40',
          footerActionLink: 'transition-all',
        }
      }}/>
    </div>
    
  )
}

export default SignUpPage;