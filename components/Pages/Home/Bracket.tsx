'use client'
import Shape from '@/components/Shape'
import { FunctionComponent, useRef, useState } from 'react'
import {
  SingleEliminationBracket,
  Match,
  SVGViewer,
  createTheme,
} from '@g-loot/react-tournament-brackets'
import useHasMounted from '@/lib/hooks/useHasMounted'
import { useWindowSize } from '@uidotdev/usehooks'
import { IMatches } from '@/types/backend/game'
import Button2 from '@/components/Buttons/Button2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

const DarkTheme = createTheme( {
  textColor       : { main : '#f1f1f1', highlighted : '#f1f1f1', dark : '#f1f1f1bd' },
  matchBackground : { wonColor : '#393939', lostColor : '#393939' },
  score           : {
    background : { wonColor : '#4FAA84', lostColor : '#F26B50' },
    text       : { highlightedWonColor : '#f1f1f1', highlightedLostColor : '#f1f1f1' },
  },
  border : {
    color            : '#222222',
    highlightedColor : '#f1f1f1',
  },
  roundHeader             : { backgroundColor : '#393939', fontColor : '#f1f1f1' },
  connectorColor          : '#f1f1f1aa',
  connectorColorHighlight : '#f1f1f1',
  svgBackground           : '#222222',
} )

const BracketSection: FunctionComponent<{ matches: IMatches[] }> = ( props ) => {
  const hasMounted = useHasMounted()

  const { width } = useWindowSize()
  // const finalWidth = Math.max( ( width || 0 ) - 50, 500 )
  // const finalHeight = Math.max( ( height || 0 ) - 100, 500 )

  const ref = useRef<HTMLDivElement>( null )
  const parentRef = useRef<HTMLDivElement>( null )

  const [, setScaleValue] = useState<number>( 1 )

  const zoomIn = () => {
    const steps = 0.25
    setScaleValue( ( prev ) => {
      const tmp = prev * ( 1 + steps )
      if ( ref.current ) {
        ref.current.style.transform = `scale(${tmp})`
      }

      return tmp
    } )
  }
  const zoomOut = () => {
    const steps = 0.25
    setScaleValue( ( prev ) => {
      const tmp = prev / ( 1 + steps )
      if ( ref.current ) {
        ref.current.style.transform = `scale(${tmp})`
      }

      return tmp
    } )
  }

  const mouseDown = () => {
    const childElement = ref.current
    const parentElement = parentRef.current
    if ( !childElement || !parentElement ) return
    parentElement.style.cursor = 'grabbing'
    parentElement.onmousemove = ( mouseMoveEvent ) => {
      // console.log( element.offsetLeft + mouseMoveEvent.movementX )
      childElement.style.left = `${
        childElement.offsetLeft + mouseMoveEvent.movementX
      }px`
      childElement.style.top = `${
        childElement.offsetTop + mouseMoveEvent.movementY
      }px`
    }
  }

  const mouseUp = () => {
    const parentElement = parentRef.current
    if ( !parentElement ) return
    parentElement.style.cursor = 'grab'
    parentElement.onmousemove = null
  }

  return (
    <section
      id="home"
      className="main__section !px-0 sm:px-0 md:px-0 bg-dark relativ overflow-hidden"
    >
      <Shape />
      <div className='w-full overflow-hidden'>
   
        <div
          ref={parentRef}
          className="relative md:w-full overflow-hidden border border-white-overlay cursor-grab h-[80vh]"
          onMouseDown={mouseDown}
          onMouseUp={mouseUp}
        >
          <div
            ref={ref}
            className="transition-transform duration-200 ease-in-out md:absolute "
          >
            {hasMounted && ( width || 0 ) < 768 ? (
              <SingleEliminationBracket
                matches={props.matches}
                matchComponent={Match}
                theme={DarkTheme}
                options={{
                  style : {
                    roundHeader : {
                      backgroundColor : DarkTheme.roundHeader.backgroundColor,
                      fontColor       : DarkTheme.roundHeader.fontColor,
                    },
                    connectorColor          : DarkTheme.connectorColor,
                    connectorColorHighlight : DarkTheme.connectorColorHighlight,
                  },
                }}
                svgWrapper={( { children, ...props }: any ) => (
                  <SVGViewer
                    background={DarkTheme.svgBackground}
                    SVGBackground={DarkTheme.svgBackground}
                    width={parentRef.current?.offsetWidth}
                    height={parentRef.current?.offsetHeight}
                    {...props}
                  >
                    {children}
                  </SVGViewer>
                )}
              />
            ) : hasMounted ? (
              <SingleEliminationBracket
                matches={props.matches}
                matchComponent={Match}
                theme={DarkTheme}
                options={{
                  style : {
                    roundHeader : {
                      backgroundColor : DarkTheme.roundHeader.backgroundColor,
                      fontColor       : DarkTheme.roundHeader.fontColor,
                    },
                    connectorColor          : DarkTheme.connectorColor,
                    connectorColorHighlight : DarkTheme.connectorColorHighlight,
                  },
                }}
              />
            ) : (
              ''
            )}
          </div>
          <div className="absolute items-center hidden gap-2 md:flex bottom-4 right-4">
            <Button2 variant="primary"
              onClick={() => zoomIn()}
            >
              <FontAwesomeIcon icon={faPlus} />
            </Button2>
            <Button2 variant="primary"
              onClick={() => zoomOut()}
            >
              <FontAwesomeIcon icon={faMinus} />
            </Button2>
          </div>
        </div>
      </div>
      <div className="flex gap-4"></div>
    </section>
  )
}

export default BracketSection
