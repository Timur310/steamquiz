import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Loader } from "../components/Loader"
import { cyrb53, runConfetti, sleep } from "../Utils"

const Container = styled.div`
    background-color: #222;
    color: #fff;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    min-height: 100vh;
    padding: 2em;
`

const CardContainer = styled.div`
  height: fit-content;
  max-width: 100%;
  display: flex;
  justify-content: space-around;
`

const GameCard = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  transition: 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 6px 16px;
    transform: scale(1.05);
  }
`

const ReviewBox = styled.div`
  width: 70%;
  max-height: 175px;
  border-radius: 10px;
  box-shadow: rgba(255, 255, 255, 0.3) 0px 0px 0px 3px;
  background: #353535;
  color: #fff;
  padding: 12px;
  overflow-y: auto;
`


export const RequirementGame = () => {

  const [loading, setLoading] = useState(true)
  const [games, setGames] = useState({})
  const [winnerCard, setWinnerCard] = useState(-1)
  const [selectedCard, setSelectedCard] = useState(-1)

  useEffect(() => {
    const fetchRequirement = async () => {
      const data = await fetch('api/requirement')
      const response = await data.json()
      setGames(response)
      setLoading(false)
    }
    fetchRequirement()
  }, [])

  const onCardClick = async (id) => {
    const target = games.requirements.find(game => cyrb53(game.appId) === games.target)

    setSelectedCard(id)
    setWinnerCard(target.appId)

    if (id === target.appId) {
      runConfetti(10)
    } else {

    }

    await sleep(4000)

    setLoading(true)
    const data = await fetch('api/requirement')
    const response = await data.json()
    setGames(response)
    setLoading(false)
  }

  const getTargetReview = () => {
    const target = games.requirements.find(game => cyrb53(game.appId) === games.target)
    return target.requirement
  }

  return (
    <Container>
      {loading ? <Loader /> :
        <>
          <CardContainer>
            {games.requirements.map(game => {
              return (
                <GameCard
                  style={{ border: `${winnerCard === game.appId ? 'green 5px solid' : selectedCard === game.appId ? 'orange 5px solid' : ''}` }}
                  key={game.appId} onClick={() => onCardClick(game.appId)}
                  src={game.img_url} />
              )
            })}
          </CardContainer>
          <ReviewBox className="roboto-bold" dangerouslySetInnerHTML={{__html: getTargetReview()}} />
        </>
      }
    </Container>
  )
}