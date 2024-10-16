import { MatchStatus, Match, PostMatchDto, Team, Player } from "./model"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoTables} from "../dynamo/tables"
import { findPlayerById } from "./player-service";
import { nanoid } from "nanoid";


const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

export async function findMatchById(matchId: String){
    console.log(`Searching match by id ${matchId}`)
    return (await dynamo.send(
        new GetCommand({
          TableName: DynamoTables.MATCH,
          Key: {
            id: matchId,
          },
        }))).Item
}

export async function findAllMatches(){
    return (await dynamo.send(
        new ScanCommand({ TableName: DynamoTables.MATCH })
      )).Items;
}

export async function processMatch(postMatchDto: PostMatchDto): Promise<Match> {
    const { startTime, team1Player1, team1Player2, team2Player1, team2Player2, ...otherPostMatchDtoProps } = postMatchDto

    let match: Match = {
        id: nanoid(),
        players: [
          { playerId: team1Player1, team: Team.TEAM_1 },
          { playerId: team1Player2, team: Team.TEAM_1 },
          { playerId: team2Player1, team: Team.TEAM_2 },
          { playerId: team2Player2, team: Team.TEAM_2 },
      ],
        startTime: startTime.toISOString(),
        status: MatchStatus.APPROVED,
        reason :"Match approved automatically",
        ...otherPostMatchDtoProps
    }

    if (postMatchDto.startTime > new Date()) {
        match.status = MatchStatus.INVALID
        match.reason = "Future matches cannot have a result"
    }

    if (validateDistinctPlayers(match) == false) {
        match.status = MatchStatus.INVALID
        match.reason = "Four distinct players are needed"
    }

    if (validateMatchScores(match) == undefined) {
        match.status = MatchStatus.INVALID
        match.reason = "Cannot determine a match winner. Draws are not allowed"
    }  
    match.players.forEach(async player => {
      const savedPlayer = (await findPlayerById(player.playerId))
      player.name = savedPlayer ? savedPlayer.name : "josias"
    })
    
   await dynamo.send(new PutCommand({
        TableName: DynamoTables.MATCH,
        Item: match,
      }))
      

    return match
}


function validateDistinctPlayers(match: Match): boolean {
    return match.players
        .map(player => player.playerId)
        .filter(id => id.trim() !== '')
        .reduce((set, id) => set.add(id), new Set<string>()).size === 4
}

function validateMatchScores(match: Match): Team | undefined {
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
