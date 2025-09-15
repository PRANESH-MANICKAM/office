export interface IAppMultiSelectDropDownProps {
    label: React.ReactNode;
    onChangeHandler: (value: any) => void;
    data: any[];
    isOpen: boolean;
    onOpenHandler: () => void;
    onCloseHandler: () => void;
    onCleanHandler: () => void;
    placeholder?: string;
}
