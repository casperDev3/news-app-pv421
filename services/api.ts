import axios, {AxiosInstance} from "axios";
import * as SecureStore from 'expo-secure-store'
import {baseURL, prefix} from "@/constants/urls";


class ApiClient {
    private static instance: ApiClient;
    public axiosInstance: AxiosInstance;

    private constructor() {
        this.axiosInstance = axios.create({
            baseURL: baseURL + prefix,
            // timeout: 5000,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        this.axiosInstance.interceptors.request.use(
            async (config) => {
                const token = await SecureStore.getItemAsync('access_token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        )
    }

    public static getInstance() {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient();
        }
        return ApiClient.instance;
    }

    // Wrappers for basic methods
    public async get<T>(url: string, params?: any) {
        return this.axiosInstance.get<T>(url, {params});
    }

    public async post<T>(url: string, data: T) {
        return this.axiosInstance.post<T>(url, data);
    }
}

export default ApiClient;

