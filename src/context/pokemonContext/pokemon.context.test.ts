
import PokemonContext from './pokmon.context';

describe('PokemonContext', () => {
  it('should be a React context object', () => {
    expect(PokemonContext).toBeDefined();
    expect(PokemonContext.Consumer).toBeDefined();
    expect(PokemonContext.Provider).toBeDefined();
  });
});
