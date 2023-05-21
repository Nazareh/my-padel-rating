interface Match {
    id: string
    court: number
    datetime: Date
    wins: number
    losses: number
    team1: {
        player1: string,
        player2: string
    },team2: {
        player1: string,
        player2: string
    }
    
}