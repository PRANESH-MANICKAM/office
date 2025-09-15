
import { LIMIT, baseURL } from "../constants/apiUrls";

export const initialURL = `${baseURL}/pokemon?limit=${LIMIT}`;
export const allPokemonURL = `${baseURL}/pokemon?limit=1100`;


export const getPokemonData = async () => {
  const response = await fetch(`${initialURL}`);
  const result = await response.json();
  return result;
};

export const getSpeciesDataById = async (id: number) => {
  const response = await fetch(`${baseURL}/pokemon-species/${id}/`);
  const result = await response.json();
  return result;
};

export const getPokemonTypesById = async (id: number) => {
  const response = await fetch(`${baseURL}/type/${id}/`);
  const result = await response.json();
  return result;
};

export const getPokemonTypes = async () => {
  const response = await fetch(`${baseURL}/type`);
  const result = await response.json();
  return result;
};

export const getPokemonGenders = async () => {
  const response = await fetch(`${baseURL}/gender`);
  const result = await response.json();
  return result;
};


export const getPokemonDataById = async (id: number) => {
  const response = await fetch(`${baseURL}/pokemon/${id}/`);
  const result = await response.json();
  return result;
};


export const getPokemonDataByURL = async (URL: string) => {
  const response = await fetch(URL);
  const result = await response.json();
  return result;
}

export const numberFormation = (number: number) => {
  if (Number(number) < 10) return `00${number}`;
  if (Number(number) > 10 && Number(number) < 100) return `0${number}`;
  return number;
}

export const getAllParallelCall = async (ApiUrls: string[]) => {
  return await Promise.all(
    ApiUrls.map(async url => {
      const res = await fetch(url);
      return await res.json(); // Send request for each id
    }));
}

export const removeDuplicateBy = (arr: any[], prop: string) => {
  const seen = new Set();
  return arr.filter(item => {
    const key = item[prop];
    if (seen.has(key)) {
      return false;
    } else {
      seen.add(key);
      return true;
    }
  });
};