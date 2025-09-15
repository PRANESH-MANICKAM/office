import {
  getPokemonData,
  getSpeciesDataById,
  getPokemonTypesById,
  getPokemonTypes,
  getPokemonGenders,
  getPokemonDataById,
  getPokemonDataByURL,
  numberFormation,
  getAllParallelCall,
  removeDuplicateBy,
} from './common.service';

describe('common.service', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({ data: 'mock data' }),
    } as any);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('getPokemonData should fetch data', async () => {
    await getPokemonData();
    expect(fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon?limit=12'
    );
  });

  it('getSpeciesDataById should fetch data for a specific species', async () => {
    await getSpeciesDataById(1);
    expect(fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon-species/1/'
    );
  });

  it('getPokemonTypesById should fetch data for a specific type', async () => {
    await getPokemonTypesById(1);
    expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/type/1/');
  });

  it('getPokemonTypes should fetch all pokemon types', async () => {
    await getPokemonTypes();
    expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/type');
  });

  it('getPokemonGenders should fetch all pokemon genders', async () => {
    await getPokemonGenders();
    expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/gender');
  });

  it('getPokemonDataById should fetch data for a specific pokemon', async () => {
    await getPokemonDataById(1);
    expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/1/');
  });

  it('getPokemonDataByURL should fetch data from a given URL', async () => {
    const testURL = 'https://pokeapi.co/api/v2/pokemon/ditto';
    await getPokemonDataByURL(testURL);
    expect(fetch).toHaveBeenCalledWith(testURL);
  });

  it('should return number with 2 leading zeros', () => {
    const result = numberFormation(1);
    expect(result).toBe('001');
  });

  it('should return number with 1 leading zero', () => {
    const result = numberFormation(11);
    expect(result).toBe('011');
  });

  it('should return number with no leading zero', () => {
    const result = numberFormation(111);
    expect(result).toBe(111);
  });

  it('getAllParallelCall should make parallel API calls', async () => {
    const urls = [
      'https://pokeapi.co/api/v2/pokemon/1',
      'https://pokeapi.co/api/v2/pokemon/2',
    ];
    await getAllParallelCall(urls);
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(urls[0]);
    expect(fetch).toHaveBeenCalledWith(urls[1]);
  });
  
  it('should remove duplicate objects from an array based on a key', () => {
    const arr = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
      { id: 1, name: 'C' },
    ];
    const result = removeDuplicateBy(arr, 'id');
    expect(result).toEqual([
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
    ]);
  });
});
