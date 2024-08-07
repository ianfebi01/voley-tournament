export interface IApiProfile{
        id: string
        username?: string
        accessToken?: string
        refreshToken?: string
}
export interface IApiPayload{
        email: string
        name: string
        quote?: string | null
        personImage?: string
        textBg?: string,
        openToWork?: boolean
}