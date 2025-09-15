export interface ISearchFilterProps {
    placeholder?: string;
    inputClass?: string;
    onChangeHandler: (value: string, event: React.SyntheticEvent<Element, Event>) => void;
    label: React.ReactNode;
}
