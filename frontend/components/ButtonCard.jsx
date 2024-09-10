import React from "react"
import styled from "styled-components"

const Card = styled.div`
    width: 100%;
    max-width: 290px;
    height: fit-content;
    min-height: 70px;
    background: #353535;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: left;
    backdrop-filter: blur(10px);
    transition: 0.2s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    &:hover {
        cursor: pointer;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 6px 16px;
        transform: scale(1.05);
    }
`

const TextBox = styled.div`
    width: calc(100% - 90px);
    margin-left: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    color: white;
    .p {
        font-size: 12px;
        font-weight: lighter;
    }
`

const TextContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    .span {
        font-size: 10px;
    }
    .h1 {
        font-size: 16px;
        font-weight: bold;
    }
`

const IconImage = styled.div`
    width: 50px;
    height: 50px;
    margin-left: 10px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(#171a21, #2a475e);
`

export const ButtonCard = (props) => {
    const { title, badge, description, onClicked } = props
    return (
        <Card onClick={onClicked}>
            <IconImage>
                <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.5 15.5C5.5 14.5572 5.5 14.0858 5.79289 13.7929C6.08579 13.5 6.55719 13.5 7.5 13.5H8.5C9.44281 13.5 9.91421 13.5 10.2071 13.7929C10.5 14.0858 10.5 14.5572 10.5 15.5V16.5C10.5 17.4428 10.5 17.9142 10.2071 18.2071C9.91421 18.5 9.44281 18.5 8.5 18.5C7.08579 18.5 6.37868 18.5 5.93934 18.0607" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M5.5 8.5C5.5 7.08579 5.5 6.37868 5.93934 5.93934C6.37868 5.5 7.08579 5.5 8.5 5.5C9.44281 5.5 9.91421 5.5 10.2071 5.79289C10.5 6.08579 10.5 6.55719 10.5 7.5V8.5C10.5 9.44281 10.5 9.91421 10.2071 10.2071C9.91421 10.5 9.44281 10.5 8.5 10.5H7.5C6.55719 10.5 6.08579 10.5 5.79289 10.2071C5.5 9.91421 5.5 9.44281 5.5 8.5Z" stroke="#fff" strokeWidth="1.5"></path> <path d="M13.5 15.5C13.5 14.5572 13.5 14.0858 13.7929 13.7929C14.0858 13.5 14.5572 13.5 15.5 13.5H16.5C17.4428 13.5 17.9142 13.5 18.2071 13.7929C18.5 14.0858 18.5 14.5572 18.5 15.5C18.5 16.9142 18.5 17.6213 18.0607 18.0607C17.6213 18.5 16.9142 18.5 15.5 18.5C14.5572 18.5 14.0858 18.5 13.7929 18.2071C13.5 17.9142 13.5 17.4428 13.5 16.5V15.5Z" stroke="#fff" strokeWidth="1.5"></path> <path d="M18.5 8.5C18.5 9.44281 18.5 9.91421 18.2071 10.2071C17.9142 10.5 17.4428 10.5 16.5 10.5H15.5C14.5572 10.5 14.0858 10.5 13.7929 10.2071C13.5 9.91421 13.5 9.44281 13.5 8.5V7.5C13.5 6.55719 13.5 6.08579 13.7929 5.79289C14.0858 5.5 14.5572 5.5 15.5 5.5C16.9142 5.5 17.6213 5.5 18.0607 5.93934" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M22 14C22 14.3492 22 14.6822 21.9991 15M14 22C17.7712 22 19.6569 22 20.8284 20.8284C21.4816 20.1752 21.7706 19.3001 21.8985 18" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M10 22C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M10 2C6.22876 2 4.34315 2 3.17157 3.17157C2.51839 3.82475 2.22937 4.69989 2.10149 6M2 10C2 9.65081 2 9.31779 2.00093 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M14 2C17.7712 2 19.6569 2 20.8284 3.17157C22 4.34315 22 6.22876 22 10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
            </IconImage>
            <TextBox>
                <TextContent>
                    <p className="h1 roboto-bold">{title ?? ""}</p>
                    {badge}
                    {/* <span className="span roboto-regular">12 min ago</span> */}
                </TextContent>
                <p className="p roboto-thin">{description ?? ""}</p>
            </TextBox>
        </Card>
    )
}