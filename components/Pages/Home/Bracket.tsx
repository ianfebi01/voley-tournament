'use client'
import Shape from '@/components/Shape'
import { FunctionComponent } from 'react'
import {
  SingleEliminationBracket,
  Match,
  SVGViewer,
  createTheme,
} from '@g-loot/react-tournament-brackets'
import useHasMounted from '@/lib/hooks/useHasMounted'
import { useWindowSize } from '@uidotdev/usehooks'

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

const BracketSection: FunctionComponent = () => {
  const matches = [
    {
      id                  : 19753,
      name                : 'Final - Match',
      nextMatchId         : null,
      tournamentRoundText : '3',
      startTime           : '2021-05-30',
      state               : 'SCHEDULED',
      participants        : [],
    },
    {
      id                  : 19754,
      nextMatchId         : 19753,
      name                : 'Semi Final - Match',
      tournamentRoundText : '2',
      startTime           : '2021-05-30',
      state               : 'SCHEDULED',
      participants        : [
        {
          id         : '14754a1a-932c-4992-8dec-f7f94a339960',
          resultText : null,
          isWinner   : false,
          status     : null,
          name       : 'CoKe BoYz',
          picture    : 'teamlogos/client_team_default_logo',
        },
      ],
    },
    {
      id                  : 19755,
      nextMatchId         : 19754,
      name                : 'Round 1 - Match',
      tournamentRoundText : '1',
      startTime           : '2021-05-30',
      state               : 'SCORE_DONE',
      participants        : [
        {
          id         : '14754a1a-932c-4992-8dec-f7f94a339960',
          resultText : 'Won',
          isWinner   : true,
          status     : 'PLAYED',
          name       : 'CoKe BoYz',
          picture    : 'teamlogos/client_team_default_logo',
        },
        {
          id         : 'd16315d4-7f2d-427b-ae75-63a1ae82c0a8',
          resultText : 'Lost',
          isWinner   : false,
          status     : 'PLAYED',
          name       : 'Aids Team',
          picture    : 'teamlogos/client_team_default_logo',
        },
      ],
    },
    {
      id                  : 19756,
      nextMatchId         : 19754,
      name                : 'Round 1 - Match',
      tournamentRoundText : '1',
      startTime           : '2021-05-30',
      state               : 'RUNNING',
      participants        : [
        {
          id         : 'd8b9f00a-0ffa-4527-8316-da701894768e',
          resultText : null,
          isWinner   : false,
          status     : null,
          name       : 'Art of kill',
          picture    : 'teamlogos/client_team_default_logo',
        },
      ],
    },
    {
      id                  : 19757,
      nextMatchId         : 19753,
      name                : 'Semi Final - Match',
      tournamentRoundText : '2',
      startTime           : '2021-05-30',
      state               : 'SCHEDULED',
      participants        : [],
    },
    {
      id                  : 19758,
      nextMatchId         : 19757,
      name                : 'Round 1 - Match',
      tournamentRoundText : '1',
      startTime           : '2021-05-30',
      state               : 'SCHEDULED',
      participants        : [
        {
          id         : '9397971f-4b2f-44eb-a094-722eb286c59b',
          resultText : null,
          isWinner   : false,
          status     : null,
          name       : 'Crazy Pepes',
          picture    : 'teamlogos/client_team_default_logo',
        },
      ],
    },
    {
      id                  : 19759,
      nextMatchId         : 19757,
      name                : 'Round 1 - Match',
      tournamentRoundText : '1',
      startTime           : '2021-05-30',
      state               : 'SCHEDULED',
      participants        : [
        {
          id         : '42fecd89-dc83-4821-80d3-718acb50a30c',
          resultText : null,
          isWinner   : false,
          status     : null,
          name       : 'BLUEJAYS',
          picture    : 'teamlogos/client_team_default_logo',
        },
        {
          id         : 'df01fe2c-18db-4190-9f9e-aa63364128fe',
          resultText : null,
          isWinner   : false,
          status     : null,
          name       : 'Bosphorus',
          picture    : 'teamlogos/r7zn4gr8eajivapvjyzd',
        },
      ],
    },
  ]

  const hasMounted = useHasMounted()

  const { width, height } = useWindowSize()
  const finalWidth = Math.max( ( width || 0 ) - 50, 500 )
  const finalHeight = Math.max( ( height || 0 ) - 100, 500 )

  return (
    <section
      id="home"
      className="main__section !px-0 sm:px-0 md:px-0 transition-default bg-dark relative"
    >
      <Shape />
      <div className="relative mt-20">
        {hasMounted && (
          <SingleEliminationBracket
            matches={matches}
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
                width={finalWidth}
                height={finalHeight}
                {...props}
              >
                {children}
              </SVGViewer>
            )}
          />
        )}
      </div>
    </section>
  )
}

export default BracketSection
