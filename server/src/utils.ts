
export function leaveRoom(
    userId: string,
    chatRoomUser: allUserT[]
): allUserT[] {
    return chatRoomUser.filter((user) => user.id !== userId);
}
