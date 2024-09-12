import { Client, Account, ID } from 'appwrite'
import conf from '../conf'

export class AuthServices {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(conf.appWriteUrl);
        this.client.setProject(conf.appWriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
    try {
        const response = await this.account.create(ID.unique(), email, password, name);
        console.log("Create Account Response:", response); // Log response in detail
        if (response) {
            return this.login({ email, password });
        }
        return response;
    } catch (error) {
        console.error("Error in createAccount:", error); // Log error
        throw error;
    }
}

    


    async login({ email, password }) {
        try {
            const response = await this.account.createEmailPasswordSession(email, password);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const response = await this.account.get();
            return response;
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            const response = await this.account.deleteSessions();
            return response;
        } catch (error) {
            throw error;
        }
    }

 
}

const authServices = new AuthServices();
export default authServices;
