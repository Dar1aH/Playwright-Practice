import generateRandomEmail from "../utils/generateRandomEmail"
const uniqueEmail = `testuser+${Date.now()}@example.com`;

export const credentials = {
    userOne: {
        name: 'Daria',
        surname: 'Herasymenko',
        email: 'daria11@gmail.com',
        password: 'ZSgeVQhuU3qkvlG',
    },
    userTwo: {
        email: 'michael.krasnovskyi+testUser222@gmail.com',
        password: 'ZSgeVQhuU3qkvlG',
    },
    randomUser: {
        email: generateRandomEmail(),
        password: 'ZSgeVQhuU3qkvlG'
    }
}      