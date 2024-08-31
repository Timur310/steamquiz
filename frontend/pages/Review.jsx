import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Loader } from "../components/Loader"
import { cyrb53 } from "../Utils"

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
  width: 100;
  max-height: 300px;
  border-radius: 10px;
  box-shadow: rgba(255, 255, 255, 0.3) 0px 0px 0px 3px;
  background: #353535;
  color: #fff;
  padding: 12px;
  text-overflow: clip;
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

  const fetchReview = async () => {
    setLoading(true)
    const data = await fetch('api/review')
    const response = await data.json()
    setGames(response)
    setLoading(false)
  }

  const getTargetReview = () => {
    const target = games.reviews.find(game => cyrb53(game.appId) === games.target)
    return target.review
  }

  return (
    <Container>
      {loading ? <Loader /> :
        <>
          <CardContainer>
            {games.reviews.map(game => {
              return (
                <GameCard onClick={fetchReview} src={game.img_url} />
              )
            })}
          </CardContainer>
          <ReviewBox className="roboto-bold">{getTargetReview()}</ReviewBox>
        </>
      }
    </Container>
  )
}