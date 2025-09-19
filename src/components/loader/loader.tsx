import React from 'react';
import { Loader } from "rsuite";

interface IAppLoaderProps {
    className?: string;
}

const Apploader: React.FC<IAppLoaderProps> = ({ className }) => {
    return (
        <>
            <div data-testid="app-loader" className={`app-loader ${className ? className : ''}`}>
                <Loader size="md" content="Loading..." />
            </div>
        </>
    )
}

export default Apploader;
