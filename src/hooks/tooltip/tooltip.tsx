import React from 'react';
import { forwardRef, ReactNode } from 'react';
import { Whisper, Popover, WhisperProps } from 'rsuite';

interface DefaultPopoverProps extends React.ComponentProps<typeof Popover> {
    content: ReactNode;
}

// eslint-disable-next-line react/display-name
const DefaultPopover = forwardRef<HTMLDivElement, DefaultPopoverProps>(({ content, className, ...props }, ref) => {
    return (
        <Popover ref={ref} {...props} className={className} arrow={false}>
            <p>{content}</p>
        </Popover>
    );
});

interface AppTooltipProps {
    placement: WhisperProps['placement'];
    data: ReactNode;
    className?: string;
    name: string;
    tooltipClass?: string;
}

const AppTooltip: React.FC<AppTooltipProps> = ({ placement, data, className, name, tooltipClass }) => (
    <Whisper
        trigger="click"
        placement={placement}
        controlId={`control-id-${placement}`}
        speaker={
            <DefaultPopover content={data} className={tooltipClass} />
        }
    >
        <div className={className}>{name}</div>
    </Whisper>
);

export default AppTooltip;
