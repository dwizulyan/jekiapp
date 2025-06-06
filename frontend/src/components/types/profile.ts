export type ICustomCard = {
    label: string,
    value: string,
    className?: string,
}

export type IProfile = {
    id: number,
    username: string,
    email: string
}
export type IProfileContext = {
    id: number | null,
    setId: (id: number) => void,
    removeId: () => void,
    profile: IProfile | null,
    handleProfile: (id: number, username: string, email: string) => void
} 