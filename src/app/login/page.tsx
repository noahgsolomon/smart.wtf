import React from 'react'
import { SignIn } from '@clerk/nextjs'

const LoginPage = () => {

  return (
    <div className='h-[calc(100vh-10rem)] flex items-center justify-center'>
      <SignIn
      appearance={{
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
      }}
      />
    </div>
    
  )
}

export default LoginPage;