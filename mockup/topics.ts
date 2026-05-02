export interface Topic {
    id: number;
    title: string;
    description: string;
    image: string;
}

export const topics: Topic[] = [
    {
        id: 1,
        title: "Health",
        description: "Get energizing workout moves, healthy recipes and nutrition experts' advice to achieve your personal wellness goals.",
        image: "https://picsum.photos/seed/health1/70/70",
    },
    {
        id: 2,
        title: "Technology",
        description: "The application of scientific knowledge to the practical aims of human life and the changing of the human environment.",
        image: "https://picsum.photos/seed/tech1/70/70",
    },
    {
        id: 3,
        title: "Art",
        description: "Art is a diverse range of human activity involving creative or imaginative talent expressive of technical proficiency.",
        image: "https://picsum.photos/seed/art1/70/70",
    },
    {
        id: 4,
        title: "Sports",
        description: "Latest sports news, scores, standings, fantasy games and more from around the world.",
        image: "https://picsum.photos/seed/sports1/70/70",
    },
    {
        id: 5,
        title: "Politics",
        description: "In-depth coverage of elections, government policy, international relations and political analysis.",
        image: "https://picsum.photos/seed/politics1/70/70",
    },
]
