import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import "./App.css";

// Import components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";

// Import data
import data from "./data";

const App = () => {
	// Ref
	const audioRef = useRef(null);

	// State
	const [songs, setSongs] = useState(data());
	const [currentSong, setCurrentSong] = useState(songs[0]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [libraryStatus, setLibraryStatus] = useState(false);
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0,
	});

	// Functions
	const updateTimeHandler = (e) => {
		const currentTime = e.target.currentTime;
		const duration = e.target.duration;
		setSongInfo({ ...songInfo, currentTime, duration });
	};

	const songEndHandler = async () => {
		let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
		let nextSong = songs[(currentIndex + 1) % songs.length];
		await setCurrentSong(nextSong);

		const newSongs = songs.map((song) => {
			if (song.id === nextSong.id) {
				return {
					...song,
					active: true,
				};
			} else {
				return {
					...song,
					active: false,
				};
			}
		});
		setSongs(newSongs);

		if (isPlaying) {
			audioRef.current.play();
		}
	};

	return (
		<Router>
			<AppContainer libraryStatus={libraryStatus}>
				<Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
				<Song currentSong={currentSong} />
				<Player
					isPlaying={isPlaying}
					setIsPlaying={setIsPlaying}
					currentSong={currentSong}
					setCurrentSong={setCurrentSong}
					audioRef={audioRef}
					songInfo={songInfo}
					setSongInfo={setSongInfo}
					songs={songs}
					setSongs={setSongs}
				/>
				<Library
					songs={songs}
					setCurrentSong={setCurrentSong}
					audioRef={audioRef}
					isPlaying={isPlaying}
					setSongs={setSongs}
					libraryStatus={libraryStatus}
				/>
				<audio
					onLoadedMetadata={updateTimeHandler}
					onTimeUpdate={updateTimeHandler}
					onEnded={songEndHandler}
					ref={audioRef}
					src={currentSong.audio}
				/>
			</AppContainer>
		</Router>
	);
};

const AppContainer = styled.div`
	transition: all 0.5s ease;
	margin-left: ${(p) => (p.libraryStatus ? "20rem" : "0")};
	@media screen and (max-width: 768px) {
		margin-left: 0;
	}
`;

export default App;
