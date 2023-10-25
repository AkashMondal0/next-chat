"use client"
import React, { FC } from 'react';

interface Socket_ProviderProps {
    children: React.ReactNode;
}
const Socket_Provider: FC<Socket_ProviderProps> = ({
    children
}) => {

    return (
        <>
            {children}
        </>
    );
};

export default Socket_Provider;