export interface Article {
    id: number | string;
    title: string;
    category: string;
    source: string;
    sourceImage: string;
    time: string;
    body: string;
    image: string;
}

export const news: Article[] = [
    {
        id: 1,
        title: "Ukrainian President Zelensky to BBC: Blood money being paid for Russian oil",
        category: "Europe",
        source: "BBC News",
        sourceImage: "https://picsum.photos/seed/bbc/40/40",
        time: "14m ago",
        image: "https://picsum.photos/seed/ukraine1/800/450",
        body: "Ukrainian President Volodymyr Zelensky has accused European countries that continue to buy Russian oil of 'earning their money in other people's blood'.\n\nIn an interview with the BBC, President Zelensky singled out Germany and Hungary, accusing them of blocking efforts to embargo Russian energy sales, from which Russia stands to make up to £250bn ($326bn) this year.\n\nHe made the comments as part of an exclusive BBC interview, his first since Russia's invasion of Ukraine began more than two months ago.",
    },
    {
        id: 2,
        title: "Her train broke down. Her phone died. And then she met her husband",
        category: "Travel",
        source: "CNN",
        sourceImage: "https://picsum.photos/seed/cnn/40/40",
        time: "1h ago",
        image: "https://picsum.photos/seed/wedding1/800/450",
        body: "It was supposed to be a simple train journey from Milan to Rome, but it turned into the beginning of a love story that captured the internet's heart.\n\nWhen Sarah's phone ran out of battery and the train stopped unexpectedly due to a technical failure, she had no choice but to start a conversation with the stranger sitting next to her. Three hours later, they had exchanged numbers. Two years later, they were married.\n\n\"I was so frustrated at first,\" Sarah recalls, laughing. \"But now I think that broken train was the best thing that ever happened to me.\"",
    },
    {
        id: 3,
        title: "Russian warship Moskva sinks in Black Sea after Ukraine strike",
        category: "Europe",
        source: "BBC News",
        sourceImage: "https://picsum.photos/seed/bbc/40/40",
        time: "4h ago",
        image: "https://picsum.photos/seed/navy1/800/450",
        body: "Russia's Black Sea flagship, the Moskva, has sunk after what Moscow said was an onboard fire that caused ammunition to explode. Ukraine said it struck the vessel with two Neptune anti-ship missiles.\n\nThe Moskva was the most powerful warship in Russia's Black Sea fleet and had been involved in the siege of Snake Island in the early stages of the war. Its sinking is a major symbolic blow for Russia.\n\nThe US said it believed Ukraine's account of the incident, while NATO allies called it a significant development in the conflict.",
    },
    {
        id: 4,
        title: "Wind power produced more electricity than coal and nuclear combined this year",
        category: "Money",
        source: "USA Today",
        sourceImage: "https://picsum.photos/seed/usatoday/40/40",
        time: "4h ago",
        image: "https://picsum.photos/seed/windpower/800/450",
        body: "Renewable energy sources, particularly wind power, have crossed a historic milestone. For the first time, wind turbines generated more electricity than coal and nuclear power plants combined over a full calendar year in the United States.\n\nAccording to the Energy Information Administration, wind farms produced approximately 380 terawatt-hours of electricity, surpassing the combined output of aging coal and nuclear facilities.\n\nExperts say this shift marks a turning point in the country's energy transition and is expected to accelerate as older fossil fuel plants retire and wind capacity continues to expand.",
    },
    {
        id: 5,
        title: "'We keep rising to new challenges': Churches rebuild after pandemic losses",
        category: "Life",
        source: "USA Today",
        sourceImage: "https://picsum.photos/seed/usatoday/40/40",
        time: "6h ago",
        image: "https://picsum.photos/seed/church1/800/450",
        body: "Two years after the pandemic forced many houses of worship to close their doors and move services online, religious communities across the country are finding new ways to reconnect with their congregations.\n\nSome churches have permanently adopted hybrid worship models, blending in-person and online services. Others have launched community outreach programs to re-engage members who drifted away during lockdowns.\n\n\"The pandemic changed us,\" says Pastor Maria Gonzalez of New Life Church in Atlanta. \"But it didn't break us. If anything, it showed us how resilient our community truly is.\"",
    },
    {
        id: 6,
        title: "Scientists discover massive underground ocean beneath Earth's surface",
        category: "Science",
        source: "Reuters",
        sourceImage: "https://picsum.photos/seed/reuters/40/40",
        time: "8h ago",
        image: "https://picsum.photos/seed/ocean1/800/450",
        body: "Scientists have confirmed the existence of a vast reservoir of water trapped deep in Earth's mantle — roughly 400 miles below the surface — that could contain more water than all of Earth's oceans combined.\n\nThe discovery, published in the journal Nature, was made using seismic wave analysis and changes the scientific understanding of the water cycle on our planet.\n\n\"This suggests that Earth's water didn't just come from comets and asteroids,\" said lead researcher Dr. James Chen. \"It may have been slowly released from within the planet itself over billions of years.\"",
    },
]
