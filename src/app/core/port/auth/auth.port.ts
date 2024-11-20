export interface PAuth{
    /**
     * Login user
     * @param {ILoginRequest} - Login request
     * @returns {Promise<ILoginResponse>}Login response
     */
    
    login(req: ILoginRequest): Promise<ILoginResponse>
}