import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdBadge, faUserPlus, faKey, faUserCheck, faWallet, faUser } from "@fortawesome/free-solid-svg-icons";
import { get_app_id } from "../api/getAppId"; // Import the function
import { create_a_new_user } from "../api/createUserId"; // Import the create user function

const Profile = () => {
    const [selectedAction, setSelectedAction] = useState(null);
    const [actionResult, setActionResult] = useState(null);

    const handleSidebarClick = async (action) => {
        setSelectedAction(action);
        setActionResult(null); // Reset result

        if (action === 'getAppId') {
            try {
                const id = await get_app_id();
                setActionResult(id);
            } catch (error) {
                console.error("Failed to fetch App ID:", error);
                setActionResult("Error fetching App ID");
            }
        }

        if (action === 'createUser') {
            try {
                const result = await create_a_new_user();
                setActionResult(`User ID: ${result.userId}, Status: ${result.status}`);
            } catch (error) {
                console.error("Failed to create user:", error);
                setActionResult("Error creating user");
            }
        }

        // Handle other actions if needed
    };

    const getActionButtonProps = () => {
        switch (selectedAction) {
            case 'getMyProfile':
                return {
                    icon: faUser,
                    text: 'Get My Profile',
                };
            case 'getAppId':
                return {
                    icon: faIdBadge,
                    text: actionResult ? `App ID: ${actionResult}` : 'Getting App ID...',
                };
            case 'createUser':
                return {
                    icon: faUserPlus,
                    text: actionResult ? actionResult : 'Creating User...',
                };
            case 'acquireToken':
                return {
                    icon: faKey,
                    text: 'Acquire Token',
                };
            case 'initializeUser':
                return {
                    icon: faUserCheck,
                    text: 'Initialize User',
                };
            case 'completeWallet':
                return {
                    icon: faWallet,
                    text: 'Complete Wallet',
                };
            default:
                return {
                    icon: null,
                    text: '',
                };
        }
    };

    const { icon, text } = getActionButtonProps();

    return (
        <ProfileContainer>
            <Sidebar>
                <SidebarItem onClick={() => handleSidebarClick('getMyProfile')}>
                    <FontAwesomeIcon icon={faUser} />
                    <span>Get My Profile</span>
                </SidebarItem>
                <SidebarItem onClick={() => handleSidebarClick('getAppId')}>
                    <FontAwesomeIcon icon={faIdBadge} />
                    <span>Get App ID</span>
                </SidebarItem>
                <SidebarItem onClick={() => handleSidebarClick('createUser')}>
                    <FontAwesomeIcon icon={faUserPlus} />
                    <span>Create User</span>
                </SidebarItem>
                <SidebarItem onClick={() => handleSidebarClick('acquireToken')}>
                    <FontAwesomeIcon icon={faKey} />
                    <span>Acquire Token</span>
                </SidebarItem>
                <SidebarItem onClick={() => handleSidebarClick('initializeUser')}>
                    <FontAwesomeIcon icon={faUserCheck} />
                    <span>Initialize User</span>
                </SidebarItem>
                <SidebarItem onClick={() => handleSidebarClick('completeWallet')}>
                    <FontAwesomeIcon icon={faWallet} />
                    <span>Complete Wallet</span>
                </SidebarItem>
            </Sidebar>
            <Content>
                <ButtonContainer>
                    {icon && text && (
                        <ActionButton>
                            <FontAwesomeIcon icon={icon} />
                            <span>{text}</span>
                        </ActionButton>
                    )}
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
