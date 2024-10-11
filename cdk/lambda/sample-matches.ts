import { MATCH_STATUS, MatchDto, TEAM } from "./model";

export const sampleMatches: [MatchDto] = [
    {
        "id": "67067d64aead0318094d3053",
        "startTime": new Date("2024-09-06T16:00:00"),
        "players": [
            {
                "id": "67067d64aead0318094d304f",
                "name": "juan",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d3050",
                "name": "ivan",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d3051",
                "name": "marcus",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d3052",
                "name": "pawel",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            }
        ],
        "set1Team1Score": 2,
        "set1Team2Score": 6,
        "set2Team1Score": 1,
        "set2Team2Score": 6,
        "set3Team1Score": 0,
        "set3Team2Score": 0,
        "status": MATCH_STATUS.APPROVED,
        "reason": null
    },
    {
        "id": "67067d64aead0318094d3058",
        "startTime": new Date("2024-09-06T19:00:00"),
        "players": [
            {
                "id": "67067d64aead0318094d3054",
                "name": "andrea",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d3055",
                "name": "gavan",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d3056",
                "name": "raul-marc",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d3057",
                "name": "marc",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            }
        ],
        "set1Team1Score": 6,
        "set1Team2Score": 4,
        "set2Team1Score": 4,
        "set2Team2Score": 6,
        "set3Team1Score": 4,
        "set3Team2Score": 10,
        "status": MATCH_STATUS.APPROVED,
        "reason": null
    },
    {
        "id": "67067d64aead0318094d305d",
        "startTime": new Date("2024-09-06T19:00:00"),
        "players": [
            {
                "id": "67067d64aead0318094d3059",
                "name": "matias",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d305a",
                "name": "gonzalo",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d305b",
                "name": "matt",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d305c",
                "name": "wayne",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            }
        ],
        "set1Team1Score": 6,
        "set1Team2Score": 4,
        "set2Team1Score": 6,
        "set2Team2Score": 2,
        "set3Team1Score": 0,
        "set3Team2Score": 0,
        "status": MATCH_STATUS.APPROVED,
        "reason": null
    },
    {
        "id": "67067d64aead0318094d3062",
        "startTime": new Date("2024-09-06T19:00:00"),
        "players": [
            {
                "id": "67067d64aead0318094d305e",
                "name": "adam",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d305f",
                "name": "brad",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d3060",
                "name": "dejan",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d3061",
                "name": "zlatko",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            }
        ],
        "set1Team1Score": 6,
        "set1Team2Score": 2,
        "set2Team1Score": 6,
        "set2Team2Score": 1,
        "set3Team1Score": 0,
        "set3Team2Score": 0,
        "status": MATCH_STATUS.APPROVED,
        "reason": null
    },
    {
        "id": "67067d64aead0318094d3067",
        "startTime": new Date("2024-09-06T20:00:00"),
        "players": [
            {
                "id": "67067d64aead0318094d3063",
                "name": "raffaele",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d3064",
                "name": "gaston",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d3065",
                "name": "emiliano",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d3066",
                "name": "raul-emiliano",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            }
        ],
        "set1Team1Score": 6,
        "set1Team2Score": 2,
        "set2Team1Score": 6,
        "set2Team2Score": 1,
        "set3Team1Score": 0,
        "set3Team2Score": 0,
        "status": MATCH_STATUS.APPROVED,
        "reason": null
    },
    {
        "id": "67067d65aead0318094d306c",
        "startTime": new Date("2024-09-06T20:00::00"),
        "players": [
            {
                "id": "67067d65aead0318094d3068",
                "name": "victor",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d65aead0318094d3069",
                "name": "giulio",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d65aead0318094d306a",
                "name": "jussi",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d65aead0318094d306b",
                "name": "scott",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            }
        ],
        "set1Team1Score": 6,
        "set1Team2Score": 3,
        "set2Team1Score": 6,
        "set2Team2Score": 4,
        "set3Team1Score": 0,
        "set3Team2Score": 0,
        "status": MATCH_STATUS.APPROVED,
        "reason": null
    },
    {
        "id": "67067d65aead0318094d3071",
        "startTime": new Date("2024-09-06T20:00::00"),
        "players": [
            {
                "id": "67067d65aead0318094d306d",
                "name": "will",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d65aead0318094d306e",
                "name": "sebastian",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d65aead0318094d306f",
                "name": "tom",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d65aead0318094d3070",
                "name": "nazarehturmina",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            }
        ],
        "set1Team1Score": 2,
        "set1Team2Score": 6,
        "set2Team1Score": 7,
        "set2Team2Score": 5,
        "set3Team1Score": 12,
        "set3Team2Score": 14,
        "status": MATCH_STATUS.APPROVED,
        "reason": null
    },
    {
        "id": "67067d65aead0318094d3076",
        "startTime": new Date("2024-09-07T19:00::00"),
        "players": [
            {
                "id": "67067d65aead0318094d3072",
                "name": "ignacio",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d65aead0318094d3073",
                "name": "santiago",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d65aead0318094d3074",
                "name": "javier",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d65aead0318094d3075",
                "name": "mitchell",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            }
        ],
        "set1Team1Score": 6,
        "set1Team2Score": 1,
        "set2Team1Score": 6,
        "set2Team2Score": 2,
        "set3Team1Score": 0,
        "set3Team2Score": 0,
        "status": MATCH_STATUS.APPROVED,
        "reason": null
    },
    {
        "id": "67067d65aead0318094d3077",
        "startTime": new Date("2024-09-07T19:00::00"),
        "players": [
            {
                "id": "67067d64aead0318094d305a",
                "name": "gonzalo",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d305c",
                "name": "wayne",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d3060",
                "name": "dejan",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d3061",
                "name": "zlatko",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            }
        ],
        "set1Team1Score": 6,
        "set1Team2Score": 1,
        "set2Team1Score": 6,
        "set2Team2Score": 1,
        "set3Team1Score": 0,
        "set3Team2Score": 0,
        "status": MATCH_STATUS.APPROVED,
        "reason": null
    },
    {
        "id": "67067d65aead0318094d3078",
        "startTime": new Date("2024-09-07T20:00::00"),
        "players": [
            {
                "id": "67067d65aead0318094d3072",
                "name": "ignacio",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d65aead0318094d3073",
                "name": "santiago",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d3056",
                "name": "raul-marc",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d3057",
                "name": "marc",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            }
        ],
        "set1Team1Score": 6,
        "set1Team2Score": 2,
        "set2Team1Score": 6,
        "set2Team2Score": 4,
        "set3Team1Score": 0,
        "set3Team2Score": 0,
        "status": MATCH_STATUS.APPROVED,
        "reason": null
    },
    {
        "id": "67067d65aead0318094d3079",
        "startTime": new Date("2024-09-07T20:00::00"),
        "players": [
            {
                "id": "67067d64aead0318094d3065",
                "name": "emiliano",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d3066",
                "name": "raul-emiliano",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d65aead0318094d306a",
                "name": "jussi",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d65aead0318094d306b",
                "name": "scott",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            }
        ],
        "set1Team1Score": 6,
        "set1Team2Score": 2,
        "set2Team1Score": 3,
        "set2Team2Score": 6,
        "set3Team1Score": 10,
        "set3Team2Score": 4,
        "status": MATCH_STATUS.APPROVED,
        "reason": null
    },
    {
        "id": "67067d65aead0318094d307a",
        "startTime": new Date("2024-09-07T20:00::00"),
        "players": [
            {
                "id": "67067d65aead0318094d306d",
                "name": "will",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d65aead0318094d306e",
                "name": "sebastian",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d304f",
                "name": "juan",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d3050",
                "name": "ivan",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            }
        ],
        "set1Team1Score": 6,
        "set1Team2Score": 2,
        "set2Team1Score": 6,
        "set2Team2Score": 3,
        "set3Team1Score": 0,
        "set3Team2Score": 0,
        "status": MATCH_STATUS.APPROVED,
        "reason": null
    },
    {
        "id": "67067d65aead0318094d307b",
        "startTime": new Date("2024-09-07T21:00::00"),
        "players": [
            {
                "id": "67067d64aead0318094d3059",
                "name": "matias",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d305a",
                "name": "gonzalo",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d305e",
                "name": "adam",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d305f",
                "name": "brad",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            }
        ],
        "set1Team1Score": 4,
        "set1Team2Score": 6,
        "set2Team1Score": 6,
        "set2Team2Score": 2,
        "set3Team1Score": 10,
        "set3Team2Score": 6,
        "status": MATCH_STATUS.APPROVED,
        "reason": null
    },
    {
        "id": "67067d65aead0318094d307c",
        "startTime": new Date("2024-09-07T21:00:00"),
        "players": [
            {
                "id": "67067d64aead0318094d3063",
                "name": "raffaele",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d3064",
                "name": "gaston",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d65aead0318094d3068",
                "name": "victor",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d65aead0318094d3069",
                "name": "giulio",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            }
        ],
        "set1Team1Score": 6,
        "set1Team2Score": 0,
        "set2Team1Score": 6,
        "set2Team2Score": 3,
        "set3Team1Score": 0,
        "set3Team2Score": 0,
        "status": MATCH_STATUS.APPROVED,
        "reason": null
    },
    {
        "id": "67067d65aead0318094d307d",
        "startTime": new Date("2024-09-07T21:00::00"),
        "players": [
            {
                "id": "67067d65aead0318094d306f",
                "name": "tom",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d65aead0318094d3070",
                "name": "nazarehturmina",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d3051",
                "name": "marcus",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d3052",
                "name": "pawel",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            }
        ],
        "set1Team1Score": 0,
        "set1Team2Score": 6,
        "set2Team1Score": 0,
        "set2Team2Score": 6,
        "set3Team1Score": 0,
        "set3Team2Score": 0,
        "status": MATCH_STATUS.APPROVED,
        "reason": null
    },
    {
        "id": "67067d65aead0318094d307e",
        "startTime": new Date("2024-09-08T08:00::00"),
        "players": [
            {
                "id": "67067d65aead0318094d3074",
                "name": "javier",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d65aead0318094d3075",
                "name": "mitchell",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d305a",
                "name": "gonzalo",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d305c",
                "name": "wayne",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            }
        ],
        "set1Team1Score": 2,
        "set1Team2Score": 6,
        "set2Team1Score": 6,
        "set2Team2Score": 7,
        "set3Team1Score": 0,
        "set3Team2Score": 0,
        "status": MATCH_STATUS.APPROVED,
        "reason": null
    },
    {
        "id": "67067d65aead0318094d307f",
        "startTime": new Date("2024-09-08T09:00::00"),
        "players": [
            {
                "id": "67067d64aead0318094d3065",
                "name": "emiliano",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d3066",
                "name": "raul-emiliano",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d65aead0318094d306d",
                "name": "will",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d65aead0318094d306e",
                "name": "sebastian",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            }
        ],
        "set1Team1Score": 5,
        "set1Team2Score": 7,
        "set2Team1Score": 6,
        "set2Team2Score": 1,
        "set3Team1Score": 12,
        "set3Team2Score": 10,
        "status": MATCH_STATUS.APPROVED,
        "reason": null
    },
    {
        "id": "67067d65aead0318094d3080",
        "startTime": new Date("2024-09-08T10:00::00"),
        "players": [
            {
                "id": "67067d65aead0318094d3072",
                "name": "ignacio",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d65aead0318094d3073",
                "name": "santiago",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d3059",
                "name": "matias",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d305a",
                "name": "gonzalo",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            }
        ],
        "set1Team1Score": 2,
        "set1Team2Score": 6,
        "set2Team1Score": 4,
        "set2Team2Score": 6,
        "set3Team1Score": 0,
        "set3Team2Score": 0,
        "status": MATCH_STATUS.APPROVED,
        "reason": null
    },
    {
        "id": "67067d65aead0318094d3081",
        "startTime": new Date("2024-09-08T10:00::00"),
        "players": [
            {
                "id": "67067d64aead0318094d3063",
                "name": "raffaele",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d3064",
                "name": "gaston",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d3051",
                "name": "marcus",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d3052",
                "name": "pawel",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            }
        ],
        "set1Team1Score": 6,
        "set1Team2Score": 3,
        "set2Team1Score": 2,
        "set2Team2Score": 6,
        "set3Team1Score": 5,
        "set3Team2Score": 10,
        "status": MATCH_STATUS.APPROVED,
        "reason": null
    },
    {
        "id": "67067d65aead0318094d3082",
        "startTime": new Date("2024-09-08T13:00::00"),
        "players": [
            {
                "id": "67067d64aead0318094d305a",
                "name": "gonzalo",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d305c",
                "name": "wayne",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d3065",
                "name": "emiliano",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d3066",
                "name": "raul-emiliano",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            }
        ],
        "set1Team1Score": 7,
        "set1Team2Score": 6,
        "set2Team1Score": 6,
        "set2Team2Score": 2,
        "set3Team1Score": 0,
        "set3Team2Score": 0,
        "status": MATCH_STATUS.APPROVED,
        "reason": null
    },
    {
        "id": "67067d65aead0318094d3083",
        "startTime": new Date("2024-09-08T14:00::00"),
        "players": [
            {
                "id": "67067d64aead0318094d3059",
                "name": "matias",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d305a",
                "name": "gonzalo",
                "team": TEAM.TEAM_1,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d3051",
                "name": "marcus",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING

            },
            {
                "id": "67067d64aead0318094d3052",
                "name": "pawel",
                "team": TEAM.TEAM_2,
                "status": MATCH_STATUS.PENDING
            }
        ],
        "set1Team1Score": 6,
        "set1Team2Score": 3,
        "set2Team1Score": 7,
        "set2Team2Score": 6,
        "set3Team1Score": 0,
        "set3Team2Score": 0,
        "status": MATCH_STATUS.APPROVED,
        "reason": null
    }
]