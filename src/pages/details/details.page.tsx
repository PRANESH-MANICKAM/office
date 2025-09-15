import './details.page.scss';
import React, { useState, useEffect } from "react";
import { Loader, Modal, Placeholder } from 'rsuite';
import { getPokemonDataById, getPokemonTypesById, getSpeciesDataById } from "../../services/common.service";
import DetailsHeader from '../../components/pokemonDetailsCard/detailsHeader/detailsHeader';
import PropertyCard from '../../components/pokemonDetailsCard/propertyCard/propertyCard';
import StatCard from '../../components/pokemonDetailsCard/statCard/statCard';
import EvolutionChainCard from '../../components/pokemonDetailsCard/evolutionChainCard/evolutionChainCard';
import PropTypes from 'prop-types';
import {
    IPokemonData,
    IPokemonSpecies,
    IPokemonType
} from '../../interface/pokemon.interface';

interface IDetailPageProps {
    isCardSelected: boolean;
    toggleModal: () => void;
    pokemonId: number;
    offset: number;
}

const DetailPage: React.FC<IDetailPageProps> = ({ isCardSelected, toggleModal, pokemonId, offset }) => {

    const [currentPokemonId, setCurrentPokemonId] = useState(pokemonId);
    const handleClose = () => toggleModal();
    const [data, setPokemonData] = useState<IPokemonData | null>(null);
    const [isDetailLoading, setLoading] = useState(true);
    const [isModalOpen, setCloseModal] = useState(isCardSelected);
    const [pokemonSpeciesData, setPokemonSpeciesData] = useState<IPokemonSpecies | undefined>(undefined);
    const [pokemonTypeData, setPokemonTypeData] = useState<IPokemonType | undefined>(undefined);

    useEffect(() => {
        if (!currentPokemonId) return;
        (async function setPokemonDetails() {
            setLoading(true)
            const response = await getPokemonDataById(currentPokemonId);
            setPokemonData(response);
            setLoading(false);
            const pokemonSpeciesData = await getSpeciesDataById(currentPokemonId);
            setPokemonSpeciesData(pokemonSpeciesData);
            const pokemonTypeData = await getPokemonTypesById(currentPokemonId);
            setPokemonTypeData(pokemonTypeData);
        })();
    }, [currentPokemonId]);

    const handleForwordClick = () => {
        if (currentPokemonId === offset) return;
        setCurrentPokemonId(currentPokemonId + 1);
    }
    const handleBackwordClick = () => {
        if (currentPokemonId === 1) return;
        setCurrentPokemonId(currentPokemonId - 1);
    }

    const closePopUp = () => {
        setCloseModal(false)
    }

    return (
        <>
            <Modal
                dialogClassName={"details-modal-container"}
                size={"md"}
                open={isModalOpen}
                onClose={handleClose}
                onExited={() => {
                    setPokemonData(null);
                }}
            >
                {data ? (
                    <>
                        <div className="model-container">
                            <Modal.Header closeButton={false} className="rs-modal-header-2" >
                                {isDetailLoading && <Placeholder.Paragraph style={{ marginTop: 30 }} rows={5} graph="image" active />}
                                {!isDetailLoading && pokemonSpeciesData &&
                                    <div>
                                        <DetailsHeader data={data} speciesData={pokemonSpeciesData} forwordClick={handleForwordClick} backClick={handleBackwordClick} closeClick={closePopUp} />
                                    </div>
                                }
                                <div className="padding-components">
                                    {pokemonTypeData && pokemonSpeciesData && (<PropertyCard speciesData={pokemonSpeciesData} data={data} pokemonTypeData={pokemonTypeData} />)}
                                </div>
                                <div className="padding-components">
                                    {data.stats && (<StatCard stats={data.stats} />)}
                                </div>
                                <div className="padding-components">
                                    <EvolutionChainCard data={data} />
                                </div>

                            </Modal.Header>
                            <Modal.Body>
                                {/* <PokemonCard data={data} /> */}
                            </Modal.Body>
                        </div>
                    </>

                ) : (
                    <div style={{ textAlign: 'center' }}>
                        <Loader size="md" />
                    </div>
                )}

            </Modal>
        </>
    )
}
DetailPage.propTypes = {
    isCardSelected: PropTypes.bool.isRequired,
    toggleModal: PropTypes.any.isRequired,
    pokemonId: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired
}

export default DetailPage;
