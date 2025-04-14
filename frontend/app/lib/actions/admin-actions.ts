"use server";

import { Hawker } from "@/app/types/hawker";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_DEV_API_URL

export async function fetchAllHawkers() {
    try {
        const response = await fetch(`${API_URL}/hawkers`, {
            cache: 'no-store'
        })
        if (!response) {
            throw new Error(`Failed to fetch hawkers`)
        }
        const data = response.json()
        return data;
    } catch (error) {
        console.error(`Error fetching hawkers`)
        throw error instanceof Error
            ? error
            : new Error(`Error fetching hawkers`);
    }
}

export async function approveHawker(hawkerID: string) {
    try {
        const response = await fetch(`${API_URL}/admin/verify-hawker/${hawkerID}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"}
        })
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData?.detail || "Failed to approver hawker");
        }
        revalidatePath('/admin/hawker-approvals')
        return { success: true }
    } catch (error) {
        console.error(`Error approve hawker ${hawkerID}`)
        throw error instanceof Error
            ? error
            : new Error(`Error approver hawker ${hawkerID} `);
    }
}