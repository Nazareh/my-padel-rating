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

export enum Team { TEAM_1 = "TEAM_1", TEAM_2 = "TEAM_2" }

export enum MatchStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    INVALID = "INVALID"
}

export type MatchPlayer = {
    playerId: string
    team: Team
    name?: string
}

export type Rating = {
    type: string,
    matchId: string, 
    dateTime: Date,
    value: number,
    label: string
}

export type Player = {
    id: string
    name?: string
    email: string
    matchesWon: number
    matchesLost: number
    gamesWon: number
    gamesLost: number
    ratings: Map<String, Rating[]>
}

export type Match = {
    id: String
    startTime: String
    players: MatchPlayer[]
    set1Team1Score: number
    set1Team2Score: number
    set2Team1Score: number
    set2Team2Score: number
    set3Team1Score: number
    set3Team2Score: number
    status: MatchStatus
    reason?: string
}