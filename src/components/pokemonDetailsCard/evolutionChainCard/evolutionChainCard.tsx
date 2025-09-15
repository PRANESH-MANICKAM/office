import React from 'react';
import "./evolutionChainCard.scss"
import "../../../styles/common.scss";
import PokemonCard from "../../pokemonCard/pokemonCard";
import rightArrowIcon from "../../../assets/icons/right-arrow.png"
import { IEvolutionChainCardProps } from './types';

const EvolutionChainCard: React.FC<IEvolutionChainCardProps> = ({ data }) => {

    if(!Array.isArray(data)) {
        return null;
    }

    return (
        <div>
            <div className="evol-container">
                <div className="evol-wrap evolu-break">
                    {data.map((pokemon: any, index: number) => (
                        <div className="flex-row" key={pokemon.id}>
                            <div>
                                <div className="pt-2">
                                    <PokemonCard className="disabled-click" data={pokemon} onClick={() => undefined} />
                                </div>
                            </div>
                            {data.length !== index + 1 && (
                                <div>
                                    <div className="evol-next-arrow">
                                        <img src={rightArrowIcon} alt="right arrow icon" onKeyDown={() => undefined} role="presentation"></img>
                                    </div>
                                </div>)}
                        </div>))}
                </div>
            </div>
        </div>
    )
}

export default EvolutionChainCard;