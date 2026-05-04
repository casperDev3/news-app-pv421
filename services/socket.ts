import {io} from 'socket.io-client';
import {baseURL, prefix} from '@/constants/urls'

export const socket = io(
    baseURL + prefix, {
        autoConnect: false,
    }
);