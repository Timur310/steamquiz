import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Loader } from "../components/Loader"
import { runConfetti, sleep } from "../Utils"

const Container = styled.div`
    background-color: transparent;
    background-image: radial-gradient(#fff 1px, #222 1px);
    background-size: 30px 30px;
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
  z-index: 2;
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
  z-index: 2;
`

const ReviewBox = styled.div`
  width: 70%;
  max-height: 150px;
  border-radius: 10px;
  background: #353535;
  color: #fff;
  padding: 12px;
  overflow-y: auto;
  z-index: 2;
`

export const ReviewGame = () => {

  const [loading, setLoading] = useState(true)
  const [games, setGames] = useState({})
  const [winnerCard, setWinnerCard] = useState(-1)
  const [selectedCard, setSelectedCard] = useState(-1)

  useEffect(() => {
    const fetchReview = async () => {
      const data = await fetch('api/review')
      const response = await data.json()
      setGames(response)
      setLoading(false)
    }
    fetchReview()
  }, [])

  const onCardClick = async (id) => {
    setSelectedCard(id)
    setWinnerCard(games.target)

    if (id === games.target) {
      runConfetti(10)
    } else {

    }

    await sleep(4000)

    setLoading(true)
    const data = await fetch('api/review')
    const response = await data.json()
    setGames(response)
    setLoading(false)
  }

  const getTargetReview = () => {
    const target = games.reviews.find(game => game.appId === games.target)
    return target.review
  }

  return (
    <Container>
      {loading ? <Loader /> :
        <>
          <CardContainer>
            {games.reviews.map(game => {
              return (
                <GameCard
                  style={{ border: `${winnerCard === game.appId ? 'green 5px solid' : selectedCard === game.appId ? 'orange 5px solid' : ''}` }}
                  key={game.appId} onClick={() => onCardClick(game.appId)}
                  src={game.img_url} />
              )
            })}
          </CardContainer>
          <ReviewBox className="roboto-bold">{getTargetReview()}</ReviewBox>
        </>
      }
    </Container>
  )
}