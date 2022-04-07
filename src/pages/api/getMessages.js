export default async (req, res) => {
    const messages = [
        {
            id: 1,
            text: 'Hello World',
            user: {
                id: 1,
                name: 'Barış'
            }
        },
        {
            id: 2,
            text: 'By World',
            user: {
                id: 2,
                name: 'Ahmet'
            },
        },   
        {
            id: 3,
            text: 'Deneme mesajı',
            user: {
                id: 1,
                name: 'Barış'
            }
        },
        {
            id: 4,
            text: 'ikinci deneme mesajı',
            user: {
                id: 1,
                name: 'Barış'
            }
        },
        {
            id: 5,
            text: 'Gönderici Mesajı',
            user: {
                id: 2,
                name: 'Ahmet'
            }
        }
    ]

    res.status(200).json(messages)
}
    
