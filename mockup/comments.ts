export interface Comment {
    id: number;
    author: string;
    avatar: string;
    text: string;
    time: string;
    likes: number;
    liked: boolean;
    replies?: Comment[];
}

export const comments: Comment[] = [
    {
        id: 1,
        author: "Wilson Franci",
        avatar: "https://picsum.photos/seed/wilson/50/50",
        text: "This is a really important story. The international community needs to take a stronger stance on this issue before it escalates further.",
        time: "4w",
        likes: 125,
        liked: false,
        replies: [
            {
                id: 11,
                author: "Madelyn Saris",
                avatar: "https://picsum.photos/seed/madelyn/50/50",
                text: "Completely agree. The response has been far too slow given the severity of the situation on the ground.",
                time: "4w",
                likes: 3,
                liked: true,
                replies: [],
            },
            {
                id: 12,
                author: "Jake Morrison",
                avatar: "https://picsum.photos/seed/jake/50/50",
                text: "Well said. Diplomacy has its limits.",
                time: "3w",
                likes: 1,
                liked: false,
                replies: [],
            },
        ],
    },
    {
        id: 2,
        author: "Marley Botosh",
        avatar: "https://picsum.photos/seed/marley/50/50",
        text: "I've been following this story closely. It's heartbreaking to see how many civilians are being affected by decisions made far above their heads.",
        time: "4w",
        likes: 12,
        liked: false,
        replies: [
            {
                id: 21,
                author: "Sean Ellis",
                avatar: "https://picsum.photos/seed/sean/50/50",
                text: "That's the tragedy of it all. Ordinary people pay the price.",
                time: "4w",
                likes: 2,
                liked: false,
                replies: [],
            },
            {
                id: 22,
                author: "Tina Rhodes",
                avatar: "https://picsum.photos/seed/tina/50/50",
                text: "Shared this with my family. Everyone should be aware.",
                time: "3w",
                likes: 0,
                liked: false,
                replies: [],
            },
        ],
    },
    {
        id: 3,
        author: "Alfonso Septimus",
        avatar: "https://picsum.photos/seed/alfonso/50/50",
        text: "The economic implications alone are staggering. We're already seeing the ripple effects in fuel and food prices globally. This will affect everyone, not just those directly involved.",
        time: "4w",
        likes: 14000,
        liked: true,
        replies: [],
    },
    {
        id: 4,
        author: "Omar Herwitz",
        avatar: "https://picsum.photos/seed/omar/50/50",
        text: "Thank you for this detailed report. It's rare to find journalism that digs this deep without sensationalizing the facts.",
        time: "4w",
        likes: 16,
        liked: false,
        replies: [],
    },
    {
        id: 5,
        author: "Corey Geidt",
        avatar: "https://picsum.photos/seed/corey/50/50",
        text: "Shared this article with my entire team. We've been discussing the geopolitical situation all week and this gave us a lot more context.",
        time: "3w",
        likes: 8,
        liked: false,
        replies: [],
    },
    {
        id: 6,
        author: "Priya Nair",
        avatar: "https://picsum.photos/seed/priya/50/50",
        text: "The historical parallels are striking. We've seen this pattern before and the outcome is rarely good for anyone involved.",
        time: "2w",
        likes: 22,
        liked: false,
        replies: [],
    },
]
