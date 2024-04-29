import axios from 'axios';

interface ServerStatus {
    status: 'online' | 'offline' | 'checking';
    players: number;
}

export async function fetchServerStatus(serverip: String): Promise<ServerStatus[]> {
    try {
        const response = await axios.get('https://api.mcstatus.io/v2/status/java/'+serverip); // 替换为你的API端点
        return response.data.map((server: any) => ({
            online: server.status,
            players: server.players.online,
        }));
    } catch (error) {
        console.error('Failed to fetch server status:', error);
        return [{ status: 'offline', players: 0 }, { status: 'offline', players: 0 }];
    }
}

