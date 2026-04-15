import { API_URL } from "../config/config";



export async function apiFetch(endpoint:string, options?:RequestInit & {revalidate?:number}){
    try{
        const {revalidate=3600, ...restOptions} = options ?? {};

        const response = await fetch(`${API_URL}${endpoint}`, {
            ...restOptions,
            next:{
                revalidate,
            }
        });

        if(!response.ok){
            return {
                data:null,
                error:`Request failed with status ${response.status}`
            }
        }

        const data = await response.json();

        return {
            data,
            error:null,
        }
    }catch(err){
        return {
            data:null,
            error: (err as Error).message ?? "Unknown error" 
        }
    }
}