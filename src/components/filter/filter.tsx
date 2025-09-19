import React, { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'rsuite';
import { debounceTime, distinctUntilChanged, map, of, Observable } from 'rxjs';
import { baseURL, SEARCH_SLICED } from '../../constants/apiUrls';
import { getCamleCaseString } from '../../constants/pokemon.types';
import PokemonContext from '../../context/pokemonContext/pokmon.context';
import { IPokemonContext } from '../../interface/pokemon.interface';
import { getAllParallelCall, getPokemonGenders, getPokemonTypes, removeDuplicateBy } from '../../services/common.service';
import "./filter.scss";
import AppMultiSelectDropDown from './multiSelectdropDown/multiSelectdropDown';
import SearchFilter from './search/search.filter';

interface IFilterProps {
    isFilterEnable: (isEnable: boolean) => void;
}

const AppFilter: React.FC<IFilterProps> = ({ ...props }) => {

    const { state, getPokemonData, dispatch, setAppLoading, getPokemonDetailsListByUrl } = useContext(PokemonContext) as any as IPokemonContext;
    const { allPokemonsList = [], pokemonsTypes, pokemonGenderList } = state;

    const [isOpenTypeFilter, setIsOpenTypeFilter] = useState<boolean>(false);
    const [isOpenGendreFilter, setIsOpenGenderFilter] = useState<boolean>(false);

    let data$: Observable<any[]> = of([]);

    const onOpenTypeHandler = () => {
        setIsOpenTypeFilter(true);
    }
    const onCloseTypeHandler = () => {
        setIsOpenTypeFilter(false);
    }

    const onOpenGenderHandler = () => {
        setIsOpenGenderFilter(true);
    }
    const onCloseGenderHandler = () => {
        setIsOpenGenderFilter(false);
    }

    const onCleanTypeHandler = () => {
        props.isFilterEnable(false);
        getPokemonData(true);
    }

    const onCleanGenderHandler = () => {
        props.isFilterEnable(false);
        getPokemonData(true);
    }


    const onSearchChangeHandler = (value: string, event: React.SyntheticEvent<Element, Event>) => {
        event.preventDefault();
        value = value.trim();
        if (value.length) {
            setAppLoading(true);
            props.isFilterEnable(true);
            data$ = of(allPokemonsList).pipe(debounceTime(4000),
                distinctUntilChanged(), map((pokmons) => {
                    return pokmons.filter((item) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1)
                })
            );

            data$.subscribe(pokemanList => {
                if (pokemanList.length > SEARCH_SLICED) {
                    pokemanList = pokemanList.slice(0, SEARCH_SLICED)
                }
                getPokemonDetailsListByUrl(pokemanList).then(res => { filterPokemonData(res) });
            });
            setAppLoading(false);
        } else {
            filterPokemonData([]);
            getPokemonData(true);
            props.isFilterEnable(false);
        }
    }

    const onTypeChangeHandler = (value: any[]) => {
        if (value.length) {
            props.isFilterEnable(true);
            getAllParallelCall(value).then(pokemonList => {
                let list: any[] = pokemonList.map((res: any) => res.pokemon);
                list = list.flat().map((res: any) => res.pokemon);
                list = removeDuplicateBy(list, 'name');
                if (list.length > SEARCH_SLICED) {
                    list = list.slice(-SEARCH_SLICED)
                }
                getPokemonDetailsListByUrl(list).then(res => { filterPokemonData(res) });
            }).catch(err => Error(err));
        } else {
            filterPokemonData([]);
            getPokemonData(true);
            props.isFilterEnable(false);
        }

    }

    const onGenderChangeHandler = (value: any[]) => {
        if (value.length) {
            props.isFilterEnable(true);
            getAllParallelCall(value).then(pokemonList => {
                let list: any[] = pokemonList.map((res: any) => res.pokemon_species_details).flat();
                list = list.map(res => baseURL + "/pokemon" + res.pokemon_species.url.split("pokemon-species")[1]);
                list = [...new Set(list)]
                if (list.length > SEARCH_SLICED) {
                    list = [...list.slice(0, SEARCH_SLICED), ...list.slice(-SEARCH_SLICED)]
                }
                const urlList = list.map(res => ({ url: res }));
                getPokemonDetailsListByUrl(urlList).then(res => { filterPokemonData(res) });
            }).catch(err => Error(err));
        } else {
            filterPokemonData([]);
            getPokemonData(true);
            props.isFilterEnable(false);
        }
    }

    const filterPokemonData = (data: any[]) => {
        dispatch({
            type: "ACTIONS.SET_FILTERED_POKEMON_LIST",
            payload: data
        });
    }

    const setPokemonTypes = (data: any[]) => {

        if (data.length) {
            const types = data.map(item => ({ label: getCamleCaseString(item.name), value: item.url, url: item.url }));
            dispatch({
                type: "ACTIONS.SET_POKEMON_TYPE",
                payload: types
            });
        } else {
            dispatch({
                type: "ACTIONS.SET_POKEMON_TYPE",
                payload: []
            });
        }

    }


    const setPokemonGendersList = (genderList: any[]) => {
        const genders = genderList.map(item => ({ label: getCamleCaseString(item.name), value: item.url, url: item.url }));
        if (genders.length) {
            dispatch({
                type: "ACTIONS.SET_POKEMON_GENDER_LIST",
                payload: genders
            });
        } else {
            dispatch({
                type: "ACTIONS.SET_POKEMON_GENDER_LIST",
                payload: []
            });
        }

    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const typesRes = await getPokemonTypes();
                setPokemonTypes(typesRes.results);
                const gendersRes = await getPokemonGenders();
                setPokemonGendersList(gendersRes.results);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="filter-container">
                <div className="filter-wrap">
                    <Row className="filter-row-wrap show-grid">
                        <Col lg={16} xl={16} xs={24} sm={24}>
                            <div>
                                <SearchFilter placeholder="Name or Number" inputClass="pokemon-search-filter" label="Search By" onChangeHandler={onSearchChangeHandler} />
                            </div>
                        </Col>
                        <Col lg={4} xl={4} xs={24} sm={24}>
                            <div>
                                <AppMultiSelectDropDown placeholder="Select Types" isOpen={isOpenTypeFilter} data={pokemonsTypes} label="Type" onChangeHandler={onTypeChangeHandler} onOpenHandler={onOpenTypeHandler} onCloseHandler={onCloseTypeHandler} onCleanHandler={onCleanTypeHandler} />
                            </div>
                        </Col>
                        <Col lg={4} xl={4} xs={24} sm={24}>
                            <div>
                                <AppMultiSelectDropDown placeholder="Select Gender" isOpen={isOpenGendreFilter} data={pokemonGenderList} label="Gender" onChangeHandler={onGenderChangeHandler} onOpenHandler={onOpenGenderHandler} onCloseHandler={onCloseGenderHandler} onCleanHandler={onCleanGenderHandler} />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>

    )
};

export default AppFilter;
