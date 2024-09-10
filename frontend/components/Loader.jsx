import React from "react"
import styled, { keyframes } from "styled-components"

const Card = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  z-index: 2;
  background-color: #222
`

const LoaderKeyframes = keyframes`
  10% {
    -webkit-transform: translateY(-102%);
    transform: translateY(-102%);
  }
  20% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }
  30% {
    -webkit-transform: translateY(-202%);
    transform: translateY(-202%);
  }
  40% {
    -webkit-transform: translateY(-200%);
    transform: translateY(-200%);
  }
  50% {
    -webkit-transform: translateY(-302%);
    transform: translateY(-302%);
  }
  60% {
    -webkit-transform: translateY(-300%);
    transform: translateY(-300%);
  }
  70% {
    -webkit-transform: translateY(-402%);
    transform: translateY(-402%);
  }
  80% {
    -webkit-transform: translateY(-400%);
    transform: translateY(-400%);
  }
  90% {
    -webkit-transform: translateY(-502%);
    transform: translateY(-502%);
  }
  100% {
    -webkit-transform: translateY(-500%);
    transform: translateY(-500%);
  }
`

const LoaderContainer = styled.div`
  color: rgb(124, 124, 124);
  font-weight: 500;
  font-size: 25px;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  height: 40px;
  padding: 10px 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  border-radius: 8px;

  & > p {
    color: #878787;
  }
`

const Words = styled.div`
    overflow: hidden;
    position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
    var(--bg-color) 10%,
    transparent 30%,
    transparent 70%,
    var(--bg-color) 90%
    );
    z-index: 20;
}
`

const Word = styled.span`
    display: block;
    height: 100%;
    padding-left: 6px;
    color: #5D3FD3;
    animation: ${LoaderKeyframes} 6s infinite;
    
`

export const Loader = () => {
    return (
        <Card>
            <LoaderContainer className="roboto-regular">
                <p>loading</p>
                <Words>
                    <Word>Overwhelmingly Positive</Word>
                    <Word>Very Positive</Word>
                    <Word>Positive</Word>
                    <Word>Mostly Positive</Word>
                    <Word>Mixed</Word>
                    <Word>Mostly Negative</Word>
                </Words>
            </LoaderContainer>
        </Card>
    )
}