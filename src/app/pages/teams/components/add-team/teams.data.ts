import { TeamImage } from '../../../../models/teams.model';

const femaleTeams: TeamImage[] = [
    {
        id: 1,
        name: 'caruaru',
        imageUrl: '../../../../../assets/imgs/teams/feminine/caruaru-logo.png',
        isSelected: false
    },
    {
        id: 2,
        name: 'central volei',
        imageUrl: '../../../../../assets/imgs/teams/feminine/centralvolei-logo.jpeg',
        isSelected: false
    },
    {
        id: 3,
        name: 'desportivo pe',
        imageUrl: '../../../../../assets/imgs/teams/feminine/desportivope-logo.png',
        isSelected: false,
        isDuplicated: true
    },
    {
        id: 4,
        name: 'desportivo rio grande',
        imageUrl: '../../../../../assets/imgs/teams/feminine/desportivoriogrande-logo.jpg',
        isSelected: false,
        isDuplicated: true
    },
    {
        id: 5,
        name: 'independente',
        imageUrl: '../../../../../assets/imgs/teams/feminine/independente-logo.png',
        isSelected: false,
        isDuplicated: true
    },
    {
        id: 6,
        name: 'match',
        imageUrl: '../../../../../assets/imgs/teams/feminine/match-logo.png',
        isSelected: false
    },
    {
        id: 7,
        name: 'santa cruz',
        imageUrl: '../../../../../assets/imgs/teams/feminine/santacruz-logo.png',
        isSelected: false,
        isDuplicated: true
    },
    {
        id: 8,
        name: 'soberanas',
        imageUrl: '../../../../../assets/imgs/teams/feminine/soberanas-logo.png',
        isSelected: false
    },
    {
        id: 9,
        name: 'sport',
        imageUrl: '../../../../../assets/imgs/teams/feminine/sport-logo.png',
        isSelected: false,
        isDuplicated: true
    },
    {
        id: 10,
        name: 'uniao e forca',
        imageUrl: '../../../../../assets/imgs/teams/feminine/uniaoeforca-logo.jpeg',
        isSelected: false
    },
];

const maleTeams: TeamImage[] = [
    {
        id: 1,
        name: 'amis',
        imageUrl: '../../../../../assets/imgs/teams/masculine/amis-logo.jpg',
        isSelected: false
    },
    {
        id: 2,
        name: 'desportivo pe',
        imageUrl: '../../../../../assets/imgs/teams/masculine/desportivo-pe-logo.png',
        isSelected: false
    },
    {
        id: 3,
        name: 'desportivo rio grande',
        imageUrl: '../../../../../assets/imgs/teams/masculine/desportivo-rio-grande-logo.jpg',
        isSelected: false
    },
    {
        id: 4,
        name: 'edmur',
        imageUrl: '../../../../../assets/imgs/teams/masculine/edmur-logo.png',
        isSelected: false
    },
    {
        id: 5,
        name: 'independente',
        imageUrl: '../../../../../assets/imgs/teams/masculine/independente-logo.png',
        isSelected: false
    },
    {
        id: 6,
        name: 'instituto',
        imageUrl: '../../../../../assets/imgs/teams/masculine/instituto-logo.jpg',
        isSelected: false
    },
    {
        id: 7,
        name: 'santa cruz',
        imageUrl: '../../../../../assets/imgs/teams/masculine/santacruz-logo.png',
        isSelected: false
    },
    {
        id: 8,
        name: 'sao bento do una',
        imageUrl: '../../../../../assets/imgs/teams/masculine/saobentodouna-logo.jpg',
        isSelected: false
    },
    {
        id: 9,
        name: 'sport',
        imageUrl: '../../../../../assets/imgs/teams/masculine/sport-logo.png',
        isSelected: false
    },
    {
        id: 10,
        name: 'super volei caruaru',
        imageUrl: '../../../../../assets/imgs/teams/masculine/supervoleicaruaru-logo.png',
        isSelected: false
    },
    {
        id: 11,
        name: 'ufpe',
        imageUrl: '../../../../../assets/imgs/teams/masculine/ufpe-logo.png',
        isSelected: false
    },
    {
        id: 12,
        name: 'veritas',
        imageUrl: '../../../../../assets/imgs/teams/masculine/veritas-logo.png',
        isSelected: false
    },
];

const allTeams = () => {
    const getAllTeams = [...femaleTeams, ...maleTeams].filter( team => !team?.isDuplicated);
    return getAllTeams;
};

export {
    femaleTeams,
    maleTeams,
    allTeams
};

