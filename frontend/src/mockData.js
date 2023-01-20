export const failureData = {
  failures: [
    {
      id: 1,
      title: "Called too early to fetch init data",
      description: "When using robot framework with wiremock, I called too early to fetch data and \
    therefore I was testing against wrong data at first",
      technologies: [
        "Wiremock", "Robot Framework", "Java Spring"
      ],
      starRating: "4.7",
      tags: [
        "Java11", "WireMock", "Testing"
      ],
      votes: 19,
      dateOfCreation: "2022-10-31T09:00:00.594Z",
      comments: [
        "nice!", 
        "Oh I spent hours with this!",
        "Saved hours from me!",
        "Stumbled with same!"
      ]
    },
    {
      id: 2,
      title: "React Hooks acting weird",
      description: "Had huge performance issues while using react hooks",
      technologies: [
        "React", "TypeScript"
      ],
      starRating: "3.0",
      tags: [
        "hooks", "React18", "Frontend"
      ],
      votes: 12,
      dateOfCreation: "2022-10-31T09:00:00.594Z",
      comments: ["good stuff", "Oh I spent so long with this as well!"]
    }
  ]
}