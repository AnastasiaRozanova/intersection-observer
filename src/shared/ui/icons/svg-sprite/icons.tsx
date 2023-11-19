import { FC } from 'react';
import { SvgSprite } from './svg-sprite';

export type IconId = 'arrow-left' | 'arrow-right';

export const IconsSprite: FC = () => (
    <SvgSprite>
        <symbol id="arrow-left" viewBox="0 0 20 20">
            <path
                d="M8.698 10L13.2 5.555 12.132 4.5 7.31 9.262a1.035 1.035 0 000 1.476l4.822 4.762 1.068-1.055L8.698 10z"
                fillRule="nonzero"
            />
        </symbol>

        <symbol id="arrow-right" viewBox="0 0 20 20">
            <path
                d="M8 14.445L9.068 15.5l4.822-4.762a1.035 1.035 0 000-1.476L9.068 4.5 8 5.555 12.502 10 8 14.445z"
                fillRule="nonzero"
            />
        </symbol>
    </SvgSprite>
);
