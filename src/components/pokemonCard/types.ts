export interface IPokemonCardProps {
    data: any;
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    className?: string;
}
