export type PostMatchDto = {
    startTime: Date
    team1Player1: string
    team1Player2: string
    team2Player1: string
    team2Player2: string
    set1Team1Score: number
    set1Team2Score: number
    set2Team1Score: number
    set2Team2Score: number
    set3Team1Score: number
    set3Team2Score: number
}

export enum TEAM { TEAM_1 = "TEAM_1", TEAM_2 = "TEAM_2" }

export enum MATCH_STATUS {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    INVALID = "INVALID"
}

export type MatchPlayerDto = {
    id: string
    team: TEAM
    // status?: MATCH_STATUS = MATCH_STATUS.PENDING
    name?: string
}

export type MatchDto = {
    id: String
    startTime: Date
    players: MatchPlayerDto[]
    set1Team1Score: number
    set1Team2Score: number
    set2Team1Score: number
    set2Team2Score: number
    set3Team1Score: number
    set3Team2Score: number
    status: MATCH_STATUS
    reason?: string
}