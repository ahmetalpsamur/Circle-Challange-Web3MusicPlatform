import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faPlay, faPause, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Player = ({
    currentSong,
    setCurrentSong,
    isPlaying,
    setIsPlaying,
    audioRef,
    songInfo,
    setSongInfo,
    songs,
    setSongs,
}) => {
    const [volume, setVolume] = useState(0.5);

    // Event handlers
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const togglePlayPauseIcon = () => {
        return isPlaying ? faPause : faPlay;
    };

    const getTime = (time) => {
        let minute = Math.floor(time / 60);
        let second = ("0" + Math.floor(time % 60)).slice(-2);
        return `${minute}:${second}`;
    };

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value });
    };

    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if (direction === "skip-forward") {
            await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
        } else if (direction === "skip-back") {
            if ((currentIndex - 1) % songs.length === -1) {
                await setCurrentSong(songs[songs.length - 1]);
                activeLibraryHandler(songs[songs.length - 1]);
            } else {
                await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
                activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
            }
        }
        if (isPlaying) {
            audioRef.current.play();
        }
    };

    const activeLibraryHandler = (newSong) => {
        const newSongs = songs.map((song) => {
            if (song.id === newSong.id) {
                return { ...song, active: true };
            } else {
                return { ...song, active: false };
            }
        });
        setSongs(newSongs);
    };

    const volumeHandler = (e) => {
        setVolume(e.target.value);
        audioRef.current.volume = e.target.value;
    };

    return (
        <PlayerContainer>
            <LeftContainer>
                <ImageContainer>
                    <img src={currentSong.cover} alt={currentSong.name} />
                </ImageContainer>
                <TextContainer>
                    <h3>{currentSong.name}</h3>
                    <h4>{currentSong.artist}</h4>
                </TextContainer>
            </LeftContainer>
            <Section>
                <MiddleContainer>
                    <TimeControlContainer>
                        <P>{getTime(songInfo.currentTime || 0)}</P>
                        <Track currentSong={currentSong}>
                            <Input
                                onChange={dragHandler}
                                min={0}
                                max={songInfo.duration || 0}
                                value={songInfo.currentTime}
                                type="range"
                            />
                            <AnimateTrack songInfo={songInfo} />
                        </Track>
                        <P>{getTime(songInfo.duration || 0)}</P>
                    </TimeControlContainer>
                    <PlayControlContainer>
                        <FontAwesomeIcon
                            onClick={() => skipTrackHandler("skip-back")}
                            icon={faAngleLeft}
                            size="2x"
                            style={pointer}
                        />
                        <FontAwesomeIcon
                            onClick={playSongHandler}
                            icon={togglePlayPauseIcon()}
                            size="2x"
                            style={pointer}
                        />
                        <FontAwesomeIcon
                            onClick={() => skipTrackHandler("skip-forward")}
                            icon={faAngleRight}
                            size="2x"
                            style={pointer}
                        />
                    </PlayControlContainer>
                </MiddleContainer>
            </Section>
            <Section>
                <RightContainer>
                    <VolumeControl>
                        <FontAwesomeIcon icon={faVolumeUp} size="1x" />
                        <VolumeSlider
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            value={volume}
                            onChange={volumeHandler}
                            currentSong={currentSong} // Pass currentSong to VolumeSlider
                        />
                    </VolumeControl>
                </RightContainer>
            </Section>
        </PlayerContainer>
    );
};

// Styled Components
const PlayerContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    min-height: 10vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(90deg, rgba(54,53,53,1) 0%, rgba(0,0,0,1) 50%, rgba(54,53,53,1) 100%);
    color: white;
    padding: 1rem;
    border-radius: 15px;
    box-shadow: 0px -5px 15px rgba(0, 0, 0, 0.2);
    z-index: 10;
`;

const Section = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LeftContainer = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: flex-start;
`;

const ImageContainer = styled.div`
    width: 50px;
    height: 50px;
    margin-right: 1rem;
    img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
    }
`;

const TextContainer = styled.div`
    h3 {
        margin: 0;
        font-size: 1.6rem;
        background: radial-gradient(circle at 18.7% 37.8%, rgb(250, 250, 250) 0%, rgb(225, 234, 238) 90%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    h4 {
        margin: 0;
        font-size: 0.8rem;
        color: whitegray;
        background: radial-gradient(666px at 0.4% 48%, rgb(202, 204, 227) 0%, rgb(89, 89, 99) 97.5%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`;

const MiddleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const TimeControlContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
`;

const Track = styled.div`
    background: linear-gradient(to right, ${(p) => p.currentSong.color[0]}, ${(p) => p.currentSong.color[1]});
    width: 100%;
    height: 0.6rem;
    position: relative;
    border-radius: 1rem;
    overflow: hidden;
