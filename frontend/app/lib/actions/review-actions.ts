import { IgnoreReportPayload, ReviewFormData } from "@/app/types/review"
import { revalidatePath } from "next/cache"

const API_URL = process.env.NEXT_PUBLIC_DEV_API_URL

export async function fetchReviewByStallID(stallID: number) {
    try {
        const response = await fetch(`${API_URL}/stalls/${stallID}/reviews`)
        if (!response) {
            throw new Error(`Failed to fetch reviews by ${stallID}`)
        }
        const data = response.json()
        return data
    } catch (error) {
        console.error(`Fetching reviews ${stallID}`)
        throw error instanceof Error
            ? error
            : new Error(`Error fetching reviews by ${stallID}`);
    }
}

export async function fetchReportedReviews() {
    try {
        const response = await fetch(`${API_URL}/admin/reported_reviews`)
        if (!response) {
            throw new Error(`Failed to fetch reported reviews`)
        }
        const data = response.json()
        return data
    } catch (error) {
        console.error(`Fetching reported reviews`)
        throw error instanceof Error
            ? error
            : new Error(`Error fetching reported reviews`);
    }
}

export async function addReview(formData: ReviewFormData) {
    try {
        const response = await fetch(`${API_URL}/stalls/${formData.stallID}/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData?.detail || "Failed to add review");
        }
        revalidatePath(`/hawker/stall/${formData.stallID}`)
        return { success: true };
    } catch (error) {
        console.error("Failed to add review error:", error);
        throw error instanceof Error
            ? error
            : new Error("Failed to add review");
    }
}

export async function editReview(reviewID: number, formData: ReviewFormData) {
    try {
        const response = await fetch(`${API_URL}/review/update/${reviewID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                reviewID: reviewID,
                ...formData
            }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData?.detail || `Failed to update review ${reviewID}`);
        }
        revalidatePath(`/hawker/stall/${formData.stallID}`)
        return { success: true };
    } catch (error) {
        console.error("Failed to update review error:", error);
        throw error instanceof Error
            ? error
            : new Error("Failed to update review");
    }
}

export async function deleteReview(reviewID: number, stallID: number) {
    try {
        const response = await fetch(`${API_URL}/review/delete/${reviewID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData?.detail || "Failed to delete review");
        }
        revalidatePath(`/hawker/stall/${stallID}`)
    } catch (error) {
        console.error("Failed to delete review error:", error);
        throw error instanceof Error
            ? error
            : new Error("Failed to delete review");
    }
}

export async function reportReview(reviewID: number, formData: ReviewFormData) {
    try {
        const response = await fetch(`${API_URL}/review/${reviewID}/report`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                reviewID: reviewID,
                ...formData
            }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData?.detail || "Failed to report review");
        }
        revalidatePath(`/hawker/stall/${formData.stallID}`)
        return { success: true };
    } catch (error) {
        console.error("Failed to report review error:", error);
        throw error instanceof Error
            ? error
            : new Error("Failed to report review");
    }
}

export async function ignoreReportedReview(reviewID: number, payload: IgnoreReportPayload) {
    try {
        const response = await fetch(`${API_URL}/admin/reports/${reviewID}/ignore`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                reviewID: reviewID,
                ...payload
            }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData?.detail || `Failed to ignore review ${reviewID}`);
        }
        revalidatePath(`/admin/reported-reviews`)
        return { success: true };
    } catch (error) {
        console.error("Failed to ignore review error:", error);
        throw error instanceof Error
            ? error
            : new Error("Failed to ignore review");
    }
}