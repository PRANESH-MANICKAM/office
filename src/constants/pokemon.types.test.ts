import { getPokcolor, getBackground, getPokemonDescription, getCamleCaseString } from './pokemon.types';

describe('pokemon.types', () => {
    describe('getPokcolor', () => {
        it('should return the correct color for a given type', () => {
            expect(getPokcolor('fire')).toBe('#EDC2C4');
            expect(getPokcolor('water')).toBe('#CBD5ED');
        });

        it('should return the unknown color for an unknown type', () => {
            expect(getPokcolor('unknown_type')).toBe('#C0DFDD');
        });
    });

    describe('getBackground', () => {
        it('should return a single color for a single type', () => {
            const types = [{ type: { name: 'fire' } }];
            expect(getBackground(types)).toBe('#EDC2C4');
        });

        it('should return a linear gradient for multiple types', () => {
            const types = [{ type: { name: 'fire' } }, { type: { name: 'water' } }];
            expect(getBackground(types)).toBe('linear-gradient(180deg, #EDC2C4 0%, #CBD5ED 100%)');
        });

        it('should return an empty string for no types', () => {
            expect(getBackground([])).toBe('');
        });
    });

    describe('getPokemonDescription', () => {
        const mockFlavorTexts = [
            { language: { name: 'en' }, flavor_text: 'This is a description.\nIt has newlines.' },
            { language: { name: 'es' }, flavor_text: 'Esta es una descripción.' },
            { language: { name: 'en' }, flavor_text: 'This is another description.\fIt has form feeds.' },
            { language: { name: 'en' }, flavor_text: 'This is a description.\nIt has newlines.' }, // Duplicate
        ];

        it('should return a concatenated string of English flavor texts', () => {
            const expectedDescription = 'This is a description. It has newlines.This is another description. It has form feeds.';
            expect(getPokemonDescription(mockFlavorTexts)).toBe(expectedDescription);
        });

        it('should return an empty string if no data is provided', () => {
            expect(getPokemonDescription([])).toBe('');
        });
    });

    describe('getCamleCaseString', () => {
        it('should capitalize the first letter of a string', () => {
            expect(getCamleCaseString('hello')).toBe('Hello');
        });

        it('should return an empty string if no string is provided', () => {
            expect(getCamleCaseString('')).toBe('');
        });
    });
});
