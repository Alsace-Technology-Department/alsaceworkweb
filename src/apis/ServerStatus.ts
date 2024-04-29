import axios from 'axios';

interface ServerStatus {
    name: string;
    status: 'online' | 'offline' | 'checking';
}

export async function fetchServerStatus(serverip: String): Promise<ServerStatus[]> {
    try {
        const response = await axios.get('https://api.mcstatus.io/v2/status/java/'+serverip); // 替换为你的API端点
        return response.data.map((server: any) => ({
            name: server.name,
            status: server.status,
        }));
    } catch (error) {
        console.error('Failed to fetch server status:', error);
        return [{ name: '工业园主服', status: 'offline' }, { name: '工业园生存服', status: 'offline' }];
    }
}

