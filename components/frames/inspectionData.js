const inspectionDataMap = {
  LEAD: {
    FRONT: [
      {
        SectionName: "Dimensions Check",
        SectionNumber: 1,
        SectionProgress: 0,
        SubSectionList: [
          {
            SubSectionNumber: 1,
            sectionType: "Number Inputs",
            SubSectionDescription: "Check Dimensions of length and width",
            Status: "",
            ImageList: [
              {
                url: ["/images/frames/lead/front.png"],
              },
            ],
            CheckpointList: [
              {
                CheckpointID: "1.1.a",
                CheckpointDescription: "Length",
                expectedValue: 105.3125,
                acceptableVariance: 0.04,
                unit: "inches",
              },
              {
                CheckpointID: "1.1.b",
                CheckpointDescription: "Width",
                expectedValue: 46,
                acceptableVariance: 0.04,
                unit: "inches",
              },
            ],
          },
        ],
      },
      {
        SectionName: "Welding Check",
        SectionNumber: 2,
        SectionProgress: 0,
        SubSectionList: [
          {
            SubSectionNumber: 1,
            sectionType: "Checkbox",
            SubSectionDescription: "Check the welds on the outside.",
            DoubleSided: "true",
            Status: "",
            ImageList: [
              {
                TrailerType: "LEAD",

                url: ["/images/frames/lead/front.png"],
              },
            ],
            CheckpointList: [
              {
                CheckpointID: "2.1.a",
                CheckpointDescription: "Welding Looks Good",
                CheckpointStatus: "",
              },
            ],
          },
        ],
      },
    ],
    REAR: [
      {
        SectionName: "Dimensions Check",
        SectionNumber: 1,
        SectionProgress: 0,
        SubSectionList: [
          {
            SubSectionNumber: 1,
            sectionType: "Number Inputs",
            SubSectionDescription: "Check Dimensions of length and width",
            Status: "",
            ImageList: [
              {
                url: ["/images/frames/lead/rear.png"],
              },
            ],
            CheckpointList: [
              {
                CheckpointID: "1.1.a",
                CheckpointDescription: "Length",
                expectedValue: 194.4375,
                acceptableVariance: 0.04,
                unit: "inches",
              },
              {
                CheckpointID: "1.1.b",
                CheckpointDescription: "Width",
                expectedValue: 49.0625,
                acceptableVariance: 0.04,
                unit: "inches",
              },
            ],
          },
        ],
      },
      {
        SectionName: "Welding Check",
        SectionNumber: 2,
        SectionProgress: 0,
        SubSectionList: [
          {
            SubSectionNumber: 1,
            sectionType: "Checkbox",
            SubSectionDescription: "Check the welds on the outside.",
            DoubleSided: "true",
            Status: "",
            ImageList: [
              {
                TrailerType: "LEAD",

                url: ["/images/frames/lead/rear.png"],
              },
            ],
            CheckpointList: [
              {
                CheckpointID: "2.1.a",
                CheckpointDescription: "Welding Looks Good",
                CheckpointStatus: "",
              },
            ],
          },
        ],
      },
    ],
  },
  PUP: {
    FRONT: [
      {
        SectionName: "Dimensions Check",
        SectionNumber: 1,
        SectionProgress: 0,
        SubSectionList: [
          {
            SubSectionNumber: 1,
            sectionType: "Number Inputs",
            SubSectionDescription: "Check Dimensions of length and width",
            Status: "",
            ImageList: [
              {
                url: ["/images/frames/pup/front.png"],
              },
            ],
            CheckpointList: [
              {
                CheckpointID: "1.1.a",
                CheckpointDescription: "Length",
                expectedValue: 107.9375,
                acceptableVariance: 0.04,
                unit: "inches",
              },
              {
                CheckpointID: "1.1.b",
                CheckpointDescription: "Width",
                expectedValue: 38.25,
                acceptableVariance: 0.04,
                unit: "inches",
              },
            ],
          },
        ],
      },
      {
        SectionName: "Welding Check",
        SectionNumber: 2,
        SectionProgress: 0,
        SubSectionList: [
          {
            SubSectionNumber: 1,
            sectionType: "Checkbox",
            SubSectionDescription: "Check the welds on the outside.",
            DoubleSided: "true",
            Status: "",
            ImageList: [
              {
                TrailerType: "PUP",

                url: ["/images/frames/pup/front.png"],
              },
            ],
            CheckpointList: [
              {
                CheckpointID: "2.1.a",
                CheckpointDescription: "Welding Looks Good",
                CheckpointStatus: "",
              },
            ],
          },
        ],
      },
    ],
    REAR: [
      {
        SectionName: "Dimensions Check",
        SectionNumber: 1,
        SectionProgress: 0,
        SubSectionList: [
          {
            SubSectionNumber: 1,
            sectionType: "Number Inputs",
            SubSectionDescription: "Check Dimensions of length and width",
            Status: "",
            ImageList: [
              {
                url: ["/images/frames/pup/rear.png"],
              },
            ],
            CheckpointList: [
              {
                CheckpointID: "1.1.a",
                CheckpointDescription: "Length",
                expectedValue: 98.875,
                acceptableVariance: 0.04,
                unit: "inches",
              },
              {
                CheckpointID: "1.1.b",
                CheckpointDescription: "Width",
                expectedValue: 48.3125,
                acceptableVariance: 0.04,
                unit: "inches",
              },
            ],
          },
        ],
      },
      {
        SectionName: "Welding Check",
        SectionNumber: 2,
        SectionProgress: 0,
        SubSectionList: [
          {
            SubSectionNumber: 1,
            sectionType: "Checkbox",
            SubSectionDescription: "Check the welds on the outside.",
            DoubleSided: "true",
            Status: "",
            ImageList: [
              {
                TrailerType: "PUP",

                url: ["/images/frames/pup/rear.png"],
              },
            ],
            CheckpointList: [
              {
                CheckpointID: "2.1.a",
                CheckpointDescription: "Welding Looks Good",
                CheckpointStatus: "",
              },
            ],
          },
        ],
      },
    ],
  },
  "TRI 61' 2 HOPPERS": {
    FRONT: [
      {
        SectionName: "Dimensions Check",
        SectionNumber: 1,
        SectionProgress: 0,
        SubSectionList: [
          {
            SubSectionNumber: 1,
            sectionType: "Number Inputs",
            SubSectionDescription: "Check Dimensions of length and width",
            Status: "",
            ImageList: [
              {
                url: ["/images/frames/tri/front.png"],
              },
            ],
            CheckpointList: [
              {
                CheckpointID: "1.1.a",
                CheckpointDescription: "Length",
                expectedValue: 126.8125,
                acceptableVariance: 0.04,
                unit: "inches",
              },
              {
                CheckpointID: "1.1.b",
                CheckpointDescription: "Width",
                expectedValue: 46,
                acceptableVariance: 0.04,
                unit: "inches",
              },
            ],
          },
        ],
      },
      {
        SectionName: "Welding Check",
        SectionNumber: 2,
        SectionProgress: 0,
        SubSectionList: [
          {
            SubSectionNumber: 1,
            sectionType: "Checkbox",
            SubSectionDescription: "Check the welds on the outside.",
            DoubleSided: "true",
            Status: "",
            ImageList: [
              {
                TrailerType: "Tri 61' 2 Hoppers",

                url: ["/images/frames/tri/front.png"],
              },
            ],
            CheckpointList: [
              {
                CheckpointID: "2.1.a",
                CheckpointDescription: "Welding Looks Good",
                CheckpointStatus: "",
              },
            ],
          },
        ],
      },
    ],
    REAR: [
      {
        SectionName: "Dimensions Check",
        SectionNumber: 1,
        SectionProgress: 0,
        SubSectionList: [
          {
            SubSectionNumber: 1,
            sectionType: "Number Inputs",
            SubSectionDescription: "Check Dimensions of length and width",
            Status: "",
            ImageList: [
              {
                url: ["/images/frames/tri/rear.png"],
              },
            ],
            CheckpointList: [
              {
                CheckpointID: "1.1.a",
                CheckpointDescription: "Length",
                expectedValue: 173.625,
                acceptableVariance: 0.04,
                unit: "inches",
              },
              {
                CheckpointID: "1.1.b",
                CheckpointDescription: "Width",
                expectedValue: 49.0625,
                acceptableVariance: 0.04,
                unit: "inches",
              },
            ],
          },
        ],
      },
      {
        SectionName: "Welding Check",
        SectionNumber: 2,
        SectionProgress: 0,
        SubSectionList: [
          {
            SubSectionNumber: 1,
            sectionType: "Checkbox",
            SubSectionDescription: "Check the welds on the outside.",
            DoubleSided: "true",
            Status: "",
            ImageList: [
              {
                TrailerType: "Tri 61' 2 Hoppers",

                url: ["/images/frames/tri/rear.png"],
              },
            ],
            CheckpointList: [
              {
                CheckpointID: "2.1.a",
                CheckpointDescription: "Welding Looks Good",
                CheckpointStatus: "",
              },
            ],
          },
        ],
      },
    ],
  },
  "TRI 61' 3 HOPPERS": {
    FRONT: [
      {
        SectionName: "Dimensions Check",
        SectionNumber: 1,
        SectionProgress: 0,
        SubSectionList: [
          {
            SubSectionNumber: 1,
            sectionType: "Number Inputs",
            SubSectionDescription: "Check Dimensions of length and width",
            Status: "",
            ImageList: [
              {
                url: ["/images/frames/tri/front.png"],
              },
            ],
            CheckpointList: [
              {
                CheckpointID: "1.1.a",
                CheckpointDescription: "Length",
                expectedValue: 126.8125,
                acceptableVariance: 0.04,
                unit: "inches",
              },
              {
                CheckpointID: "1.1.b",
                CheckpointDescription: "Width",
                expectedValue: 46,
                acceptableVariance: 0.04,
                unit: "inches",
              },
            ],
          },
        ],
      },
      {
        SectionName: "Welding Check",
        SectionNumber: 2,
        SectionProgress: 0,
        SubSectionList: [
          {
            SubSectionNumber: 1,
            sectionType: "Checkbox",
            SubSectionDescription: "Check the welds on the outside.",
            DoubleSided: "true",
            Status: "",
            ImageList: [
              {
                TrailerType: "Tri 61' 3 Hoppers",

                url: ["/images/frames/tri/front.png"],
              },
            ],
            CheckpointList: [
              {
                CheckpointID: "2.1.a",
                CheckpointDescription: "Welding Looks Good",
                CheckpointStatus: "",
              },
            ],
          },
        ],
      },
    ],
    REAR: [
      {
        SectionName: "Dimensions Check",
        SectionNumber: 1,
        SectionProgress: 0,
        SubSectionList: [
          {
            SubSectionNumber: 1,
            sectionType: "Number Inputs",
            SubSectionDescription: "Check Dimensions of length and width",
            Status: "",
            ImageList: [
              {
                url: ["/images/frames/tri/rear.png"],
              },
            ],
            CheckpointList: [
              {
                CheckpointID: "1.1.a",
                CheckpointDescription: "Length",
                expectedValue: 173.625,
                acceptableVariance: 0.04,
                unit: "inches",
              },
              {
                CheckpointID: "1.1.b",
                CheckpointDescription: "Width",
                expectedValue: 49.0625,
                acceptableVariance: 0.04,
                unit: "inches",
              },
            ],
          },
        ],
      },
      {
        SectionName: "Welding Check",
        SectionNumber: 2,
        SectionProgress: 0,
        SubSectionList: [
          {
            SubSectionNumber: 1,
            sectionType: "Checkbox",
            SubSectionDescription: "Check the welds on the outside.",
            DoubleSided: "true",
            Status: "",
            ImageList: [
              {
                TrailerType: "Tri 61' 3 Hoppers",

                url: ["/images/frames/tri/rear.png"],
              },
            ],
            CheckpointList: [
              {
                CheckpointID: "2.1.a",
                CheckpointDescription: "Welding Looks Good",
                CheckpointStatus: "",
              },
            ],
          },
        ],
      },
    ],
  },
  "TRI 72' 2 HOPPERS": {
    FRONT: [
      {
        SectionName: "Dimensions Check",
        SectionNumber: 1,
        SectionProgress: 0,
        SubSectionList: [
          {
            SubSectionNumber: 1,
            sectionType: "Number Inputs",
            SubSectionDescription: "Check Dimensions of length and width",
            Status: "",
            ImageList: [
              {
                url: ["/images/frames/tri/front.png"],
              },
            ],
            CheckpointList: [
              {
                CheckpointID: "1.1.a",
                CheckpointDescription: "Length",
                expectedValue: 126.8125,
                acceptableVariance: 0.04,
                unit: "inches",
              },
              {
                CheckpointID: "1.1.b",
                CheckpointDescription: "Width",
                expectedValue: 46,
                acceptableVariance: 0.04,
                unit: "inches",
              },
            ],
          },
        ],
      },
      {
        SectionName: "Welding Check",
        SectionNumber: 2,
        SectionProgress: 0,
        SubSectionList: [
          {
            SubSectionNumber: 1,
            sectionType: "Checkbox",
            SubSectionDescription: "Check the welds on the outside.",
            DoubleSided: "true",
            Status: "",
            ImageList: [
              {
                TrailerType: "Tri 72' 2 Hoppers",

                url: ["/images/frames/tri/front.png"],
              },
            ],
            CheckpointList: [
              {
                CheckpointID: "2.1.a",
                CheckpointDescription: "Welding Looks Good",
                CheckpointStatus: "",
              },
            ],
          },
        ],
      },
    ],
    REAR: [
      {
        SectionName: "Dimensions Check",
        SectionNumber: 1,
        SectionProgress: 0,
        SubSectionList: [
          {
            SubSectionNumber: 1,
            sectionType: "Number Inputs",
            SubSectionDescription: "Check Dimensions of length and width",
            Status: "",
            ImageList: [
              {
                url: ["/images/frames/tri/rear.png"],
              },
            ],
            CheckpointList: [
              {
                CheckpointID: "1.1.a",
                CheckpointDescription: "Length",
                expectedValue: 194.625,
                acceptableVariance: 0.04,
                unit: "inches",
              },
              {
                CheckpointID: "1.1.b",
                CheckpointDescription: "Width",
                expectedValue: 49.0625,
                acceptableVariance: 0.04,
                unit: "inches",
              },
            ],
          },
        ],
      },
      {
        SectionName: "Welding Check",
        SectionNumber: 2,
        SectionProgress: 0,
        SubSectionList: [
          {
            SubSectionNumber: 1,
            sectionType: "Checkbox",
            SubSectionDescription: "Check the welds on the outside.",
            DoubleSided: "true",
            Status: "",
            ImageList: [
              {
                TrailerType: "Tri 72' 2 Hoppers",
                url: ["/images/frames/tri/rear.png"],
              },
            ],
            CheckpointList: [
              {
                CheckpointID: "2.1.a",
                CheckpointDescription: "Welding Looks Good",
                CheckpointStatus: "",
              },
            ],
          },
        ],
      },
    ],
  },
  TANDEM: {
    FRONT: [
      {
        SectionName: "Dimensions Check",
        SectionNumber: 1,
        SectionProgress: 0,
        SubSectionList: [
          {
            SubSectionNumber: 1,
            sectionType: "Number Inputs",
            SubSectionDescription: "Check Dimensions of length and width",
            Status: "",
            ImageList: [
              {
                url: ["/images/frames/tandem/front.png"],
              },
            ],
            CheckpointList: [
              {
                CheckpointID: "1.1.a",
                CheckpointDescription: "Length",
                expectedValue: 126.8125,
                acceptableVariance: 0.04,
                unit: "inches",
              },
              {
                CheckpointID: "1.1.b",
                CheckpointDescription: "Width",
                expectedValue: 46,
                acceptableVariance: 0.04,
                unit: "inches",
              },
            ],
          },
        ],
      },
      {
        SectionName: "Welding Check",
        SectionNumber: 2,
        SectionProgress: 0,
        SubSectionList: [
          {
            SubSectionNumber: 1,
            sectionType: "Checkbox",
            SubSectionDescription: "Check the welds on the outside.",
            DoubleSided: "true",
            Status: "",
            ImageList: [
              {
                url: ["/images/frames/tandem/front.png"],
              },
            ],
            CheckpointList: [
              {
                CheckpointID: "2.1.a",
                CheckpointDescription: "Welding Looks Good",
                CheckpointStatus: "",
              },
            ],
          },
        ],
      },
    ],
    REAR: [
      {
        SectionName: "Dimensions Check",
        SectionNumber: 1,
        SectionProgress: 0,
        SubSectionList: [
          {
            SubSectionNumber: 1,
            sectionType: "Number Inputs",
            SubSectionDescription: "Check Dimensions of length and width",
            Status: "",
            ImageList: [
              {
                url: ["/images/frames/tandem/rear.png"],
              },
            ],
            CheckpointList: [
              {
                CheckpointID: "1.1.a",
                CheckpointDescription: "Length",
                expectedValue: 194.625,
                acceptableVariance: 0.04,
                unit: "inches",
              },
              {
                CheckpointID: "1.1.b",
                CheckpointDescription: "Width",
                expectedValue: 49.0625,
                acceptableVariance: 0.04,
                unit: "inches",
              },
            ],
          },
        ],
      },
      {
        SectionName: "Welding Check",
        SectionNumber: 2,
        SectionProgress: 0,
        SubSectionList: [
          {
            SubSectionNumber: 1,
            sectionType: "Checkbox",
            SubSectionDescription: "Check the welds on the outside.",
            DoubleSided: "true",
            Status: "",
            ImageList: [
              {
                url: ["/images/frames/tandem/rear.png"],
              },
            ],
            CheckpointList: [
              {
                CheckpointID: "2.1.a",
                CheckpointDescription: "Welding Looks Good",
                CheckpointStatus: "",
              },
            ],
          },
        ],
      },
    ],
  },
  "4 Axle": {
    FRONT: [
      {
        SectionName: "Dimensions Check",
        SectionNumber: 1,
        SectionProgress: 0,
        SubSectionList: [
          {
            SubSectionNumber: 1,
            sectionType: "Number Inputs",
            SubSectionDescription: "Check Dimensions of length and width",
            Status: "",
            ImageList: [
              {
                url: ["/images/frames/4axle/front.png"],
              },
            ],
            CheckpointList: [
              {
                CheckpointID: "1.1.a",
                CheckpointDescription: "Length",
                expectedValue: 126.8125,
                acceptableVariance: 0.04,
                unit: "inches",
              },
              {
                CheckpointID: "1.1.b",
                CheckpointDescription: "Width",
                expectedValue: 46,
                acceptableVariance: 0.04,
                unit: "inches",
              },
            ],
          },
        ],
      },
      {
        SectionName: "Welding Check",
        SectionNumber: 2,
        SectionProgress: 0,
        SubSectionList: [
          {
            SubSectionNumber: 1,
            sectionType: "Checkbox",
            SubSectionDescription: "Check the welds on the outside.",
            DoubleSided: "true",
            Status: "",
            ImageList: [
              {
                url: ["/images/frames/4axle/front.png"],
              },
            ],
            CheckpointList: [
              {
                CheckpointID: "2.1.a",
                CheckpointDescription: "Welding Looks Good",
                CheckpointStatus: "",
              },
            ],
          },
        ],
      },
    ],
    MID: [
      {
        SectionName: "Dimensions Check",
        SectionNumber: 1,
        SectionProgress: 0,
        SubSectionList: [
          {
            SubSectionNumber: 1,
            sectionType: "Number Inputs",
            SubSectionDescription: "Check Dimensions of length and width",
            Status: "",
            ImageList: [
              {
                url: ["/images/frames/4axle/mid.png"],
              },
            ],
            CheckpointList: [
              {
                CheckpointID: "1.1.a",
                CheckpointDescription: "Length",
                expectedValue: 126.8125,
                acceptableVariance: 0.04,
                unit: "inches",
              },
              {
                CheckpointID: "1.1.b",
                CheckpointDescription: "Width",
                expectedValue: 46,
                acceptableVariance: 0.04,
                unit: "inches",
              },
            ],
          },
        ],
      },
      {
        SectionName: "Welding Check",
        SectionNumber: 2,
        SectionProgress: 0,
        SubSectionList: [
          {
            SubSectionNumber: 1,
            sectionType: "Checkbox",
            SubSectionDescription: "Check the welds on the outside.",
            DoubleSided: "true",
            Status: "",
            ImageList: [
              {
                url: ["/images/frames/4axle/mid.png"],
              },
            ],
            CheckpointList: [
              {
                CheckpointID: "2.1.a",
                CheckpointDescription: "Welding Looks Good",
                CheckpointStatus: "",
              },
            ],
          },
        ],
      },
    ],
    REAR: [
      {
        SectionName: "Dimensions Check",
        SectionNumber: 1,
        SectionProgress: 0,
        SubSectionList: [
          {
            SubSectionNumber: 1,
            sectionType: "Number Inputs",
            SubSectionDescription: "Check Dimensions of length and width",
            Status: "",
            ImageList: [
              {
                url: ["/images/frames/4axle/rear.png"],
              },
            ],
            CheckpointList: [
              {
                CheckpointID: "1.1.a",
                CheckpointDescription: "Length",
                expectedValue: 194.625,
                acceptableVariance: 0.04,
                unit: "inches",
              },
              {
                CheckpointID: "1.1.b",
                CheckpointDescription: "Width",
                expectedValue: 49.0625,
                acceptableVariance: 0.04,
                unit: "inches",
              },
            ],
          },
        ],
      },
      {
        SectionName: "Welding Check",
        SectionNumber: 2,
        SectionProgress: 0,
        SubSectionList: [
          {
            SubSectionNumber: 1,
            sectionType: "Checkbox",
            SubSectionDescription: "Check the welds on the outside.",
            DoubleSided: "true",
            Status: "",
            ImageList: [
              {
                url: ["/images/frames/4axle/rear.png"],
              },
            ],
            CheckpointList: [
              {
                CheckpointID: "2.1.a",
                CheckpointDescription: "Welding Looks Good",
                CheckpointStatus: "",
              },
            ],
          },
        ],
      },
    ],
  },
};

export default inspectionDataMap;