`;

const AnimateTrack = styled.div`
    background: ${(p) =>
        p.songInfo.currentTime < p.songInfo.duration
            ? p.songInfo.currentTime / p.songInfo.duration < 0.5
                ? p.songInfo.currentTime / p.songInfo.duration < 0.25
                    ? "rgba(255, 255, 255, 0.5)"
                    : "rgba(255, 255, 255, 0.7)"
                : "rgba(255, 255, 255, 0.9)"
            : "transparent"};
    width: ${(p) => (p.songInfo.currentTime / p.songInfo.duration) * 100}%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition: width 0.2s ease;
`;

const Input = styled.input`
    width: 100%;
    -webkit-appearance: none;
    background: transparent;
    cursor: pointer;
    &:focus {
        outline: none;
    }
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 16px;
        width: 16px;
        background: transparent;
        border: none;
    }
    &::-moz-range-thumb {
        background: transparent;
        border: none;
    }
    &::-ms-thumb {
        background: transparent;
        border: none;
    }
`;

const P = styled.p`
    padding: 0 1rem;
    user-select: none;
`;

const PlayControlContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 50%;
    max-width: 300px;
`;

const RightContainer = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: center;
    margin: 0 1rem; // Adjust margin for responsiveness
    @media (max-width: 768px) {
        margin: 0 0.5rem; // Smaller margins for smaller screens
    }
`;

const VolumeControl = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    margin-left: 1rem; // Spacing between icon and slider
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        margin-left: 0.5rem; // Adjust margin for smaller screens
    }
`;

const VolumeSlider = styled.input`
    width: 120px; // Width for volume bar
    height: 0.6rem; // Same height as the music progress bar
    -webkit-appearance: none;
    background: linear-gradient(to right, ${(p) => p.currentSong.color[0]}, ${(p) => p.currentSong.color[1]}); // Gradient for the entire track
    cursor: pointer;
    margin-left: 0.5rem; // Spacing between icon and slider
    border-radius: 1rem; // Match with the progress bar's rounded corners
    position: relative;
    &:focus {
        outline: none;
    }
    &::-webkit-slider-runnable-track {
        height: 0.6rem; // Same height as the music progress bar
        background: linear-gradient(
            to right,
            ${(p) => p.currentSong.color[0]} 0%,
            ${(p) => p.currentSong.color[0]} ${(p) => p.value * 100}%,
            ${(p) => p.currentSong.color[1]} ${(p) => p.value * 100}%,
            ${(p) => p.currentSong.color[1]} 100%
        ); // Color fill based on current value
        border-radius: 1rem;
    }
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 12px; // Smaller thumb
        width: 12px;
        background: #fff;
        border-radius: 50%;
        cursor: pointer;
        position: relative;
        z-index: 1;
        transition: background 0.2s ease, transform 0.2s ease;
    }
    &::-moz-range-track {
        height: 0.6rem; // Same height as the music progress bar
        background: linear-gradient(
            to right,
            ${(p) => p.currentSong.color[0]} 0%,
            ${(p) => p.currentSong.color[0]} ${(p) => p.value * 100}%,
            ${(p) => p.currentSong.color[1]} ${(p) => p.value * 100}%,
            ${(p) => p.currentSong.color[1]} 100%
        ); // Color fill based on current value
        border-radius: 1rem;
    }
    &::-moz-range-thumb {
        background: #fff;
        height: 12px; // Smaller thumb
        width: 12px;
        border-radius: 50%;
        cursor: pointer;
        transition: background 0.2s ease, transform 0.2s ease;
    }
    &::-ms-track {
        height: 0.6rem; // Same height as the music progress bar
        background: transparent;
        border-color: transparent;
        color: transparent;
    }
    &::-ms-thumb {
        background: #fff;
        height: 12px; // Smaller thumb
        width: 12px;
        border-radius: 50%;
        cursor: pointer;
        transition: background 0.2s ease, transform 0.2s ease;
    }
    &:hover::-webkit-slider-thumb {
        background: #f1f1f1; // Change color on hover
        transform: scale(1.5); // Enlarge thumb on hover
    }
    &:hover::-moz-range-thumb {
        background: #f1f1f1; // Change color on hover
        transform: scale(1.5); // Enlarge thumb on hover
    }
    &:hover::-ms-thumb {
        background: #f1f1f1; // Change color on hover
        transform: scale(1.5); // Enlarge thumb on hover
    }
    @media (max-width: 768px) {
        width: 100px; // Adjusted width for smaller screens
        margin-left: 0.25rem; // Adjusted margin for smaller screens
    }
`;

const pointer = { cursor: "pointer" };
export default Player;
