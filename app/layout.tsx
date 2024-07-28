import '@/assets/scss/main.scss'
import type { Metadata } from 'next'
// import { Outfit } from 'next/font/google'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { LandingProvider } from '@/context/LandingContext'
import ReactQueryProvider from '@/components/Context/ReactQueryProvider'
import { Toaster } from 'react-hot-toast'
import GoogleAnalytics from '@/components/GoogleAnalytics'
// const outfit = Outfit( { subsets : ['latin'] } )

config.autoAddCss = false

export const metadata: Metadata = {
  title : 'Ian Febi S',
  description :
    'Front End Web Developer with 1+ year of experience. Expert on React js and Vue js',
}

export default function RootLayout( {
  children,
}: {
  children: React.ReactNode
} ) {
  return (
    <html lang="en">
      <GoogleAnalytics/>
      <ReactQueryProvider>
        <LandingProvider>
          <body suppressHydrationWarning={true}>
            <Toaster
              toastOptions={{
                // icon : (
                // 	<div className="text-20" data-cy="modal-information-icon">
                // 		<ModalInformationIcon />
                // 	</div>
                // ),
                position  : 'top-right',
                className : 'bg-white text-dark text-md',
                style     : {
                  boxShadow : '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  height    : '44px',
                },
              }}
            />
            {children}
          </body>
        </LandingProvider>
      </ReactQueryProvider>
    </html>
  )
}
