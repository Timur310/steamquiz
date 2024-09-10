import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ButtonCard } from "../components/ButtonCard";
import { Badge } from "../components/Badge";

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
    gap: 16px;
`

export const Index = () => {

  const navigate = useNavigate()

  return (
    <Container>
      <ButtonCard
        title="Journalist"
        description="Guess the game from a review"
        onClicked={() => navigate("/review")}
      />
      <ButtonCard
        title="can it run Crysis?"
        description="Guess which game matches the pc requirement"
        onClicked={() => navigate("/requirement")}
        badge={<Badge text="Hard" />}
        
      />
    </Container>
  )
}