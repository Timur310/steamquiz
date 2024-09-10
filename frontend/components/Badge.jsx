import React from "react"
import styled from "styled-components"

const BadgeContainer = styled.div`
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding: 0px .25rem;
  cursor: pointer;
  border: none;
  border-radius: 0.375rem;
  outline: none;
  background-color: rgba(239, 68, 68, 0.10);
  color: rgb(239 68 68);
  border: 1px rgb(239 68 68) solid;
`

export const Badge = ({ text }) => {
  return (
    <BadgeContainer className="roboto-regular">{text}</BadgeContainer>
  )
}