const QCCheckpoints = [
  {
    SectionName: "Tires",
    SectionNumber: 1,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check that the size and model of the tires matches the manufacturing order.",
        Status: "",
        CheckpointList: [
          {
            CheckpointID: "1.1.a",
            CheckpointDescription: "Axle 1 left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.1.b",
            CheckpointDescription: "Axle 2 left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.1.c",
            CheckpointDescription: "Axle 3 left",
            CheckpointStatus: "tbd",
          },
          {
            CheckpointID: "1.1.d",
            CheckpointDescription: "Axle 1 right",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.1.e",
            CheckpointDescription: "Axle 2 right",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.1.f",
            CheckpointDescription: "Axle 3 right",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 2,
        SubSectionDescription:
          "Check that all the tires' bolts are present and have the yellow mark indicating they have been torqued.",
        Status: "",
        CheckpointList: [
          {
            CheckpointID: "1.2.a",
            CheckpointDescription: "Axle 1 left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.2.b",
            CheckpointDescription: "Axle 2 left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.2.c",
            CheckpointDescription: "Axle 3 left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.2.d",
            CheckpointDescription: "Axle 1 right",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.2.e",
            CheckpointDescription: "Axle 2 right",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.2.f",
            CheckpointDescription: "Axle 2 right",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 3,
        SubSectionDescription:
          "Check that all the tires have proper air pressure. If there are 4 tires per axle, remember to check the inner tires as well. ",
        Status: "",
        CheckpointList: [
          {
            CheckpointID: "1.3.a",
            CheckpointDescription: "Axle 1 left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.3.b",
            CheckpointDescription: "Axle 2 left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.3.c",
            CheckpointDescription: "Axle 3 left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.3.d",
            CheckpointDescription: "Axle 1 right",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.3.e",
            CheckpointDescription: "Axle 2 right",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.3.f",
            CheckpointDescription: "Axle 2 right",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 4,
        SubSectionDescription:
          "Check oil level if tires go with oil, and check if they go with grease or oil",
        Status: "",
      },
      {
        SubSectionNumber: 5,
        SubSectionDescription:
          "Check that all the tires have the inflation system according to customer specifications.",
        Status: "",
      },
      {
        SubSectionNumber: 6,
        SubSectionDescription:
          "Check that the VIN number matches the work order.",
        Status: "",
      },
    ],
  },
];

export default QCCheckpoints;
