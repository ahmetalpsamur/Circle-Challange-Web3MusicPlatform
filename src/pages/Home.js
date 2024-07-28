import React, { useState, useRef } from "react";
import styled from "styled-components";
import chillHop from "../data";

const Home = () => {
    const songs = chillHop();
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const songSelectHandler = (song) => {
        if (currentSong && currentSong.id === song.id && isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            setCurrentSong(song);
            setIsPlaying(true);
            audioRef.current.play();
        }
    };

    return (
        <HomeContainer>
            {songs.map((song) => (
                <SongCard
                    key={song.id}
                    song={song}
                    isPlaying={isPlaying && currentSong && currentSong.id === song.id}
                    onClick={() => songSelectHandler(song)}
                />
            ))}
            <audio ref={audioRef} src={currentSong?.audio} onEnded={() => setIsPlaying(false)} />
        </HomeContainer>
    );
};

const SongCard = ({ song, isPlaying, onClick }) => {
    return (
        <SongCardContainer isPlaying={isPlaying} onClick={onClick}>
            <LeftContainer>
                <Img src={song.cover} alt={song.name} />
                <LibrarySongDescription>
                    <H1>{song.name}</H1>
                    <H2>{song.artist}</H2>
                </LibrarySongDescription>
            </LeftContainer>
            <RightContainer>
                <Author>Ahmet Alp Samur</Author>
                <Stats>
                    <StatItem>
                        <StatLabel>Tahmini Kazanç:</StatLabel>
                        <StatValue>$100</StatValue>
                    </StatItem>
                    <StatItem>
                        <StatLabel>Aylık Dinlenme Sayısı:</StatLabel>
                        <StatValue>10,000</StatValue>
                    </StatItem>
                    <StatItem>
                        <StatLabel>Toplam Dinlenme Sayısı:</StatLabel>
                        <StatValue>100,000</StatValue>
                    </StatItem>
                </Stats>
            </RightContainer>
        </SongCardContainer>
    );
};

const HomeContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 2rem;
    background-color: #f0f0f0;
`;

const SongCardContainer = styled.div`
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 1rem;
    padding: 1rem;
    width: calc(33.333% - 2rem);
    display: flex;
    justify-content: space-between;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    ${(props) => props.isPlaying && `
        box-shadow: 0 4px 12px rgba(0, 255, 0, 0.4);
    `}
    &:hover {
        transform: translateY(-10px);
    }
`;

const LeftContainer = styled.div`
    display: flex;
`;

const RightContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 1rem;
`;

const LibrarySongDescription = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Img = styled.img`
    margin: 20px 0;
    height: 100px;
`;

const H1 = styled.h3`
    padding-left: 1rem;
    font-size: 1rem;
`;

const H2 = styled.h4`
    padding-left: 1rem;
    font-size: 0.7rem;
`;

const Author = styled.h3`
    font-size: 1rem;
    margin-bottom: 0.5rem;
`;

const Stats = styled.div`
    display: flex;
    flex-direction: column;
`;

const StatItem = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0.2rem 0;
`;

const StatLabel = styled.span`
    font-weight: bold;
`;

const StatValue = styled.span`
    margin-left: 0.5rem;
`;

export default Home;
