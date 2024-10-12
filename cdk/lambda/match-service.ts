import { randomUUID } from "crypto"
import { MatchStatus, MatchDto, PostMatchDto, Team } from "./model"
import {putItemToDynamo, getItemsFromDynamo} from "../dynamo/utils"
import {DynamoTables} from "../dynamo/tables"


export function getAllMatches(): MatchDto[]{

    getItemsFromDynamo
}
export function processMatch(postMatchDto: PostMatchDto): MatchDto {
    const { team1Player1, team1Player2, team2Player1, team2Player2, ...otherPostMatchDtoProps } = postMatchDto

    let match: MatchDto = {
        id: randomUUID(),
        players: [
            { id: team1Player1, team: Team.TEAM_1 },
            { id: team1Player2, team: Team.TEAM_1 },
            { id: team2Player1, team: Team.TEAM_2 },
            { id: team2Player2, team: Team.TEAM_2 },
        ],
        status: MatchStatus.APPROVED,
        reason :"Match approved automatically",
        ...otherPostMatchDtoProps
    }

    if (validateDistinctPlayers(match) == false) {
        match.status = MatchStatus.INVALID
        match.reason = "Four distinct players are needed"
    }

    if (validateMatchScores(match) == undefined) {
        match.status = MatchStatus.INVALID
        match.reason = "Cannot determine a match winner. Draws are not allowed"
    }

    putItemToDynamo(DynamoTables[process.env.MATCH_TABLE as keyof typeof DynamoTables], match)

    return match
}


function validateDistinctPlayers(match: MatchDto): boolean {
    return match.players
        .map(player => player.id)
        .filter(id => id.trim() !== '')
        .reduce((set, id) => set.add(id), new Set<string>()).size === 4
}

function validateMatchScores(match: MatchDto): Team | undefined {
    const scores = [
        { team1: match.set1Team1Score, team2: match.set1Team2Score },
        { team1: match.set2Team1Score, team2: match.set2Team2Score },
        { team1: match.set3Team1Score, team2: match.set3Team2Score }
    ];

    if (!isSetScoreValid(scores[0]) || !isSetScoreValid(scores[1])) return undefined

    const firstSetWinner = getSetWinner(scores[0].team1, scores[0].team2)
    const secondSetWinner = getSetWinner(scores[1].team1, scores[1].team2)

    if (firstSetWinner === secondSetWinner) return firstSetWinner

    return isSetScoreValid(scores[2]) === true ? getSetWinner(scores[2].team1, scores[2].team2) : undefined
}

function isSetScoreValid({ team1, team2 }: { team1: number; team2: number }): boolean {
    return (
        typeof team1 === 'number' && team1 >= 0 &&
        typeof team2 === 'number' && team2 >= 0 &&
        team1 + team2 > 0 &&
        team1 !== team2
    );
}

const getSetWinner= (team1Score: number, team2Score: number) => team1Score > team2Score ? Team.TEAM_1 : Team.TEAM_2
