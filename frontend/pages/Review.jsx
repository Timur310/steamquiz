import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Loader } from "../components/Loader"

const Container = styled.div`
    background-color: #222;
    color: #fff;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 2em;
`

const GameContainer = styled.div`
  height: fit-content;
  width: 100%;
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

export const ReviewGame = () => {

  const [loading, setLoading] = useState(true)
  const [games, setGames] = useState({})

  useEffect(() => {
    const fetchReview = async () => {
      const data = await fetch('api/review')
      const response = await data.json()
      setGames(response)
      setLoading(false)
    }
    fetchReview()
  }, [])

  return (
    <Container>
      {loading ? <Loader /> :
        <GameContainer>
          {games.reviews.map(game => {
            return (
              <GameCard src={game.img_url} />
            )
          })}
        </GameContainer>
      }
    </Container>
  )
}