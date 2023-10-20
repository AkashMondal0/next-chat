"use client"
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { FC } from 'react';

interface Auth0_ProviderProps {
    children: React.ReactNode;
}
const Auth0_Provider: FC<Auth0_ProviderProps> = ({
    children
}) => {
    return (
        <UserProvider>
            {children}
        </UserProvider>
    )
};

export default Auth0_Provider;