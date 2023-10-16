import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from 'routes/paths';

export const Home: FC = () => <Navigate to={ROUTES.SIGNIN} />;
