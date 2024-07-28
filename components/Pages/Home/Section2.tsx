import TextQuote from '@/components/Texts/TextQuote'
import Image from 'next/image'
import React, { FunctionComponent } from 'react'

interface Props{
	quote: string
}
const Section2: FunctionComponent<Props> = ( props ) => {
  const { quote } = props
	
  return (
    <section id="quote"
      className="main__section h-fit bg-dark-secondary"
    >
      <div className="main__container my-8 h-full">
        <div className="bg-dark h-full border border-none rounded-3xl bg-plus bg-contain  bg-center flex justify-center items-center p-4 md:p-10 ">
          <div className="h-fit p-8 md:p-14 relative">
            <Image
              src="/quote.svg"
              alt="Quote icon"
              className="absolute top-0 left-0 w-8 h-8 md:w-[52px] md:h-[52px]"
              width={0}
              height={0}
              priority
            />
            <TextQuote quote={quote} />
            <Image
              src="/quote.svg"
              className="absolute bottom-0 right-0 w-8 h-8 md:w-[52px] md:h-[52px]"
              width={0}
              height={0}
              alt="Quote icon"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Section2
