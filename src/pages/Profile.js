import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdBadge, faUserPlus, faKey, faUserCheck, faWallet } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
    return (
        <ProfileContainer>
            <Sidebar>
                <SidebarItem>
                    <FontAwesomeIcon icon={faIdBadge} />
                    <span>Get App ID</span>
                </SidebarItem>
                <SidebarItem>
                    <FontAwesomeIcon icon={faUserPlus} />
                    <span>Create User</span>
                </SidebarItem>
                <SidebarItem>
                    <FontAwesomeIcon icon={faKey} />
                    <span>Acquire Token</span>
                </SidebarItem>
                <SidebarItem>
                    <FontAwesomeIcon icon={faUserCheck} />
                    <span>Initialize User</span>
                </SidebarItem>
                <SidebarItem>
                    <FontAwesomeIcon icon={faWallet} />
                    <span>Complete Wallet</span>
                </SidebarItem>
            </Sidebar>
            <Content>
                <ButtonContainer>
                    <ActionButton>
                        <FontAwesomeIcon icon={faIdBadge} />
                        <span>Get App ID</span>
                    </ActionButton>
                </ButtonContainer>
            </Content>
        </ProfileContainer>
    );
};

const ProfileContainer = styled.div`
    display: flex;
    height: 100vh;
    background-color: #0d1117;
    color: #c9d1d9;
`;

const Sidebar = styled.div`
    width: 20%;
    background-color: #161b22;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const SidebarItem = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    padding: 10px;
    width: 100%;
    text-align: left;
    border-radius: 5px;
    &:hover {
        background-color: #21262d;
    }
`;

const Content = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ButtonContainer = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
`;

const ActionButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background-color: #238636;
    color: #ffffff;
    border: none;
    padding: 15px 30px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.2rem;
    &:hover {
        background-color: #2ea043;
    }
`;

export default Profile;
