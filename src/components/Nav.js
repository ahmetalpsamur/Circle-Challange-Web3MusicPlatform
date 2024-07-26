import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import logo from '../img/logo/Circle_Logo_png.png';

const Nav = ({ libraryStatus, setLibraryStatus }) => {
	return (
		<NavContainer>
			<NavSection align="flex-start">
				<Logo src={logo} alt="Logo" />
			</NavSection>
			<NavSection align="center">
				<H1 libraryStatus={libraryStatus}>Web3 Music Platform</H1>
			</NavSection>
			<NavSection align="flex-end">
				<ButtonContainer>
					<Button onClick={() => setLibraryStatus(!libraryStatus)}>
						Library
						<FontAwesomeIcon icon={faMusic} />
					</Button>
					<StyledLink to="/profile">
						My Profile
					</StyledLink>
				</ButtonContainer>
			</NavSection>
		</NavContainer>
	);
};

const NavContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 2rem;
	background-color: #f8f9fa;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	@media screen and (max-width: 768px) {
		flex-direction: column;
		position: fixed;
		z-index: 10;
		top: 0;
		left: 0;
		width: 100%;
		padding: 1rem;
	}
`;

const NavSection = styled.div`
	flex: 1;
	display: flex;
	justify-content: ${(props) => props.align};
	align-items: center;
`;

const Logo = styled.img`
	height: 50px;
	width: auto;
`;

const H1 = styled.h1`
	margin: 0;
	font-size: 1.5rem;
	color: #333;
	transition: opacity 0.5s ease;
	@media screen and (max-width: 768px) {
		visibility: ${(p) => (p.libraryStatus ? "hidden" : "visible")};
		opacity: ${(p) => (p.libraryStatus ? "0" : "100")};
	}
`;

const ButtonContainer = styled.div`
	display: flex;
	gap: 1rem;
`;

const Button = styled.button`
	background: transparent;
	border: 2px solid #333;
	color: #333;
	cursor: pointer;
	border-radius: 5px;
	padding: 0.5rem 1rem;
	transition: background 0.3s ease, color 0.3s ease;
	&:hover {
		background: #333;
		color: #fff;
	}
`;

const StyledLink = styled(Link)`
	background: transparent;
	border: 2px solid #333;
	color: #333;
	cursor: pointer;
	border-radius: 5px;
	padding: 0.5rem 1rem;
	text-decoration: none;
	transition: background 0.3s ease, color 0.3s ease;
	&:hover {
		background: #333;
		color: #fff;
	}
`;

export default Nav;
