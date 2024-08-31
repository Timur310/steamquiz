import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ButtonCard } from "../components/ButtonCard";

const Container = styled.div`
    background-color: #222;
    color: #fff;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 0.5em;
`

export const Index = () => {

  const navigate = useNavigate()

  return (
    <Container>
      <ButtonCard
        title="Basic Review Game"
        description="Guess the game from reviews"
        onClicked={() => navigate("/review")}
      />
    </Container>
  )
}