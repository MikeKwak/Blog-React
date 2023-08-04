import client from './client';

export const leave = (id: string) => 
    client.post<string>('/api/groups/leave', { groupID: id })
