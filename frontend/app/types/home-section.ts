import { UserData } from "./auth";
import { Stall } from "./stall";

export interface HomeSectionProps {
    stalls: Array<Stall>
    userData: UserData
}