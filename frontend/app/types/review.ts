import { Consumer } from "./auth";

export interface Review {
    reviewID: number;
    reviewText: string;
    rating: number;
    isReported: false;
    reportText?: string;
    reportType?: ReportType;
    consumerID: number;
    consumer: Consumer
}

export enum ReportType {
    spam = "Spam",
    irrelevant = "Irrelevant to food",
    offensive = "Offensive"
}

export interface ReviewFormData {
    reviewText: string;
    rating: number;
    consumerID: number;
    stallID: number
}

export interface ReportFormData {
    reportType: ReportType;
    reportText: string;
}

export interface IgnoreReportPayload {
    stallID: number,
    rating: number,
    isReported: boolean,
    reviewText: string,
    reportType: string
    reportText: string
    consumerID: number
}