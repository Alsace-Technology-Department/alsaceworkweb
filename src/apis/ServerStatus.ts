// src/lib/fetchServerStatus.ts
import axios from 'axios';

interface ServerStatus {
    status: 'online' | 'offline' | 'checking';
    players: number;
}

export async function fetchServerStatus(serverIp: string): Promise<ServerStatus> {
    try {
        const response = await axios.get(`https://api.mcstatus.io/v2/status/java/${serverIp}`);
        return {
            status: response.data.online ? 'online' : 'offline',
            players: response.data.players.online,
        };
    } catch (error) {
        console.error('Failed to fetch server status:', error);
        return { status: 'offline', players: 0 };
    }
}
