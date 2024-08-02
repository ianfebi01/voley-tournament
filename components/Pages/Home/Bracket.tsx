'use client'
import Shape from '@/components/Shape'
import { FunctionComponent, useRef, useState } from 'react';
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

  const { width, height } = useWindowSize()
  // const finalWidth = Math.max( ( width || 0 ) - 50, 500 )
  // const finalHeight = Math.max( ( height || 0 ) - 100, 500 )
  const finalWidth = ( width || 0 ) - 16
  const finalHeight = ( height || 0 ) - 80

  const ref = useRef<HTMLDivElement>( null )
  const parentRef = useRef<HTMLDivElement>( null )

  const [scaleValue, setScaleValue] = useState<number>( 1 )

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

  // const [previousTouch, setPreviousTouch] = useState<any>( null )
  // const touchDown = () => {
  //   const element = ref.current
  //   if ( !element ) return
  //   element.style.cursor = 'grabbing'

  //   element.ontouchmove = ( mouseMoveEvent ) => {
  //     const touch = mouseMoveEvent.touches[0]
  //     if ( previousTouch ) {
  //       const movementX =
  //         Number( touch.pageX.toFixed() ) - Number( previousTouch.pageX.toFixed() )
  //       const movementY =
  //         Number( touch.pageY.toFixed() ) - Number( previousTouch.pageY.toFixed() )

  //       element.style.left = `${element.offsetLeft + movementX}px`
  //       element.style.top = `${element.offsetTop + movementY}px`
  //       console.log(
  //         Number( touch.pageX.toFixed() ) - Number( previousTouch.pageX.toFixed() )
  //       )
  //     }

  //     setPreviousTouch( mouseMoveEvent.touches[0] )
  //     // console.log( element.offsetLeft + Number( touch.pageX.toFixed() ) )
  //     // element.style.left = `${element.offsetLeft + Number( touch.pageX.toFixed() )}px`
  //     // element.style.top = `${element.offsetTop + Number( touch.pageY.toFixed() )}px`
  //   }
  // }

  const mouseUp = () => {
    const parentElement = parentRef.current
    if ( !parentElement ) return
    parentElement.style.cursor = 'grab'
    parentElement.onmousemove = null
  }

  // useEffect( ()=>{

  //   const pointerDown=( e )=>{
  //     console.log( e )

  //   }
  //   ref.current?.addEventListener( 'pointerdown', ( e )=>pointerDown( e ) )

  //   return ()=> ref.current?.removeEventListener( 'pointerdown', ( e )=> pointerDown( e ) )
  // }, [] )

  return (
    <section
      id="home"
      className="main__section !px-0 sm:px-0 md:px-0 bg-dark relative"
    >
      <Shape />
      <div
        ref={parentRef}
        className="relative w-full mx-24 mt-20 overflow-hidden border border-white-overlay cursor-grab"
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
      >
        <div
          ref={ref}
          className="transition-transform duration-200 ease-in-out md:absolute "
        >
          {hasMounted && (
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
              svgWrapper={
          
                ( { children, ...props }: any ) =>      ( width || 0 ) < 768 ? (
                  <SVGViewer
                    background={DarkTheme.svgBackground}
                    SVGBackground={DarkTheme.svgBackground}
                    width={finalWidth}
                    height={finalHeight}
                    {...props}
                  >
                    {children}
                  </SVGViewer>
                ) : children
              }
            />
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
      <div className="flex gap-4"></div>
    </section>
  )
}

export default BracketSection
