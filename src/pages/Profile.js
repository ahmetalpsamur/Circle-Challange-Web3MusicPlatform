import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdBadge, faUserPlus, faKey, faUserCheck, faWallet, faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { get_app_id } from "../api/getAppId";
import { create_a_new_user } from "../api/createUserId";
import { acquire_session_token } from "../api/acuqireSessionToken";
import { initialize_user } from "../api/initializeUser";
import { completeWallet } from "../api/walletCreate";




const Profile = () => {
    const [selectedAction, setSelectedAction] = useState(null);
    const [actionResult, setActionResult] = useState(null);
    const [profile, setProfile] = useState({ username: '', profile_picture: '' });

    useEffect(() => {
        const fetchProfile = async () => {
            const username = localStorage.getItem('username'); // Kullanıcı adını buradan alabilirsiniz
            if (!username) {
                console.error('Username is not available');
                return;
            }
    
            try {
                const response = await axios.get('/api/profile', { params: { username } });
                setProfile(response.data);
            } catch (error) {
                console.error('Failed to fetch profile', error);
            }
        };
        fetchProfile();
    }, []);

    const handleSidebarClick = async (action) => {
        setSelectedAction(action);
        setActionResult(null); // Reset result

        try {
            switch (action) {
                case 'getAppId':
                    const appId = await get_app_id();
                    setActionResult(appId);
                    break;
                case 'createUser':
                    const newUser = await create_a_new_user();
                    setActionResult(`User created with ID: ${newUser.userId}`);
                    break;
                case 'acquireToken':
                    const sessionToken = await acquire_session_token();
                    setActionResult(`User token: ${sessionToken.userToken}, Encryption key: ${sessionToken.encryptionKey}`);
                    break;
                case 'initializeUser':
                    const challengeId = await initialize_user();
                    setActionResult(`Challenge ID: ${challengeId}`);
                    break;
                case 'completeWallet':
                    let REACT_APP_ID = process.env.REACT_APP_ID;
                    let REACT_APP_USER_TOKEN = process.env.REACT_APP_USER_TOKEN;
                    let REACT_APP_ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY;
                    console.log("Burası Profile js!");
                    console.log(REACT_APP_ID);
                    console.log(REACT_APP_USER_TOKEN);
                    console.log(REACT_APP_ENCRYPTION_KEY);
                    console.log(actionResult);
                    if (REACT_APP_ID && REACT_APP_USER_TOKEN && REACT_APP_ENCRYPTION_KEY) {
                        const result = await completeWallet(actionResult);
                        setActionResult(`Wallet creation status: ${result.status}`);
                    } else {
                        setActionResult('Missing configuration data.');
                    }
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error(`Failed to perform action: ${action}`, error);
            setActionResult(`Error performing action: ${action}`);
        }
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
                    icon: faLock,
                    text: actionResult ? actionResult : 'Acquiring Token...',
                };
            case 'initializeUser':
                return {
                    icon: faUserCheck,
                    text: actionResult ? `Challenge ID: ${actionResult}` : 'Initializing User...',
                };
            case 'completeWallet':
                return {
                    icon: faWallet,
                    text: actionResult ? actionResult : 'Completing Wallet...',
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
                    <FontAwesomeIcon icon={faLock} />
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
                {selectedAction === 'getMyProfile' && (
                    <ProfileDetails>
                        <ProfileImage src={profile.profile_picture} alt="Profile" />
                        <ProfileUsername>{profile.username}</ProfileUsername>
                    </ProfileDetails>
                )}
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
    flex-direction: column;
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

const ProfileDetails = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`;

const ProfileImage = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
`;

const ProfileUsername = styled.h2`
    font-size: 1.5rem;
    color: #c9d1d9;
`;

export default Profile;
