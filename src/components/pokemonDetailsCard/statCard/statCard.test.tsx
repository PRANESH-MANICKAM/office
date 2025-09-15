import React from 'react';
import { render, screen } from '@testing-library/react';
import StatCard from './statCard';

jest.mock('../../../constants/pokemon.types', () => ({
    getCamleCaseString: (str: string) => {
        return str.replace(/(-|_)/g, ' ').replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }
}));

const mockStats = [
    { stat: { name: 'hp' }, base_stat: 45 },
    { stat: { name: 'attack' }, base_stat: 49 },
    { stat: { name: 'defense' }, base_stat: 49 },
    { stat: { name: 'special-attack' }, base_stat: 65 },
    { stat: { name: 'special-defense' }, base_stat: 65 },
    { stat: { name: 'speed' }, base_stat: 45 },
];

describe('StatCard', () => {
    it('should render the stat card with all stats', () => {
        render(<StatCard stats={mockStats} />);
        expect(screen.getByText('Stats')).toBeInTheDocument();
        expect(screen.getByText('HP')).toBeInTheDocument();
        expect(screen.getByText('Attack')).toBeInTheDocument();
        expect(screen.getByText('Defense')).toBeInTheDocument();
        expect(screen.getByText('Sp. Attack')).toBeInTheDocument();
        expect(screen.getByText('Sp. Defense')).toBeInTheDocument();
        expect(screen.getByText('Speed')).toBeInTheDocument();
    });

    it('should render the correct base stat values', () => {
        render(<StatCard stats={mockStats} />);
        expect(screen.getAllByText('45').length).toBe(4);
        expect(screen.getAllByText('49').length).toBe(4);
        expect(screen.getAllByText('65').length).toBe(4);
    });

    it('should handle an empty stats array', () => {
        render(<StatCard stats={[]} />);
        expect(screen.getByText('Stats')).toBeInTheDocument();
        expect(screen.queryByText('HP')).not.toBeInTheDocument();
    });

    it('should render a progress bar for each stat', () => {
        render(<StatCard stats={mockStats} />);
        const progressBars = screen.getAllByRole('progressbar');
        expect(progressBars.length).toBe(mockStats.length);
        progressBars.forEach((bar, index) => {
            expect(bar).toHaveValue(mockStats[index].base_stat);
        });
    });
});
