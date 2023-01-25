export const failureData = {
  failures: [
    {
      id: 1,
      creator: {
        name: "Hessu Jacobsen",
        avatar: "avatar.png"
      },
      title: "Called too early to fetch init data",
      description: "When using robot framework with wiremock, I called too early to fetch data and \
    therefore I was testing against wrong data at first",
      solution: "Turned off/on my computer",
      technologies: [
        "Wiremock", "Robot Framework", "Java Spring"
      ],
      starRating: "4.7",
      tags: [
        "Java11", "WireMock", "Testing"
      ],
      votes: 19,
      timeOfCreation: "2023-01-23T09:00:00.594Z",
      comments: [
        "nice!",
        "Oh I spent hours with this!",
        "Saved hours from me!",
        "Stumbled with same!"
      ]
    },
    {
      id: 2,
      creator: {
        name: "Jesse Powell",
        avatar: "avatar.png"
      },
      title: "React Hooks acting weird",
      description: "Had huge performance issues while using react hooks",
      solution: "Turned off/on my computer",
      technologies: [
        "React", "TypeScript"
      ],
      starRating: "3.0",
      tags: [
        "hooks", "React18", "Frontend"
      ],
      votes: 12,
      timeOfCreation: "2023-01-01T09:00:00.594Z",
      comments: ["good stuff", "Oh I spent so long with this as well!"]
    },
    {
      id: 3,
      creator: {
        name: "Keke Boi",
        avatar: "avatar.png"
      },
      title: "React Hooks acting weird",
      description: "Had huge performance issues while using react hooks",
      solution: "Turned off/on my computer",
      technologies: [
        "React", "TypeScript"
      ],
      starRating: "3.0",
      tags: [
        "typeScript", "Cobol", "mainframe"
      ],
      votes: 12,
      timeOfCreation: "2020-12-01T12:55:43.594Z",
      comments: ["good stuff", "Oh I spent so long with this as well!"]
    }
  ]
}


export const overviewTechUsedData = {
  data: [
    { value: 50, color: 'light-5', name: "React" },
    { value: 30, color: 'yellow', name: "TS" },
    { value: 20, color: 'graph-0', name: "Java" },
    { value: 10, color: 'light-2', name: "Cobol" },
    { value: 5, color: 'brand', name: "PHP" },
  ]
}

export const overviewVotesData = {
  data: [
    { date: '2020-08-20', amount: 2 },
    { date: '2020-08-21', amount: 47 },
    { date: '2020-08-22', amount: 33 },
    { date: '2020-08-22', amount: 33 }
  ]
}

export const overviewFailuresCreatedData = {
  data: [
    { date: '2019-08-21', amount: 6 },
    { date: '2020-08-20', amount: 1 },
    { date: '2020-08-21', amount: 6 },
    { date: '2021-08-21', amount: 3 },
    { date: '2023-08-22', amount: 2 }
  ]
}