const checkpointsData = [
  //-->tires
  {
    SectionName: "Tires",
    SectionNumber: 1,
    SectionProgress: 0,
    //*1-->lead and tri axles (3 axles)
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check that the size and model of the tires matches the manufacturing order.",
        DoubleSided: "true",
        Status: "",
        ImageList: [
          {
            TrailerType: ["Lead"],
            TireType: 'Goodyear Marathon 22.5"',
            AirInflation: "selected",
            FendersType: "",
            doorsOpeningDirection: "",
            tarpsOpening: "",
            url: ["/images/imagesQC/lead/1-Tires/1.1.png"],
          },
          {
            TrailerType: [
              "Tri 61' 2 Hoppers",
              "Tri 61' 3 Hoppers",
              "Tri 72' 2 Hoppers",
            ],
            TireType: 'Goodyear Marathon 22.5"',
            AirInflation: "notSelected",
            FendersType: "",
            doorsOpeningDirection: "",
            tarpsOpening: "",
            url: ["/images/imagesQC/tri-axle/1.1.png"],
          },
        ],
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
            CheckpointStatus: "",
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
        DoubleSided: "true",
        Status: "",
        ImageList: [
          {
            TrailerType: [],
            TireType: "",
            FendersType: "",
            doorsOpeningDirection: "",
            tarpsOpening: "",
            AirInflation: "selected",
            url: ["/images/imagesQC/lead/1-Tires/1.2.png"],
          },
          {
            TrailerType: [],
            TireType: "",
            FendersType: "",
            doorsOpeningDirection: "",
            tarpsOpening: "",
            AirInflation: "notSelected",
            url: ["/images/imagesQC/variants/tires/T6.png"],
          },
        ],
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
            CheckpointDescription: "Axle 3 right",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 3,
        SubSectionDescription:
          "Check that all the tires have proper air pressure. If there are 4 tires per axle, remember to check the inner tires as well. ",
        DoubleSided: "true",
        Status: "",
        ImageList: [],
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
            CheckpointDescription: "Axle 3 right",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 4,
        SubSectionDescription: "Oil level",
        Status: "",
        ImageList: [],
        CheckpointList: [
          {
            CheckpointID: "1.4.a",
            CheckpointDescription:
              "Check oil level if tires go with oil, and check if they go with grease or oil",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 5,
        SubSectionDescription: "Tire inflation system",
        Status: "",
        optional: "Air Inflation",
        ImageList: [],
        CheckpointList: [
          {
            CheckpointID: "1.5.a",
            CheckpointDescription:
              "Check that all the tires have the inflation system according to customer specifications.",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 6,
        SubSectionDescription: "VIN Number",
        Status: "",
        ImageList: [],
        CheckpointList: [
          {
            CheckpointID: "1.6.a",
            CheckpointDescription:
              "Check that the VIN Number matches the work order",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 7,
        SubSectionDescription:
          "Check that all the tires’ inflation valves are placed 180 degrees one from each other.",
        DoubleSided: "true",
        optional: "Air Inflation",
        Status: "",
        ImageList: [
          {
            FendersType: "",
            doorsOpeningDirection: "",
            tarpsOpening: "",
            AirInflation: "notSelected",
            TrailerType: ["Lead"],
            TireType: 'Goodyear Marathon 22.5"',
            url: ["/images/imagesQC/lead/1-Tires/1.1.png"],
          },
          {
            TrailerType: [
              "Tri 61' 2 Hoppers",
              "Tri 61' 3 Hoppers",
              "Tri 72' 2 Hoppers",
            ],
            TireType: 'Goodyear Marathon 22.5"',
            FendersType: "",
            doorsOpeningDirection: "",
            tarpsOpening: "",
            AirInflation: "notSelected",
            url: ["/images/imagesQC/tri-axle/1.1.png"],
          },
        ],
        ImageList: ["/images/imagesQC/lead/1-Tires/1.7.png"],
        CheckpointList: [
          {
            CheckpointID: "1.7.a",
            CheckpointDescription: "Axle 1 left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.7.b",
            CheckpointDescription: "Axle 2 left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.7.c",
            CheckpointDescription: "Axle 3 left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.7.d",
            CheckpointDescription: "Axle 1 right",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.7.e",
            CheckpointDescription: "Axle 2 right",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.7.f",
            CheckpointDescription: "Axle 3 right",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 8,
        SubSectionDescription:
          "Check that all the tires' red central connections are properly tightened.",
        DoubleSided: "true",
        Status: "",
        optional: "Air Inflation",
        ImageList: ["/images/imagesQC/lead/1-Tires/1.8.png"],
        CheckpointList: [
          {
            CheckpointID: "1.8.a",
            CheckpointDescription: "Axle 1 left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.8.b",
            CheckpointDescription: "Axle 2 left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.8.c",
            CheckpointDescription: "Axle 3 left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.8.d",
            CheckpointDescription: "Axle 1 right",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.8.e",
            CheckpointDescription: "Axle 2 right",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.8.f",
            CheckpointDescription: "Axle 3 right",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 9,
        SubSectionDescription:
          "Check that all the tires are properly aligned and the inner bolts are tight (see mark or certificate). Check that the certificate of alignment matches the VIN number of the trailer: ",
        DoubleSided: "true",
        Status: "",
        ImageList: ["/images/imagesQC/lead/1-Tires/1.9.png"],
        CheckpointList: [
          {
            CheckpointID: "1.9.a",
            CheckpointDescription: "Axle 1 left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.9.b",
            CheckpointDescription: "Axle 2 left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.9.c",
            CheckpointDescription: "Axle 3 left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.9.d",
            CheckpointDescription: "Axle 1 right",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.9.e",
            CheckpointDescription: "Axle 2 right",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.9.f",
            CheckpointDescription: "Axle 3 right",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 10,
        SubSectionDescription:
          "Check that the three alemites at each axle end are filled with grease.",
        DoubleSided: "true",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/1-Tires/1.10.1.png",
          "/images/imagesQC/lead/1-Tires/1.10.2.png",
          "/images/imagesQC/lead/1-Tires/1.10.3.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "1.10.a",
            CheckpointDescription:
              "Axle 1 left – There is grease overflow at the three requested points",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.10.b",
            CheckpointDescription:
              "Axle 2 left – There is grease overflow at the three requested points",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.10.c",
            CheckpointDescription:
              "Axle 3 left – There is grease overflow at the three requested points",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.10.d",
            CheckpointDescription:
              "Axle 1 right – There is grease overflow at the three requested points",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.10.e",
            CheckpointDescription:
              "Axle 2 right – There is grease overflow at the three requested points",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.10.f",
            CheckpointDescription:
              "Axle 3 right – There is grease overflow at the three requested points",
            CheckpointStatus: "",
          },
        ],
      },
    ],
    //*2--> pup and tandem (2 axles)
    SubSectionList2: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check that the size and model of the tires matches the manufacturing order.",
        DoubleSided: "true",
        Status: "",
        ImageList: [
          {
            FendersType: "",
            doorsOpeningDirection: "",
            tarpsOpening: "",
            TrailerType: ["Pup", "Tandem"],
            TireType: 'Super Singles 22.5"',
            AirInflation: "selected",
            url: ["/images/imagesQC/variants/tires/T1.jpg"],
          },
        ],
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
            CheckpointID: "1.1.d",
            CheckpointDescription: "Axle 1 right",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.1.e",
            CheckpointDescription: "Axle 2 right",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 2,
        SubSectionDescription:
          "Check that all the tires' bolts are present and have the yellow mark indicating they have been torqued.",
        DoubleSided: "true",
        Status: "",
        ImageList: ["/images/imagesQC/lead/1-Tires/1.2.png"],
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
            CheckpointID: "1.2.d",
            CheckpointDescription: "Axle 1 right",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.2.e",
            CheckpointDescription: "Axle 2 right",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 3,
        SubSectionDescription:
          "Check that all the tires have proper air pressure. If there are 4 tires per axle, remember to check the inner tires as well. ",
        DoubleSided: "true",
        Status: "",
        ImageList: [],
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
            CheckpointID: "1.3.d",
            CheckpointDescription: "Axle 1 right",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.3.e",
            CheckpointDescription: "Axle 2 right",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 4,
        SubSectionDescription: "Oil level",
        Status: "",
        ImageList: [],
        CheckpointList: [
          {
            CheckpointID: "1.4.a",
            CheckpointDescription:
              "Check oil level if tires go with oil, and check if they go with grease or oil",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 5,
        SubSectionDescription: "Tire inflation system",
        Status: "",
        ImageList: [],
        CheckpointList: [
          {
            CheckpointID: "1.5.a",
            CheckpointDescription:
              "Check that all the tires have the inflation system according to customer specifications.",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 6,
        SubSectionDescription: "VIN Number",
        Status: "",
        ImageList: [],
        CheckpointList: [
          {
            CheckpointID: "1.6.a",
            CheckpointDescription:
              "Check that the VIN Number matches the work order",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 7,
        SubSectionDescription:
          "Check that all the tires’ inflation valves are placed 180 degrees one from each other.",
        DoubleSided: "true",
        Status: "",
        ImageList: ["/images/imagesQC/lead/1-Tires/1.7.png"],
        CheckpointList: [
          {
            CheckpointID: "1.7.a",
            CheckpointDescription: "Axle 1 left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.7.b",
            CheckpointDescription: "Axle 2 left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.7.d",
            CheckpointDescription: "Axle 1 right",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.7.e",
            CheckpointDescription: "Axle 2 right",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 8,
        SubSectionDescription:
          "Check that all the tires' red central connections are properly tightened.",
        DoubleSided: "true",
        Status: "",
        ImageList: ["/images/imagesQC/lead/1-Tires/1.8.png"],
        CheckpointList: [
          {
            CheckpointID: "1.8.a",
            CheckpointDescription: "Axle 1 left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.8.b",
            CheckpointDescription: "Axle 2 left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.8.d",
            CheckpointDescription: "Axle 1 right",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.8.e",
            CheckpointDescription: "Axle 2 right",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 9,
        SubSectionDescription:
          "Check that all the tires are properly aligned and the inner bolts are tight (see mark or certificate). Check that the certificate of alignment matches the VIN number of the trailer: ",
        DoubleSided: "true",
        Status: "",
        ImageList: ["/images/imagesQC/lead/1-Tires/1.9.png"],
        CheckpointList: [
          {
            CheckpointID: "1.9.a",
            CheckpointDescription: "Axle 1 left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.9.b",
            CheckpointDescription: "Axle 2 left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.9.d",
            CheckpointDescription: "Axle 1 right",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.9.e",
            CheckpointDescription: "Axle 2 right",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 10,
        SubSectionDescription:
          "Check that the three alemites at each axle end are filled with grease.",
        DoubleSided: "true",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/1-Tires/1.10.1.png",
          "/images/imagesQC/lead/1-Tires/1.10.2.png",
          "/images/imagesQC/lead/1-Tires/1.10.3.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "1.10.a",
            CheckpointDescription:
              "Axle 1 left – There is grease overflow at the three requested points",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.10.b",
            CheckpointDescription:
              "Axle 2 left – There is grease overflow at the three requested points",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.10.d",
            CheckpointDescription:
              "Axle 1 right – There is grease overflow at the three requested points",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "1.10.e",
            CheckpointDescription:
              "Axle 2 right – There is grease overflow at the three requested points",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  //-->fenders
  {
    SectionName: "Fenders",
    SectionNumber: 2,
    SectionProgress: 0,
    //lead
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Check that the fenders are properly aligned.",
        DoubleSided: "true",
        Status: "",
        ImageList: [
          {
            TireType: "",
            doorsOpeningDirection: "",
            tarpsOpening: "",
            AirInflation: "",
            TrailerType: ["Lead"],
            FendersType: "Adomar",
            url: ["/images/imagesQC/lead/2-Fenders/2.1.png"],
          },
        ],
        CheckpointList: [
          {
            CheckpointID: "2.1.a",
            CheckpointDescription: "Axle 1 left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.1.b",
            CheckpointDescription: "Axle 2 left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.1.c",
            CheckpointDescription: "Axle 3 left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.1.d",
            CheckpointDescription: "Axle 1 right",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.1.e",
            CheckpointDescription: "Axle 2 right",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.1.f",
            CheckpointDescription: "Axle 3 right",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 2,
        SubSectionDescription:
          "Check that all the tires' bolts are present and have the yellow mark indicating they have been torqued.",
        DoubleSided: "true",
        Status: "",
        ImageList: [
          {
            TireType: "",
            doorsOpeningDirection: "",
            tarpsOpening: "",
            AirInflation: "",
            TrailerType: ["Lead"],
            FendersType: "Heartland",
            url: ["/images/imagesQC/variants/fenders/F2.png"],
          },
        ],
        CheckpointList: [
          {
            CheckpointID: "2.2.a.f",
            CheckpointDescription: "Axle 1 left - Front Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.2.a.b",
            CheckpointDescription: "Axle 1 left - Rear Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.2.b.f",
            CheckpointDescription: "Axle 2 left - Front Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.2.b.b",
            CheckpointDescription: "Axle 2 left - Rear Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.2.c.f",
            CheckpointDescription: "Axle 3 left - Front Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.2.c.b",
            CheckpointDescription: "Axle 3 left - Rear Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.2.d.f",
            CheckpointDescription: "Axle 1 right - Front Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.2.d.b",
            CheckpointDescription: "Axle 1 right - Rear Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.2.e.f",
            CheckpointDescription: "Axle 2 right - Front Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.2.e.b",
            CheckpointDescription: "Axle 2 right - Rear Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.2.f.f",
            CheckpointDescription: "Axle 3 right - Front Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.2.f.b",
            CheckpointDescription: "Axle 3 right - Rear Arm",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 3,
        SubSectionDescription:
          "Check that all the tires' bolts are present and have the yellow mark indicating they have been torqued.",
        DoubleSided: "true",
        Status: "",
        ImageList: ["/images/imagesQC/lead/2-Fenders/2.3.png"],
        CheckpointList: [
          {
            CheckpointID: "2.3.a.f",
            CheckpointDescription: "Axle 1 left - Front Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.3.a.b",
            CheckpointDescription: "Axle 1 left - Rear Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.3.b.f",
            CheckpointDescription:
              "Axle 2 left - Front Arm (Attached to Ladder)",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.3.b.b",
            CheckpointDescription: "Axle 2 left - Rear Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.3.c.f",
            CheckpointDescription: "Axle 3 left - Front Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.3.c.b",
            CheckpointDescription: "Axle 3 left - Rear Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.3.d.f",
            CheckpointDescription: "Axle 1 right - Front Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.3.d.b",
            CheckpointDescription: "Axle 1 right - Rear Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.3.e.f",
            CheckpointDescription:
              "Axle 2 right - Front Arm (Attached to Ladder)",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.3.e.b",
            CheckpointDescription: "Axle 2 right - Rear Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.3.f.f",
            CheckpointDescription: "Axle 3 right - Front Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.3.f.b",
            CheckpointDescription: "Axle 3 right - Rear Arm",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 4,
        SubSectionDescription:
          "Check that the mud flaps on the axle 2 (intermediate axle) are correctly attached to the fender:",
        DoubleSided: "true",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/2-Fenders/2.4.1.png",
          "/images/imagesQC/lead/2-Fenders/2.4.2.png",
          "/images/imagesQC/lead/2-Fenders/2.4.3.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "2.4.a",
            CheckpointDescription:
              "Axle 2 left mud flap is well aligned vertically and horizontally",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.4.b",
            CheckpointDescription:
              "Axle 2 left mud flap is well fixed to the fender and doesn’t move",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.4.c",
            CheckpointDescription:
              "Axle 2 left mud flap has the correct design",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.4.d",
            CheckpointDescription:
              "Axle 2 left mud flap has 4 equal tightened bolts with washers over the mud flap backer, and the backer has no deformations due to over torquing",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.4.e",
            CheckpointDescription:
              "Axle 2 right mud flap is well aligned vertically and horizontally",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.4.f",
            CheckpointDescription:
              "Axle 2 right mud flap is well fixed to the fender and doesn’t move",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.4.g",
            CheckpointDescription:
              "Axle 2 right mud flap has the correct design",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.4.h",
            CheckpointDescription:
              "Axle 2 right mud flap has 4 equal tightened bolts with washers over the mud flap backer, and the backer has no deformations due to over torquing",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 5,
        SubSectionDescription:
          "Check that the mud flaps on the axle 1 (front axle) are correctly attached to the fender:",
        DoubleSided: "true",
        Status: "",
        ImageList: ["/images/imagesQC/lead/2-Fenders/2.5.png"],
        CheckpointList: [
          {
            CheckpointID: "2.5.a",
            CheckpointDescription:
              "Axle 1 left mud flap is well aligned vertically and horizontally",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.5.b",
            CheckpointDescription:
              "Axle 1 left mud flap is well fixed to the fender and doesn’t move",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.5.c",
            CheckpointDescription:
              "Axle 1 left mud flap has the correct design",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.5.d",
            CheckpointDescription:
              "Axle 1 left mud flap has 4 equal tightened bolts with washers over the mud flap backer, and the backer has no deformations due to over torquing",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.5.e",
            CheckpointDescription:
              "Axle 1 right mud flap is well aligned vertically and horizontally",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.5.f",
            CheckpointDescription:
              "Axle 1 right mud flap is well fixed to the fender and doesn’t move",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.5.g",
            CheckpointDescription:
              "Axle 1 right mud flap has the correct design",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.5.h",
            CheckpointDescription:
              "Axle 1 right mud flap has 4 equal tightened bolts with washers over the mud flap backer, and the backer has no deformations due to over torquing",
            CheckpointStatus: "",
          },
        ],
      },
    ],
    //pup and tandem
    SubSectionList2: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Check that the fenders are properly aligned.",
        DoubleSided: "true",
        Status: "",
        ImageList: [
          {
            TireType: "",
            doorsOpeningDirection: "",
            tarpsOpening: "",
            AirInflation: "",
            TrailerType: ["Pup", "Tandem"],
            FendersType: "Heartland",
            url: ["/images/imagesQC/variants/fenders/F1.jpg"],
          },
        ],
        CheckpointList: [
          {
            CheckpointID: "2.1.a",
            CheckpointDescription: "Axle 1 left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.1.b",
            CheckpointDescription: "Axle 2 left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.1.d",
            CheckpointDescription: "Axle 1 right",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.1.e",
            CheckpointDescription: "Axle 2 right",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 2,
        SubSectionDescription:
          "Check that all the tires' bolts are present and have the yellow mark indicating they have been torqued.",
        DoubleSided: "true",
        Status: "",
        ImageList: ["/images/imagesQC/lead/2-Fenders/2.2.png"],
        CheckpointList: [
          {
            CheckpointID: "2.2.a.f",
            CheckpointDescription: "Axle 1 left - Front Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.2.a.b",
            CheckpointDescription: "Axle 1 left - Rear Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.2.b.f",
            CheckpointDescription: "Axle 2 left - Front Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.2.b.b",
            CheckpointDescription: "Axle 2 left - Rear Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.2.d.f",
            CheckpointDescription: "Axle 1 right - Front Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.2.d.b",
            CheckpointDescription: "Axle 1 right - Rear Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.2.e.f",
            CheckpointDescription: "Axle 2 right - Front Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.2.e.b",
            CheckpointDescription: "Axle 2 right - Rear Arm",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 3,
        SubSectionDescription:
          "Check that all the tires' bolts are present and have the yellow mark indicating they have been torqued.",
        DoubleSided: "true",
        Status: "",
        ImageList: ["/images/imagesQC/lead/2-Fenders/2.3.png"],
        CheckpointList: [
          {
            CheckpointID: "2.3.a.f",
            CheckpointDescription: "Axle 1 left - Front Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.3.a.b",
            CheckpointDescription: "Axle 1 left - Rear Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.3.b.f",
            CheckpointDescription:
              "Axle 2 left - Front Arm (Attached to Ladder)",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.3.b.b",
            CheckpointDescription: "Axle 2 left - Rear Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.3.d.f",
            CheckpointDescription: "Axle 1 right - Front Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.3.d.b",
            CheckpointDescription: "Axle 1 right - Rear Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.3.e.f",
            CheckpointDescription:
              "Axle 2 right - Front Arm (Attached to Ladder)",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.3.e.b",
            CheckpointDescription: "Axle 2 right - Rear Arm",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 4,
        SubSectionDescription:
          "Check that the mud flaps on the axle 2 (intermediate axle) are correctly attached to the fender:",
        DoubleSided: "true",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/2-Fenders/2.4.1.png",
          "/images/imagesQC/lead/2-Fenders/2.4.2.png",
          "/images/imagesQC/lead/2-Fenders/2.4.3.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "2.4.a",
            CheckpointDescription:
              "Axle 2 left mud flap is well aligned vertically and horizontally",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.4.b",
            CheckpointDescription:
              "Axle 2 left mud flap is well fixed to the fender and doesn’t move",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.4.c",
            CheckpointDescription:
              "Axle 2 left mud flap has the correct design",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.4.d",
            CheckpointDescription:
              "Axle 2 left mud flap has 4 equal tightened bolts with washers over the mud flap backer, and the backer has no deformations due to over torquing",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.4.e",
            CheckpointDescription:
              "Axle 2 right mud flap is well aligned vertically and horizontally",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.4.f",
            CheckpointDescription:
              "Axle 2 right mud flap is well fixed to the fender and doesn’t move",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.4.g",
            CheckpointDescription:
              "Axle 2 right mud flap has the correct design",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.4.h",
            CheckpointDescription:
              "Axle 2 right mud flap has 4 equal tightened bolts with washers over the mud flap backer, and the backer has no deformations due to over torquing",
            CheckpointStatus: "",
          },
        ],
      },
    ],
    //tri-axles
    SubSectionList3: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Check that the fenders are properly aligned.",
        DoubleSided: "true",
        Status: "",
        ImageList: [
          {
            TrailerType: ["Lead"],
            TireType: "",
            FendersType: "",
            doorsOpeningDirection: "",
            tarpsOpening: "",
            AirInflation: "",
            url: ["/images/imagesQC/lead/2-Fenders/2.1.png"],
          },
          {
            TrailerType: [
              "Tri 61' 2 Hoppers",
              "Tri 61' 3 Hoppers",
              "Tri 72' 2 Hoppers",
              "Pup",
            ],
            TireType: "",
            FendersType: "",
            doorsOpeningDirection: "",
            tarpsOpening: "",
            AirInflation: "",
            url: ["/images/imagesQC/tri-axle/2.1.png"],
          },
        ],
        CheckpointList: [
          {
            CheckpointID: "2.1.a",
            CheckpointDescription: "Axle 1 left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.1.b",
            CheckpointDescription: "Axle 2 left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.1.c",
            CheckpointDescription: "Axle 3 left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.1.d",
            CheckpointDescription: "Axle 1 right",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.1.e",
            CheckpointDescription: "Axle 2 right",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.1.f",
            CheckpointDescription: "Axle 3 right",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 2,
        SubSectionDescription:
          "Check that all the tires' bolts are present and have the yellow mark indicating they have been torqued.",
        DoubleSided: "true",
        Status: "",
        ImageList: ["/images/imagesQC/lead/2-Fenders/2.2.png"],
        CheckpointList: [
          {
            CheckpointID: "2.2.a.f",
            CheckpointDescription: "Axle 1 left - Front Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.2.a.b",
            CheckpointDescription: "Axle 1 left - Rear Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.2.b.f",
            CheckpointDescription: "Axle 2 left - Front Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.2.b.b",
            CheckpointDescription: "Axle 2 left - Rear Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.2.c.f",
            CheckpointDescription: "Axle 3 left - Front Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.2.c.b",
            CheckpointDescription: "Axle 3 left - Rear Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.2.d.f",
            CheckpointDescription: "Axle 1 right - Front Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.2.d.b",
            CheckpointDescription: "Axle 1 right - Rear Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.2.e.f",
            CheckpointDescription: "Axle 2 right - Front Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.2.e.b",
            CheckpointDescription: "Axle 2 right - Rear Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.2.f.f",
            CheckpointDescription: "Axle 3 right - Front Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.2.f.b",
            CheckpointDescription: "Axle 3 right - Rear Arm",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 3,
        SubSectionDescription:
          "Check that all the tires' bolts are present and have the yellow mark indicating they have been torqued.",
        DoubleSided: "true",
        Status: "",
        ImageList: ["/images/imagesQC/lead/2-Fenders/2.3.png"],
        CheckpointList: [
          {
            CheckpointID: "2.3.a.f",
            CheckpointDescription: "Axle 1 left - Front Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.3.a.b",
            CheckpointDescription: "Axle 1 left - Rear Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.3.b.f",
            CheckpointDescription:
              "Axle 2 left - Front Arm (Attached to Ladder)",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.3.b.b",
            CheckpointDescription: "Axle 2 left - Rear Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.3.c.f",
            CheckpointDescription: "Axle 3 left - Front Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.3.c.b",
            CheckpointDescription: "Axle 3 left - Rear Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.3.d.f",
            CheckpointDescription: "Axle 1 right - Front Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.3.d.b",
            CheckpointDescription: "Axle 1 right - Rear Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.3.e.f",
            CheckpointDescription:
              "Axle 2 right - Front Arm (Attached to Ladder)",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.3.e.b",
            CheckpointDescription: "Axle 2 right - Rear Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.3.f.f",
            CheckpointDescription: "Axle 3 right - Front Arm",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.3.f.b",
            CheckpointDescription: "Axle 3 right - Rear Arm",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 4,
        SubSectionDescription:
          "Check that the mud flaps on the axle 2 (intermediate axle) are correctly attached to the fender:",
        DoubleSided: "true",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/2-Fenders/2.4.1.png",
          "/images/imagesQC/lead/2-Fenders/2.4.2.png",
          "/images/imagesQC/lead/2-Fenders/2.4.3.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "2.4.a",
            CheckpointDescription:
              "Axle 2 left mud flap is well aligned vertically and horizontally",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.4.b",
            CheckpointDescription:
              "Axle 2 left mud flap is well fixed to the fender and doesn’t move",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.4.c",
            CheckpointDescription:
              "Axle 2 left mud flap has the correct design",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.4.d",
            CheckpointDescription:
              "Axle 2 left mud flap has 4 equal tightened bolts with washers over the mud flap backer, and the backer has no deformations due to over torquing",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.4.e",
            CheckpointDescription:
              "Axle 2 right mud flap is well aligned vertically and horizontally",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.4.f",
            CheckpointDescription:
              "Axle 2 right mud flap is well fixed to the fender and doesn’t move",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.4.g",
            CheckpointDescription:
              "Axle 2 right mud flap has the correct design",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "2.4.h",
            CheckpointDescription:
              "Axle 2 right mud flap has 4 equal tightened bolts with washers over the mud flap backer, and the backer has no deformations due to over torquing",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Side Ladders",
    SectionNumber: 3,
    SectionProgress: 0,
    TrailersUsedIn: ["Lead"],
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check if the side ladders are properly aligned and fixed.",
        DoubleSided: "true",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/3-Side-Ladders/3.1.1.png",
          "/images/imagesQC/lead/3-Side-Ladders/3.1.2.png",
          "/images/imagesQC/lead/3-Side-Ladders/3.1.3.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "3.1.a",
            CheckpointDescription: "Left - is well aligned with chassis",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "3.1.b",
            CheckpointDescription:
              "Left - is fixed in all directions when moved by hand",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "3.1.c",
            CheckpointDescription: "Left - 4 steps are horizontally aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "3.1.d",
            CheckpointDescription: "Left - 4 steps are fixed to walk on",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "3.1.e",
            CheckpointDescription:
              "Left - front connection to the chassis has the two bolts present, with washers and tightened",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "3.1.f",
            CheckpointDescription:
              "Left - rear connection to the chassis has the three bolts present, with washers and tightened",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "3.1.g",
            CheckpointDescription:
              "Left - connection to the axle 2 front support arm has the four bolts present, with washers and tightened",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "3.1.h",
            CheckpointDescription:
              "Left - connection to the axle 1 flap mud backer has the two bolts present, with washers and tightened",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "3.1.i",
            CheckpointDescription: "Right - is well aligned with chassis",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "3.1.j",
            CheckpointDescription:
              "Right - is fixed in all directions when moved by hand",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "3.1.k",
            CheckpointDescription: "Right - 4 steps are horizontally aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "3.1.l",
            CheckpointDescription: "Right - 4 steps are fixed to walk on",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "3.1.m",
            CheckpointDescription:
              "Right - front connection to the chassis has the two bolts present, with washers and tightened",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "3.1.n",
            CheckpointDescription:
              "Right - rear connection to the chassis has the three bolts present, with washers and tightened",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "3.1.o",
            CheckpointDescription:
              "Right - connection to the axle 2 front support arm has the four bolts present, with washers and tightened",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "3.1.p",
            CheckpointDescription:
              "Right - connection to the axle 1 flap mud backer has the two bolts present, with washers and tightened",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Light Box Assembly",
    SectionNumber: 4,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check that the light box has a rubber separator in the attachment.",
        DoubleSided: "true",
        Status: "",
        ImageList: ["/images/imagesQC/lead/4-Light-Box-Assembly/4.1.png"],
        CheckpointList: [
          {
            CheckpointID: "4.1.a",
            CheckpointDescription: "Light Box Assembly – Left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "4.1.b",
            CheckpointDescription: "Light Box Assembly – Right",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 2,
        SubSectionDescription:
          "Check that the four attachment bolts are present, are the same, have a washer and are properly tightened on each side.",
        DoubleSided: "true",
        Status: "",
        ImageList: ["/images/imagesQC/lead/4-Light-Box-Assembly/4.2.png"],
        CheckpointList: [
          {
            CheckpointID: "4.2.a",
            CheckpointDescription: "Light Box Assembly – Left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "4.2.b",
            CheckpointDescription: "Light Box Assembly – Right",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 3,
        SubSectionDescription:
          "Check that the Light Box Assembly is tightly fixed to the chassis.\nPreviously detected quality problem: The box is too loose and can move more than ¼” when a force is applied by hand.",
        DoubleSided: "true",
        Status: "",
        ImageList: ["/images/imagesQC/lead/4-Light-Box-Assembly/4.3.png"],
        CheckpointList: [
          {
            CheckpointID: "4.3.a",
            CheckpointDescription: "Light Box Assembly – Left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "4.3.b",
            CheckpointDescription: "Light Box Assembly – Right",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 4,
        SubSectionDescription:
          "Check that the Light Box Assembly is properly aligned",
        DoubleSided: "true",
        Status: "",
        ImageList: ["/images/imagesQC/lead/4-Light-Box-Assembly/4.4.png"],
        CheckpointList: [
          {
            CheckpointID: "4.4.a",
            CheckpointDescription: "Light Box Assembly – Left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "4.4.b",
            CheckpointDescription: "Light Box Assembly – Right",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 5,
        SubSectionDescription:
          "Check that each light is in good condition, well distributed and aligned, and the “Top” side of the bezel is on top.",
        DoubleSided: "true",
        Status: "",
        ImageList: ["/images/imagesQC/lead/4-Light-Box-Assembly/4.5.png"],
        CheckpointList: [
          {
            CheckpointID: "4.5.a",
            CheckpointDescription: "Light 1 – Left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "4.5.b",
            CheckpointDescription: "Light 2 – Left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "4.5.c",
            CheckpointDescription: "Light 3 – Left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "4.5.d",
            CheckpointDescription: "Light 1 – Right",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "4.5.e",
            CheckpointDescription: "Light 2 – Right",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "4.5.f",
            CheckpointDescription: "Light 3 – Right",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 6,
        SubSectionDescription:
          "Check that each light has its 3 bolts tightened and the light bezel is well aligned",
        DoubleSided: "true",
        Status: "",
        ImageList: ["/images/imagesQC/lead/4-Light-Box-Assembly/4.6.png"],
        CheckpointList: [
          {
            CheckpointID: "4.6.a",
            CheckpointDescription: "Light 1 – Left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "4.6.b",
            CheckpointDescription: "Light 2 – Left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "4.6.c",
            CheckpointDescription: "Light 3 – Left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "4.6.d",
            CheckpointDescription: "Light 1 – Right",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "4.6.e",
            CheckpointDescription: "Light 2 – Right",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "4.6.f",
            CheckpointDescription: "Light 3 – Right",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 8,
        SubSectionDescription:
          "Check that the Light Box Assembly has all the four upper 3/16” hucks properly installed and tightened",
        DoubleSided: "true",
        Status: "",
        ImageList: ["/images/imagesQC/lead/4-Light-Box-Assembly/4.8.png"],
        CheckpointList: [
          {
            CheckpointID: "4.8.a",
            CheckpointDescription: "Light Box Assembly upper hucks – Left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "4.8.b",
            CheckpointDescription: "Light Box Assembly upper hucks – Right",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 9,
        SubSectionDescription:
          "Check that the Light Box Assembly has all the four back 3/16” hucks properly installed and tightened",
        DoubleSided: "true",
        Status: "",
        ImageList: ["/images/imagesQC/lead/4-Light-Box-Assembly/4.9.png"],
        CheckpointList: [
          {
            CheckpointID: "4.9.a",
            CheckpointDescription: "Light Box Assembly 4 back hucks – Left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "4.9.b",
            CheckpointDescription: "Light Box Assembly 4 back hucks – Right",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 10,
        SubSectionDescription:
          "Check that the dime lights and ABS decal are present",
        Status: "",
        ImageList: ["/images/imagesQC/lead/4-Light-Box-Assembly/4.10.png"],
        CheckpointList: [
          {
            CheckpointID: "4.10.a",
            CheckpointDescription: "Red dime light and bezel - Left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "4.10.b",
            CheckpointDescription: "Amber dime light and bezel - Left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "4.10.c",
            CheckpointDescription: "ABS decal – Only at left position",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "4.10.d",
            CheckpointDescription: "Red dime light and bezel - Right",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Mud Flaps",
    SectionNumber: 5,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check if the mud flaps are properly aligned, fixed and separated from the fenders.",
        DoubleSided: "true",
        Status: "",
        ImageList: ["/images/imagesQC/lead/5-Mud-Flaps/5.1.png"],
        CheckpointList: [
          {
            CheckpointID: "5.1.a",
            CheckpointDescription: "is aligned in all directions - Left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "5.1.b",
            CheckpointDescription: "is properly fixed - Left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "5.1.c",
            CheckpointDescription: "is separated from the fender - Left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "5.1.d",
            CheckpointDescription: "has the desired design - Left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "5.1.e",
            CheckpointDescription: "is aligned in all directions - Right",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "5.1.f",
            CheckpointDescription: "is properly fixed - Right",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "5.1.g",
            CheckpointDescription: "is separated from the fender - Right",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "5.1.h",
            CheckpointDescription: "has the desired design - Right",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 2,
        SubSectionDescription:
          "Check if the mud flap tape base is present and properly aligned.",
        DoubleSided: "true",
        Status: "",
        ImageList: ["/images/imagesQC/lead/5-Mud-Flaps/5.2.png"],
        CheckpointList: [
          {
            CheckpointID: "5.2.a",
            CheckpointDescription:
              "tape base is aligned in all directions - Left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "5.2.b",
            CheckpointDescription:
              "tape base is aligned in all directions - Right",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 3,
        SubSectionDescription:
          "Check if the mud flap tape bases are fixed by four tightened bolts with washers.",
        DoubleSided: "true",
        Status: "",
        ImageList: ["/images/imagesQC/lead/5-Mud-Flaps/5.3.png"],
        CheckpointList: [
          {
            CheckpointID: "5.3.a",
            CheckpointDescription:
              "tape base has 4 equal bolts with washers. They are well tightened, and have no deformations due to over torque - Left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "5.3.b",
            CheckpointDescription:
              "tape base has 4 equal bolts with washers. They are well tightened, and have no deformations due to over torque - Right",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 4,
        SubSectionDescription:
          "Check if the mud flap reflective tapes have the desired design, are well pasted and well aligned.",
        DoubleSided: "true",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/5-Mud-Flaps/5.4.1.png",
          "/images/imagesQC/lead/5-Mud-Flaps/5.4.2.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "5.4.a",
            CheckpointDescription:
              "reflective tape has the desired design, is well pasted and well aligned - Left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "5.4.b",
            CheckpointDescription:
              "reflective tape has the desired design, is well pasted and well aligned - Right",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Rear Plate",
    SectionNumber: 6,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check if the license plate grote assembly is well aligned, fixed by 2 tightened bolts with washers, and is connected to the wire conduit in the back.",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/6-License-Plate-Light/6.1.1.png",
          "/images/imagesQC/lead/6-License-Plate-Light/6.1.2.png",
          "/images/imagesQC/lead/6-License-Plate-Light/6.1.3.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "6.1.a",
            CheckpointDescription: "is well aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "6.1.b",
            CheckpointDescription: "is well fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "6.1.c",
            CheckpointDescription:
              "has two tightened bolts with two washers each",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "6.1.d",
            CheckpointDescription:
              "has the wire conduit installed in the back side",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 2,
        SubSectionDescription:
          "Check if the license plate light is properly placed",
        Status: "",
        ImageList: [],
        CheckpointList: [
          {
            CheckpointID: "6.2.a",
            CheckpointDescription: "License plate is properly placed",
            CheckpointStatus: "",
          },
        ],
      },
    ],
    SubSectionList2: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check if the license plate grote assembly is well aligned, fixed by 2 tightened bolts with washers, and is connected to the wire conduit in the back.",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/6-License-Plate-Light/6.1.1.png",
          "/images/imagesQC/lead/6-License-Plate-Light/6.1.2.png",
          "/images/imagesQC/lead/6-License-Plate-Light/6.1.3.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "6.1.a",
            CheckpointDescription:
              "License plate grote assembly is well aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "6.1.b",
            CheckpointDescription: "License plate grote assembly is well fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "6.1.c",
            CheckpointDescription:
              "License plate grote assembly has two tightened bolts with two washers each",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "6.1.d",
            CheckpointDescription:
              "License plate grote assembly has the wire conduit installed in the back side",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 2,
        SubSectionDescription:
          "Check if the license plate light is properly placed",
        Status: "",
        ImageList: [],
        CheckpointList: [
          {
            CheckpointID: "6.2.a",
            CheckpointDescription: "License plate is properly placed",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 3,
        SubSectionDescription:
          "Check that the rear plate is secured to the license plate beam",
        Status: "",
        ImageList: [
          {
            TrailerType: [
              "Pup",
              "Tri 61' 2 Hoppers",
              "Tri 72' 2 Hoppers",
              "Tri 61' 3 Hoppers",
            ],
            TireType: "",
            FendersType: "",
            doorsOpeningDirection: "",
            tarpsOpening: "",
            AirInflation: "",
            url: ["/images/imagesQC/pup/6.3.1.png"],
          },
        ],
        CheckpointList: [
          {
            CheckpointID: "6.3.a",
            CheckpointDescription:
              "It is secured by 8 tightened bolts with washers, underneath the license plate beam. ( 4 on each side). ",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 4,
        SubSectionDescription: "The Ladder must be secured to the rear plate. ",
        Status: "",
        ImageList: [
          {
            TrailerType: [
              "Pup",
              "Tri 61' 2 Hoppers",
              "Tri 72' 2 Hoppers",
              "Tri 61' 3 Hoppers",
            ],
            TireType: "",
            FendersType: "",
            doorsOpeningDirection: "",
            tarpsOpening: "",
            AirInflation: "",
            url: ["/images/imagesQC/pup/6.4.1.png"],
          },
        ],
        CheckpointList: [
          {
            CheckpointID: "6.4.a",
            CheckpointDescription:
              "It is secured from the 2 indicated points on the rear plate ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "6.4.b",
            CheckpointDescription:
              "It is secured from the 2/3 indicated points on the opposite face",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "6.4.c",
            CheckpointDescription:
              "The ladder’s steps must be able to withstand a person’s weight",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 5,
        SubSectionDescription:
          "The mud flaps must be secured to the rear plate. ",
        Status: "",
        ImageList: [
          {
            TrailerType: [
              "Pup",
              "Tri 61' 2 Hoppers",
              "Tri 72' 2 Hoppers",
              "Tri 61' 3 Hoppers",
            ],
            TireType: "",
            FendersType: "",
            doorsOpeningDirection: "",
            tarpsOpening: "",
            AirInflation: "",
            url: ["/images/imagesQC/pup/6.5.png"],
          },
        ],
        CheckpointList: [
          {
            CheckpointID: "6.5.a",
            CheckpointDescription:
              "They are secured from the 8 indicated points, both on the inside and outside faces of the rear plate. ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "6.5.b",
            CheckpointDescription: "They are well aligned and straightened. ",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 6,
        SubSectionDescription: "Rear Plate reflective tapes",
        Status: "",
        ImageList: [
          {
            TrailerType: [
              "Pup",
              "Tri 61' 2 Hoppers",
              "Tri 72' 2 Hoppers",
              "Tri 61' 3 Hoppers",
            ],
            TireType: "",
            FendersType: "",
            doorsOpeningDirection: "",
            tarpsOpening: "",
            AirInflation: "",
            url: ["/images/imagesQC/pup/6.6.png"],
          },
        ],
        CheckpointList: [
          {
            CheckpointID: "6.6.a",
            CheckpointDescription:
              "The rear reflective tapes must be attached and well aligned. ",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 7,
        SubSectionDescription: "Rear Plate Customer Logo",
        Status: "",
        ImageList: [
          {
            TrailerType: [
              "Pup",
              "Tri 61' 2 Hoppers",
              "Tri 72' 2 Hoppers",
              "Tri 61' 3 Hoppers",
            ],
            TireType: "",
            FendersType: "",
            doorsOpeningDirection: "",
            tarpsOpening: "",
            AirInflation: "",
            url: ["/images/imagesQC/pup/6.7.png"],
          },
        ],
        CheckpointList: [
          {
            CheckpointID: "6.7.a",
            CheckpointDescription:
              "The customer logo plate is secured by 6 tightened bolts with washers to the rear plate",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "6.7.a",
            CheckpointDescription:
              "The correct logo is present, aligned, and scaled to fit the rear plate. ",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Axles",
    SectionNumber: 7, //split after e
    DoubleSided: "true",
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check if the shock absorbers are correctly installed at both sides of axle 1",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/7-Axles/7.1.1.png",
          "/images/imagesQC/lead/7-Axles/7.1.2.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "7.1.a",
            CheckpointDescription:
              "The thicker part of the shock absorber is up",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.1.b",
            CheckpointDescription:
              "The upper connection has a tightened bolt with two washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.1.c",
            CheckpointDescription:
              "The upper connection attachment has a proper welding",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.1.d",
            CheckpointDescription:
              "The lower connection has a tightened bolt with two washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.1.e",
            CheckpointDescription:
              "The lower connection attachment has a proper welding",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.1.f",
            CheckpointDescription:
              "The thicker part of the shock absorber is up",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.1.g",
            CheckpointDescription:
              "The upper connection has a tightened bolt with two washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.1.h",
            CheckpointDescription:
              "The upper connection attachment has a proper welding",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.1.i",
            CheckpointDescription:
              "The lower connection has a tightened bolt with two washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.1.j",
            CheckpointDescription:
              "The lower connection attachment has a proper welding",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 2,
        SubSectionDescription:
          "Check if the shock absorbers are correctly installed at both sides of axle 2",
        Status: "",
        ImageList: [],
        CheckpointList: [
          {
            CheckpointID: "7.2.a",
            CheckpointDescription:
              "The thicker part of the shock absorber is up",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.2.b",
            CheckpointDescription:
              "The upper connection has a tightened bolt with two washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.2.c",
            CheckpointDescription:
              "The upper connection attachment has a proper welding",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.2.d",
            CheckpointDescription:
              "The lower connection has a tightened bolt with two washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.2.e",
            CheckpointDescription:
              "The lower connection attachment has a proper welding",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.2.f",
            CheckpointDescription:
              "The thicker part of the shock absorber is up",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.2.g",
            CheckpointDescription:
              "The upper connection has a tightened bolt with two washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.2.h",
            CheckpointDescription:
              "The upper connection attachment has a proper welding",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.2.i",
            CheckpointDescription:
              "The lower connection has a tightened bolt with two washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.2.j",
            CheckpointDescription:
              "The lower connection attachment has a proper welding",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 3,
        SubSectionDescription:
          "Check if the shock absorbers are correctly installed at both sides of axle 3",
        Status: "",
        ImageList: [],
        CheckpointList: [
          {
            CheckpointID: "7.3.a",
            CheckpointDescription:
              "The thicker part of the shock absorber is up",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.3.b",
            CheckpointDescription:
              "The upper connection has a tightened bolt with two washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.3.c",
            CheckpointDescription:
              "The upper connection attachment has a proper welding",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.3.d",
            CheckpointDescription:
              "The lower connection has a tightened bolt with two washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.3.e",
            CheckpointDescription:
              "The lower connection attachment has a proper welding",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.3.f",
            CheckpointDescription:
              "The thicker part of the shock absorber is up",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.3.g",
            CheckpointDescription:
              "The upper connection has a tightened bolt with two washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.3.h",
            CheckpointDescription:
              "The upper connection attachment has a proper welding",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.3.i",
            CheckpointDescription:
              "The lower connection has a tightened bolt with two washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.3.j",
            CheckpointDescription:
              "The lower connection attachment has a proper welding",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 5,
        SubSectionDescription:
          "Check if the ride bags are correctly installed at both sides of axle 1",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/7-Axles/7.5.1.png",
          "/images/imagesQC/lead/7-Axles/7.5.2.png",
          "/images/imagesQC/lead/7-Axles/7.5.3.png",
          "/images/imagesQC/lead/7-Axles/7.5.4.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "7.5.a",
            CheckpointDescription:
              "The ride bag has air pressure and no visible damage",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.5.b",
            CheckpointDescription:
              "The upper connection has a tightened nut with one washer",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.5.c",
            CheckpointDescription:
              "The air connection is tightened and has not air leaks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.5.d",
            CheckpointDescription:
              "If an upper separator is needed, it is present in this ride bag",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.5.e",
            CheckpointDescription:
              "The lower connection has a tightened nut with one washer",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.5.f",
            CheckpointDescription:
              "The ride bag has air pressure and no visible damage",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.5.g",
            CheckpointDescription:
              "The upper connection has a tightened nut with one washer",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.5.h",
            CheckpointDescription:
              "The air connection is tightened and has not air leaks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.5.i",
            CheckpointDescription:
              "If an upper separator is needed, it is present in this ride bag",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.5.j",
            CheckpointDescription:
              "The lower connection has a tightened nut with one washer",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 6,
        SubSectionDescription:
          "Check if the ride bags are correctly installed at both sides of axle 2",
        Status: "",
        ImageList: [],
        CheckpointList: [
          {
            CheckpointID: "7.6.a",
            CheckpointDescription:
              "The ride bag has air pressure and no visible damage",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.6.b",
            CheckpointDescription:
              "The upper connection has a tightened nut with one washer",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.6.c",
            CheckpointDescription:
              "The air connection is tightened and has not air leaks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.6.d",
            CheckpointDescription:
              "If an upper separator is needed, it is present in this ride bag",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.6.e",
            CheckpointDescription:
              "The lower connection has a tightened nut with one washer",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.6.f",
            CheckpointDescription:
              "The ride bag has air pressure and no visible damage",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.6.g",
            CheckpointDescription:
              "The upper connection has a tightened nut with one washer",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.6.h",
            CheckpointDescription:
              "The air connection is tightened and has not air leaks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.6.i",
            CheckpointDescription:
              "If an upper separator is needed, it is present in this ride bag",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.6.j",
            CheckpointDescription:
              "The lower connection has a tightened nut with one washer",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 7,
        SubSectionDescription:
          "Check if the ride bags are correctly installed at both sides of axle 3",
        Status: "",
        ImageList: [],
        CheckpointList: [
          {
            CheckpointID: "7.7.a",
            CheckpointDescription:
              "The ride bag has air pressure and no visible damage",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.7.b",
            CheckpointDescription:
              "The upper connection has a tightened nut with one washer",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.7.c",
            CheckpointDescription:
              "The air connection is tightened and has not air leaks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.7.d",
            CheckpointDescription:
              "If an upper separator is needed, it is present in this ride bag",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.7.e",
            CheckpointDescription:
              "The lower connection has a tightened nut with one washer",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.7.f",
            CheckpointDescription:
              "The ride bag has air pressure and no visible damage",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.7.g",
            CheckpointDescription:
              "The upper connection has a tightened nut with one washer",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.7.h",
            CheckpointDescription:
              "The air connection is tightened and has not air leaks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.7.i",
            CheckpointDescription:
              "If an upper separator is needed, it is present in this ride bag",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.7.j",
            CheckpointDescription:
              "The lower connection has a tightened nut with one washer",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 8,
        SubSectionDescription:
          "Check if the axle arms are correctly installed at both sides of axle 1",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/7-Axles/7.8.1.png",
          "/images/imagesQC/lead/7-Axles/7.8.2.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "7.8.a",
            CheckpointDescription:
              "The connection has the two plastic separators, one on each side",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.8.b",
            CheckpointDescription:
              "The inner connection has a tightened nut with one washer and then the plate",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.8.c",
            CheckpointDescription:
              "The outer connection has a tightened bolt with one washer",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.8.d",
            CheckpointDescription:
              "The connection has the two plastic separators, one on each side",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.8.e",
            CheckpointDescription:
              "The inner connection has a tightened nut with one washer and then the plate",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.8.f",
            CheckpointDescription:
              "The outer connection has a tightened bolt with one washer",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 9,
        SubSectionDescription:
          "Check if the axle arms are correctly installed at both sides of axle 2",
        Status: "",
        ImageList: [],
        CheckpointList: [
          {
            CheckpointID: "7.9.a",
            CheckpointDescription:
              "The connection has the two plastic separators, one on each side",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.9.b",
            CheckpointDescription:
              "The inner connection has a tightened nut with one washer and then the plate",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.9.c",
            CheckpointDescription:
              "The outer connection has a tightened bolt with one washer",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.9.d",
            CheckpointDescription:
              "The connection has the two plastic separators, one on each side",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.9.e",
            CheckpointDescription:
              "The inner connection has a tightened nut with one washer and then the plate",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.9.f",
            CheckpointDescription:
              "The outer connection has a tightened bolt with one washer",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 10,
        SubSectionDescription:
          "Check if the axle arms are correctly installed at both sides of axle 3",
        Status: "",
        ImageList: [],
        CheckpointList: [
          {
            CheckpointID: "7.10.a",
            CheckpointDescription:
              "The connection has the two plastic separators, one on each side",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.10.b",
            CheckpointDescription:
              "The inner connection has a tightened nut with one washer and then the plate",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.10.c",
            CheckpointDescription:
              "The outer connection has a tightened bolt with one washer",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.10.d",
            CheckpointDescription:
              "The connection has the two plastic separators, one on each side",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.10.e",
            CheckpointDescription:
              "The inner connection has a tightened nut with one washer and then the plate",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.10.f",
            CheckpointDescription:
              "The outer connection has a tightened bolt with one washer",
            CheckpointStatus: "",
          },
        ],
      },
    ],
    SubSectionList2: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check if the shock absorbers are correctly installed at both sides of axle 1",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/7-Axles/7.1.1.png",
          "/images/imagesQC/lead/7-Axles/7.1.2.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "7.1.a",
            CheckpointDescription:
              "The thicker part of the shock absorber is up",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.1.b",
            CheckpointDescription:
              "The upper connection has a tightened bolt with two washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.1.c",
            CheckpointDescription:
              "The upper connection attachment has a proper welding",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.1.d",
            CheckpointDescription:
              "The lower connection has a tightened bolt with two washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.1.e",
            CheckpointDescription:
              "The lower connection attachment has a proper welding",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.1.f",
            CheckpointDescription:
              "The thicker part of the shock absorber is up",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.1.g",
            CheckpointDescription:
              "The upper connection has a tightened bolt with two washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.1.h",
            CheckpointDescription:
              "The upper connection attachment has a proper welding",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.1.i",
            CheckpointDescription:
              "The lower connection has a tightened bolt with two washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.1.j",
            CheckpointDescription:
              "The lower connection attachment has a proper welding",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 2,
        SubSectionDescription:
          "Check if the shock absorbers are correctly installed at both sides of axle 2",
        Status: "",
        ImageList: [],
        CheckpointList: [
          {
            CheckpointID: "7.2.a",
            CheckpointDescription:
              "The thicker part of the shock absorber is up",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.2.b",
            CheckpointDescription:
              "The upper connection has a tightened bolt with two washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.2.c",
            CheckpointDescription:
              "The upper connection attachment has a proper welding",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.2.d",
            CheckpointDescription:
              "The lower connection has a tightened bolt with two washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.2.e",
            CheckpointDescription:
              "The lower connection attachment has a proper welding",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.2.f",
            CheckpointDescription:
              "The thicker part of the shock absorber is up",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.2.g",
            CheckpointDescription:
              "The upper connection has a tightened bolt with two washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.2.h",
            CheckpointDescription:
              "The upper connection attachment has a proper welding",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.2.i",
            CheckpointDescription:
              "The lower connection has a tightened bolt with two washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.2.j",
            CheckpointDescription:
              "The lower connection attachment has a proper welding",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 5,
        SubSectionDescription:
          "Check if the shock absorbers are correctly installed at both sides of axle 1",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/7-Axles/7.5.1.png",
          "/images/imagesQC/lead/7-Axles/7.5.2.png",
          "/images/imagesQC/lead/7-Axles/7.5.3.png",
          "/images/imagesQC/lead/7-Axles/7.5.4.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "7.5.a",
            CheckpointDescription:
              "The ride bag has air pressure and no visible damage",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.5.b",
            CheckpointDescription:
              "The upper connection has a tightened nut with one washer",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.5.c",
            CheckpointDescription:
              "The air connection is tightened and has not air leaks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.5.d",
            CheckpointDescription:
              "If an upper separator is needed, it is present in this ride bag",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.5.e",
            CheckpointDescription:
              "The lower connection has a tightened nut with one washer",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.5.f",
            CheckpointDescription:
              "The ride bag has air pressure and no visible damage",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.5.g",
            CheckpointDescription:
              "The upper connection has a tightened nut with one washer",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.5.h",
            CheckpointDescription:
              "The air connection is tightened and has not air leaks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.5.i",
            CheckpointDescription:
              "If an upper separator is needed, it is present in this ride bag",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.5.j",
            CheckpointDescription:
              "The lower connection has a tightened nut with one washer",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 6,
        SubSectionDescription:
          "Check if the shock absorbers are correctly installed at both sides of axle 2",
        Status: "",
        ImageList: [],
        CheckpointList: [
          {
            CheckpointID: "7.6.a",
            CheckpointDescription:
              "The ride bag has air pressure and no visible damage",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.6.b",
            CheckpointDescription:
              "The upper connection has a tightened nut with one washer",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.6.c",
            CheckpointDescription:
              "The air connection is tightened and has not air leaks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.6.d",
            CheckpointDescription:
              "If an upper separator is needed, it is present in this ride bag",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.6.e",
            CheckpointDescription:
              "The lower connection has a tightened nut with one washer",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.6.f",
            CheckpointDescription:
              "The ride bag has air pressure and no visible damage",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.6.g",
            CheckpointDescription:
              "The upper connection has a tightened nut with one washer",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.6.h",
            CheckpointDescription:
              "The air connection is tightened and has not air leaks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.6.i",
            CheckpointDescription:
              "If an upper separator is needed, it is present in this ride bag",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.6.j",
            CheckpointDescription:
              "The lower connection has a tightened nut with one washer",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 8,
        SubSectionDescription:
          "Check if the axle arms are correctly installed at both sides of axle 1",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/7-Axles/7.8.1.png",
          "/images/imagesQC/lead/7-Axles/7.8.2.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "7.8.a",
            CheckpointDescription:
              "The connection has the two plastic separators, one on each side",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.8.b",
            CheckpointDescription:
              "The inner connection has a tightened nut with one washer and then the plate",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.8.c",
            CheckpointDescription:
              "The outer connection has a tightened bolt with one washer",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.8.d",
            CheckpointDescription:
              "The connection has the two plastic separators, one on each side",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.8.e",
            CheckpointDescription:
              "The inner connection has a tightened nut with one washer and then the plate",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.8.f",
            CheckpointDescription:
              "The outer connection has a tightened bolt with one washer",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 9,
        SubSectionDescription:
          "Check if the axle arms are correctly installed at both sides of axle 2",
        Status: "",
        ImageList: [],
        CheckpointList: [
          {
            CheckpointID: "7.9.a",
            CheckpointDescription:
              "The connection has the two plastic separators, one on each side",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.9.b",
            CheckpointDescription:
              "The inner connection has a tightened nut with one washer and then the plate",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.9.c",
            CheckpointDescription:
              "The outer connection has a tightened bolt with one washer",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.9.d",
            CheckpointDescription:
              "The connection has the two plastic separators, one on each side",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.9.e",
            CheckpointDescription:
              "The inner connection has a tightened nut with one washer and then the plate",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "7.9.f",
            CheckpointDescription:
              "The outer connection has a tightened bolt with one washer",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Air lines brackets",
    SectionNumber: 8,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check if the air lines brackets are properly fixed and have all their lines attached",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/8-Air-Lines-Brackets/8.1.1.png",
          "/images/imagesQC/lead/8-Air-Lines-Brackets/8.1.2.png",
          "/images/imagesQC/lead/8-Air-Lines-Brackets/8.1.3.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "8.1.a",
            CheckpointDescription:
              "Axle 1 air lines bracket has its two bolts tightened and with washers; and it’s properly fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "8.1.b",
            CheckpointDescription:
              "Axle 1 air lines bracket has its four air connections with red and blue hoses",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "8.1.c",
            CheckpointDescription:
              "Axle 1 left two lower hoses are connected to the left side of its axle",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "8.1.d",
            CheckpointDescription:
              "Axle 1 right two lower hoses are connected to the right side of its axle",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "8.1.e",
            CheckpointDescription:
              "Axle 2 air lines bracket has its two bolts tightened and with washers; and it’s properly fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "8.1.f",
            CheckpointDescription:
              "Axle 2 air lines bracket has its four air connections with red and blue hoses",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "8.1.g",
            CheckpointDescription:
              "Axle 2 left two lower hoses are connected to the left side of its axle",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "8.1.h",
            CheckpointDescription:
              "Axle 2 right two lower hoses are connected to the right side of its axle",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Fifth Wheel",
    SectionNumber: 9,
    SectionProgress: 0,
    TrailersUsedIn: ["Lead"],
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check if the fifth wheel is well centered and fixed",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/9-Fifth-Wheel/9.1.1.png",
          "/images/imagesQC/lead/9-Fifth-Wheel/9.1.2.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "9.1.a",
            CheckpointDescription:
              "The separation with the chassis is the same at both sides",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "9.1.b",
            CheckpointDescription:
              "Left side five bolts and washers are present and tightened",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "9.1.c",
            CheckpointDescription:
              "Right side five bolts and washers are present and tightened",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Ride Height Levelling Valve",
    SectionNumber: 10,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check if the Ride height levelling valve assembly is properly fixed and well connected ",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/10-Ride-Height-Levelling-Valve/10.1.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "10.1.a",
            CheckpointDescription: "assembly is well fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "10.1.b",
            CheckpointDescription:
              "assembly is fixed with two tightened bolts with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "10.1.c",
            CheckpointDescription: "is connected to an air line",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "10.1.d",
            CheckpointDescription: "is connected to a purge line",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "10.1.e",
            CheckpointDescription:
              "arm is connected to the axle 2, and all the mechanical connection has tightened bolts with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "10.1.f",
            CheckpointDescription:
              "arm has been properly calibrated at the desired height",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "10.1.g",
            CheckpointDescription:
              "The rubber cover is present on the valve mounting bracket to avoid damaging the cables",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  // has words left and right
  {
    SectionName: "Air Tanks",
    SectionNumber: 11,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check if the air tanks are properly fixed and have all their pneumatic connections",
        DoubleSided: "true", //Front and Rear (a-i, j-r)
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/11-Air-Tanks/11.1.1.png",
          "/images/imagesQC/lead/11-Air-Tanks/11.1.2.png",
          "/images/imagesQC/lead/11-Air-Tanks/11.1.3.png",
          "/images/imagesQC/lead/11-Air-Tanks/11.1.4.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "11.1.a",
            CheckpointDescription: "Front - is properly centered and fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "11.1.b",
            CheckpointDescription:
              "Front - has a rubber layer in the left connection",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "11.1.c",
            CheckpointDescription:
              "Front - has two tightened bolts with washers in the left connection",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "11.1.d",
            CheckpointDescription:
              "Front - washers are firm but not over torqued in the left connection",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "11.1.e",
            CheckpointDescription:
              "Front - has a rubber layer in the right connection",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "11.1.f",
            CheckpointDescription:
              "Front - has two tightened bolts with washers in the right connection",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "11.1.g",
            CheckpointDescription:
              "Front - washers are firm but not over torqued in the right connection",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "11.1.h",
            CheckpointDescription:
              "Front - has a wire rope attached to its purge valve",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "11.1.i",
            CheckpointDescription:
              "Front - left pneumatic connection is connected to the Dolly valve",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "11.1.j",
            CheckpointDescription: "Rear - is properly centered and fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "11.1.k",
            CheckpointDescription:
              "Rear - has a rubber layer in the left connection",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "11.1.l",
            CheckpointDescription:
              "Rear - has two tightened bolts with washers in the left connection",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "11.1.m",
            CheckpointDescription:
              "Rear - washers are firm but not over torqued in the left connection",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "11.1.n",
            CheckpointDescription:
              "Front - has a rubber layer in the right connection",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "11.1.o",
            CheckpointDescription:
              "Rear - has two tightened bolts with washers in the right connection",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "11.1.p",
            CheckpointDescription:
              "Rear - washers are firm but not over torqued in the right connection",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "11.1.q",
            CheckpointDescription:
              "Rear - has a wire rope attached to its purge valve",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "11.1.r",
            CheckpointDescription:
              "Rear - left pneumatic connection is connected to the Dolly valve",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Dolly Valve (or Speed Valve)",
    SectionNumber: 12,
    SectionProgress: 0,
    TrailersUsedIn: [
      "Lead",
      "Tri 61' 2 Hoppers",
      "Tri 61' 3 Hoppers",
      "Tandem",
    ],
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check if the Dolly Valve is properly fixed and well connected ",
        Status: "",
        ImageList: ["/images/imagesQC/lead/12-Dolly-Valve/12.1.png"],
        CheckpointList: [
          {
            CheckpointID: "12.1.a",
            CheckpointDescription: "is well fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "12.1.b",
            CheckpointDescription:
              "is fixed to the Dolly Valve’s support by two tightened bolts with washers. ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "12.1.c",
            CheckpointDescription:
              "support is fixed to the chassis by two tightened bolts with washers. ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "12.1.d",
            CheckpointDescription:
              "has three pneumatic connections, one to the front air tank",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Platinum name",
    SectionNumber: 13,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check if the Platinum name is properly fixed, centered and aligned, and if it has the correct design",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/13-Platinum-Name/13.1.1.png",
          "/images/imagesQC/lead/13-Platinum-Name/13.1.2.png",
          "/images/imagesQC/lead/13-Platinum-Name/13.1.3.png",
          "/images/imagesQC/lead/13-Platinum-Name/13.1.4.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "13.1.a",
            CheckpointDescription: "Platinum name is properly centered",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "13.1.b",
            CheckpointDescription: "It has the desired design",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "13.1.c",
            CheckpointDescription: "Platinum name is vertically aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "13.1.d",
            CheckpointDescription: "All the letters are correct",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "13.1.e",
            CheckpointDescription: "It is tightened by two bolts with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "13.1.f",
            CheckpointDescription:
              "All the welds are properly made at the sides",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "13.1.g",
            CheckpointDescription:
              "The name plate backer is present and has the desired color",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "13.1.h",
            CheckpointDescription:
              "The name plate backer is fixed by all the 10 fasteners, all of them are tightened and equal",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "13.1.i",
            CheckpointDescription:
              "The back plate has no paint on the back side",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Main Air Connections",
    SectionNumber: 14,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check if the Main Air Connections is properly fixed and well connected ",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/14-Main-Air-Connections/14.1.1.png",
          "/images/imagesQC/lead/14-Main-Air-Connections/14.1.2.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "14.1.a",
            CheckpointDescription:
              "The 7-way socket must be fixed with two tightened bolts with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "14.1.b",
            CheckpointDescription:
              "The cover plate must be fixed with two tightened bolts with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "14.1.c",
            CheckpointDescription:
              "The left air connection must have the valve on the front side, the hose connection on the rear side, and have no leaks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "14.1.d",
            CheckpointDescription:
              "The right air connection must have the valve on the front side, the hose connection on the rear side, and have no leaks",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Rear Horizontal Side Bars",
    SectionNumber: 15,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check if the horizontal side bars are properly aligned and fixed at both ends",
        DoubleSided: "true",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/15-Rear-Horizontal-Side-Bars/15.1.1.png",
          "/images/imagesQC/lead/15-Rear-Horizontal-Side-Bars/15.1.2.png",
          "/images/imagesQC/lead/15-Rear-Horizontal-Side-Bars/15.1.3.png",
          "/images/imagesQC/lead/15-Rear-Horizontal-Side-Bars/15.1.4.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "15.1.a",
            CheckpointDescription: "Left - is vertically aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "15.1.b",
            CheckpointDescription:
              "Left - connection to main structure has three hucks properly tightened. ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "15.1.c",
            CheckpointDescription:
              "Left - connection to main structure is correctly welded in the reinforcement",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "15.1.d",
            CheckpointDescription:
              "Left - connection to chassis is correctly welded in the reinforcement",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "15.1.e",
            CheckpointDescription:
              "Left - connection to chassis has six hucks properly tightened.",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "15.1.f",
            CheckpointDescription:
              "Left - has a water drain hole at the bottom",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "15.1.g",
            CheckpointDescription:
              "Left - connection to chassis has the plastic rectangular plug properly fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "15.1.h",
            CheckpointDescription: "Right - is vertically aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "15.1.i",
            CheckpointDescription:
              "Right - connection to main structure has three hucks properly tightened. ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "15.1.j",
            CheckpointDescription:
              "Right - connection to main structure is correctly welded in the reinforcement",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "15.1.k",
            CheckpointDescription:
              "Right - connection to chassis is correctly welded in the reinforcement",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "15.1.l",
            CheckpointDescription:
              "Right - connection to chassis has six hucks properly tightened.",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "15.1.m",
            CheckpointDescription:
              "Right - has a water drain hole at the bottom",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "15.1.n",
            CheckpointDescription:
              "Right - connection to chassis has the plastic rectangular plug properly fixed",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Sweep Side Handle",
    SectionNumber: 16,
    SectionProgress: 0,
    TrailersUsedIn: ["Lead"],
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check if the sweep side handles are properly positioned, aligned and fixed at both ends",
        DoubleSided: "true",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/16-Sweep-Side-Handle/16.1.1.png",
          "/images/imagesQC/lead/16-Sweep-Side-Handle/16.1.2.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "16.1.a",
            CheckpointDescription:
              "Left - is properly positioned and fixed (same height as the other side)",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "16.1.b",
            CheckpointDescription:
              "Left - is properly aligned both vertically and horizontally",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "16.1.c",
            CheckpointDescription:
              "Left - upper connection’s welds are correct",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "16.1.d",
            CheckpointDescription:
              "Left - lower connection’s welds are correct",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "16.1.e",
            CheckpointDescription:
              "Right - is properly positioned and fixed (same height as the other side)",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "16.1.f",
            CheckpointDescription:
              "Right - is properly aligned both vertically and horizontally",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "16.1.g",
            CheckpointDescription:
              "Right - upper connection’s welds are correct",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "16.1.h",
            CheckpointDescription:
              "Right - lower connection’s welds are correct",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Walking Plate",
    SectionNumber: 17,
    SectionProgress: 0,
    TrailersUsedIn: ["Lead"],
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check if the walking plate is properly installed.",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/17-Walking-Plate/17.1.1.png",
          "/images/imagesQC/lead/17-Walking-Plate/17.1.2.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "17.1.a",
            CheckpointDescription:
              "Left side is properly aligned with the top rear flange",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "17.1.b",
            CheckpointDescription:
              "Right side is properly aligned with the top rear flange",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "17.1.c",
            CheckpointDescription: "Walking plate is firm to walk on",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "17.1.d",
            CheckpointDescription:
              "All the three left side bolts are tightened and have its washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "17.1.e",
            CheckpointDescription:
              "All the three right side bolts are tightened and have its washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "17.1.f",
            CheckpointDescription:
              "The welds of the walking plate are all done",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Rear Grip Tapes",
    SectionNumber: 18,
    SectionProgress: 0,
    TrailersUsedIn: ["Lead"],
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check if the grip tapes are present and properly fixed",
        DoubleSided: "true",
        Status: "",
        ImageList: ["/images/imagesQC/lead/18-Rear-Grip-Tapes/18.1.png"],
        CheckpointList: [
          {
            CheckpointID: "18.1.a",
            CheckpointDescription: "Left - in line with the walking plate",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "18.1.b",
            CheckpointDescription: "Left - properly fixed in all its length",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "18.1.c",
            CheckpointDescription: "Right - in line with the walking plate",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "18.1.d",
            CheckpointDescription: "Right - properly fixed in all its length",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Rear Outer Vertical Inclined Bars",
    SectionNumber: 19,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check if the outer vertical inclined bars are properly aligned and fixed at both ends",
        DoubleSided: "true",
        Status: "",
        ImageList: [
          {
            TrailerType: ["Lead"],
            TireType: "",
            FendersType: "",
            doorsOpeningDirection: "",
            tarpsOpening: "",
            AirInflation: "",
            url: [
              "/images/imagesQC/lead/19-Rear-Outer-Vertical-Inclined-Bars/19.1.1.png",
              "/images/imagesQC/lead/19-Rear-Outer-Vertical-Inclined-Bars/19.1.2.png",
              "/images/imagesQC/lead/19-Rear-Outer-Vertical-Inclined-Bars/19.1.3.png",
              "/images/imagesQC/lead/19-Rear-Outer-Vertical-Inclined-Bars/19.1.4.png",
            ],
          },
          {
            TrailerType: [
              "Tri 61' 2 Hoppers",
              "Tri 61' 3 Hoppers",
              "Tri 72' 2 Hoppers",
            ],
            TireType: "",
            FendersType: "",
            doorsOpeningDirection: "",
            tarpsOpening: "",
            AirInflation: "",
            url: [
              "/images/imagesQC/tri-axle/19.1.1.png",
              "/images/imagesQC/lead/19-Rear-Outer-Vertical-Inclined-Bars/19.1.2.png",
              "/images/imagesQC/lead/19-Rear-Outer-Vertical-Inclined-Bars/19.1.3.png",
              "/images/imagesQC/lead/19-Rear-Outer-Vertical-Inclined-Bars/19.1.4.png",
            ],
          },
        ],
        CheckpointList: [
          {
            CheckpointID: "19.1.a",
            CheckpointDescription: "Left - is properly aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "19.1.b",
            CheckpointDescription:
              "Left - upper connection’s welds are correct",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "19.1.c",
            CheckpointDescription:
              "Left - lower connection’s welds are correct",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "19.1.d",
            CheckpointDescription:
              "Left - lower connection’s bolt is tightened and has washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "19.1.e",
            CheckpointDescription: "Right - is properly aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "19.1.g",
            CheckpointDescription:
              "Right - upper connection’s welds are correct",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "19.1.g",
            CheckpointDescription:
              "Right - lower connection’s welds are correct",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "19.1.h",
            CheckpointDescription:
              "Right - lower connection’s bolt is tightened and has washers",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 2,
        SubSectionDescription: "Outer vertical inclined bars lights",
        DoubleSided: "true",
        optional: "52 extra lights",
        Status: "",
        ImageList: [
          ,
          {
            TrailerType: [
              "Tri 61' 2 Hoppers",
              "Tri 61' 3 Hoppers",
              "Tri 72' 2 Hoppers",
            ],
            TireType: "",
            FendersType: "",
            doorsOpeningDirection: "",
            tarpsOpening: "",
            AirInflation: "",
            url: [
              "/images/imagesQC/lead/19-Rear-Outer-Vertical-Inclined-Bars/19.1.4.png",
            ],
          },
        ],
        CheckpointList: [
          {
            CheckpointID: "19.2.a",
            CheckpointDescription:
              "Left - has four lights with bezels in good condition",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "19.2.b",
            CheckpointDescription:
              "Left - each light is centered and separated from the other lights by the same distance",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "19.2.c",
            CheckpointDescription:
              "Right - has four lights with bezels in good condition",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "19.2.d",
            CheckpointDescription:
              "Right - each light is centered and separated fom the other lights by the same distance",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Rear Inner Vertical Inclined Bars",
    SectionNumber: 20,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check if the inner vertical inclined bars are properly aligned and fixed at both ends",
        DoubleSided: "true",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/20-Rear-Inner-Vertical-Inclined-Bars/20.1.1.png",
          "/images/imagesQC/lead/29-Rear-Inner-Vertical-Inclined-Bars/20.1.2.png",
          "/images/imagesQC/lead/20-Rear-Inner-Vertical-Inclined-Bars/20.1.3.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "20.1.a",
            CheckpointDescription: "Left - is properly aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "20.1.b",
            CheckpointDescription:
              "Left - upper connection’s welds are correct",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "20.1.c",
            CheckpointDescription:
              "Left - lower connection’s welds are correct",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "20.1.d",
            CheckpointDescription:
              "Left - lower connection’s bolt is tightened and has washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "20.1.e",
            CheckpointDescription: "Right - is properly aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "20.1.f",
            CheckpointDescription:
              "Right - upper connection’s welds are correct",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "20.1.g",
            CheckpointDescription:
              "Right - lower connection’s welds are correct",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "20.1.h",
            CheckpointDescription:
              "Right - lower connection’s bolt is tightened and has washers",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 2,
        SubSectionDescription:
          "Check if the inner vertical inclined bars are properly aligned and fixed at both ends",
        DoubleSided: "true",
        Status: "",
        optional: "52 extra lights",
        ImageList: [
          "/images/imagesQC/lead/20-Rear-Inner-Vertical-Inclined-Bars/20.1.3.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "20.2.a",
            CheckpointDescription:
              "Left - has four lights with bezels in good condition",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "20.2.b",
            CheckpointDescription:
              "Left - each light is centered and separated from the other lights by the same distance",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "20.2.c",
            CheckpointDescription:
              "Right - has four lights with bezels in good condition",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "20.2.d",
            CheckpointDescription:
              "Right - each light is centered and separated fom the other lights by the same distance",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Rear Bolted Ladder",
    SectionNumber: 21,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check if the bolted latter is properly positioned, aligned and fixed at both ends",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/21-Rear-Bolted-Ladder/21.1.1.png",
          "/images/imagesQC/lead/21-Rear-Bolted-Ladder/21.1.2.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "21.1.a",
            CheckpointDescription:
              "is vertically and horizontally aligned in all the steps",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "21.1.b",
            CheckpointDescription:
              "has its two bolts with washers tightened at the upper connection",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "21.1.c",
            CheckpointDescription:
              "has its four bolts with washers tightened at the lower connection",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "21.1.d",
            CheckpointDescription:
              "has its six steps firmly welded and horizontally aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "21.1.e",
            CheckpointDescription:
              "withstands the weight of a person in all its steps",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Rear Center Step",
    SectionNumber: 22,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check if the center step is properly positioned, aligned and fixed at both ends",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/22-Rear-Center-Step/22.1.1.png",
          "/images/imagesQC/lead/21-Rear-Center-Step/22.1.2.png",
          "/images/imagesQC/lead/22-Rear-Center-Step/22.1.3.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "22.1.a",
            CheckpointDescription: "is vertically and horizontally",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "22.1.b",
            CheckpointDescription:
              "brackets are properly aligned and centered with respect to the bars.",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "22.1.c",
            CheckpointDescription:
              "left bracket has its two tightened bolts with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "22.1.d",
            CheckpointDescription:
              "right bracket has its two tightened bolts with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "22.1.e",
            CheckpointDescription: "is fixed in all directions",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "22.1.f",
            CheckpointDescription: "withstands the weight of a person",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "22.1.g",
            CheckpointDescription:
              "has its set of bolts in the middle (see purpose)",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Rear Steel Hopper Connection",
    SectionNumber: 23,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check that the rear connection to the hopper...",
        DoubleSided: "true",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/23-Rear-Steel-Hopper-Connection/23.1.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "23.1.a",
            CheckpointDescription: "left - has all its 8 hucks tightened",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "23.1.b",
            CheckpointDescription: "left - is properly fixed and aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "23.1.c",
            CheckpointDescription: "right - has all its 8 hucks tightened",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "23.1.d",
            CheckpointDescription: "right - is properly fixed and aligned",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Front Steel Hopper Connection",
    SectionNumber: 24,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check that the front connection to the hopper...",
        DoubleSided: "true",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/24-Front-Steel-Hopper-Connection/24.1.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "24.1.a",
            CheckpointDescription: "left - has all its 10 hucks tightened",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "24.1.b",
            CheckpointDescription: "left - is properly fixed and aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "24.1.c",
            CheckpointDescription: "right - has all its 10 hucks tightened",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "24.1.d",
            CheckpointDescription: "right - is properly fixed and aligned",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Front Side Covers",
    SectionNumber: 25,
    SectionProgress: 0,
    TrailersUsedIn: [
      "Lead",
      "Tri 61' 2 Hoppers",
      "Tri 61' 3 Hoppers",
      "Tandem",
    ],
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Check that the side cover...",
        DoubleSided: "true",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/25-Side-Covers/25.1.1.png",
          "/images/imagesQC/lead/25-Side-Covers/25.1.2.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "25.1.a",
            CheckpointDescription: "left - is properly fixed in all directions",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "25.1.b",
            CheckpointDescription: "left - is properly aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "25.1.c",
            CheckpointDescription:
              "left - has all its four bolts tightened with washers on its support arm 1 (front arm)",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "25.1.d",
            CheckpointDescription:
              "left - has all its four bolts tightened with washers on its support arm 2 (middle arm)",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "25.1.e",
            CheckpointDescription:
              "left - has all its four bolts tightened with washers on its support arm 3 (rear arm)",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "25.1.f",
            CheckpointDescription:
              "left - connection to the transversal beam has a tightened bolt with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "25.1.g",
            CheckpointDescription:
              "right - is properly fixed in all directions",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "25.1.h",
            CheckpointDescription: "right - is properly aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "25.1.i",
            CheckpointDescription:
              "right - has all its four bolts tightened with washers on its support arm 1 (front arm)",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "25.1.j",
            CheckpointDescription:
              "right - has all its four bolts tightened with washers on its support arm 2 (middle arm)",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "25.1.k",
            CheckpointDescription:
              "right - has all its four bolts tightened with washers on its support arm 3 (rear arm)",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "25.1.l",
            CheckpointDescription:
              "right - connection to the transversal beam has a tightened bolt with washers",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Side Covers Support Arms",
    SectionNumber: 26,
    SectionProgress: 0,
    TrailersUsedIn: [
      "Lead",
      "Tri 61' 2 Hoppers",
      "Tri 61' 3 Hoppers",
      "Tandem",
    ],
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Check that the side cover support arm...",
        DoubleSided: "true",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/26-Side-Covers-Support-Arms/26.1.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "26.1.a",
            CheckpointDescription:
              "left - 1 (front arm) has all its three bolts tightened with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "26.1.b",
            CheckpointDescription:
              "left - 1 (front arm) is properly aligned and fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "26.1.c",
            CheckpointDescription:
              "left - 2 (middle arm) has all its three bolts tightened with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "26.1.d",
            CheckpointDescription:
              "left - 2 (middle arm) is properly aligned and fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "26.1.e",
            CheckpointDescription:
              "left - 3 (rear arm) has all its three bolts tightened with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "26.1.f",
            CheckpointDescription:
              "left - 3 (rear arm) is properly aligned and fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "26.1.g",
            CheckpointDescription:
              "right - 1 (front arm) has all its three bolts tightened with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "26.1.h",
            CheckpointDescription:
              "right - 1 (front arm) is properly aligned and fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "26.1.i",
            CheckpointDescription:
              "right - 2 (middle arm) has all its three bolts tightened with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "26.1.j",
            CheckpointDescription:
              "right - 2 (middle arm) is properly aligned and fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "26.1.k",
            CheckpointDescription:
              "right - 3 (rear arm) has all its three bolts tightened with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "26.1.l",
            CheckpointDescription:
              "right - 3 (rear arm) is properly aligned and fixed",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Side Covers Reflective Tapes",
    SectionNumber: 27,
    SectionProgress: 0,
    TrailersUsedIn: [
      "Lead",
      "Tri 61' 2 Hoppers",
      "Tri 61' 3 Hoppers",
      "Tandem",
    ],
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Check that the side cover's reflective tape...",
        DoubleSided: "true",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/27-Side-Covers-Reflective-Tapes/27.1.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "27.1.a",
            CheckpointDescription:
              "left - is properly pasted in all its surface",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "27.1.b",
            CheckpointDescription: "left - is properly aligned and centered",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "27.1.c",
            CheckpointDescription: "left - has the number present and centered",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "27.1.d",
            CheckpointDescription:
              "left - has red and white sections with the same lengths each",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "27.1.e",
            CheckpointDescription:
              "right - is properly pasted in all its surface",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "27.1.f",
            CheckpointDescription: "right - is properly aligned and centered",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "27.1.g",
            CheckpointDescription:
              "right - has the number present and centered",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "27.1.h",
            CheckpointDescription:
              "right - has red and white sections with the same lengths each",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Central Cover",
    SectionNumber: 28,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Check that the central cover...",
        Status: "",
        ImageList: ["/images/imagesQC/lead/28-Central-Cover/28.1.png"],
        CheckpointList: [
          {
            CheckpointID: "28.1.a",
            CheckpointDescription: "is properly fixed and aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "28.1.b",
            CheckpointDescription:
              "front connection has all its three bolts tightened with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "28.1.c",
            CheckpointDescription:
              "left side connection has all its two bolts tightened with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "28.1.d",
            CheckpointDescription:
              "right side connection has all its two bolts tightened with washers",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Front Horizontal Side Bars",
    SectionNumber: 29,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Check that the horizontal side bar...",
        DoubleSided: "true",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/29-Front-Horizontal-Side-Bars/29.1.1.png",
          "/images/imagesQC/lead/29-Front-Horizontal-Side-Bars/29.1.2.png",
          "/images/imagesQC/lead/29-Front-Horizontal-Side-Bars/29.1.3.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "29.1.a",
            CheckpointDescription:
              "Left - is vertically aligned and properly fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "29.1.b",
            CheckpointDescription:
              "Left - connection to hopper has three hucks properly tightened. ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "29.1.c",
            CheckpointDescription:
              "Left - connection to hopper is correctly welded in the reinforcement",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "29.1.d",
            CheckpointDescription:
              "Left - connection to front chassis is correctly welded in the reinforcement",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "29.1.e",
            CheckpointDescription:
              "Left - connection to front chassis has five hucks properly tightened.",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "29.1.f",
            CheckpointDescription:
              "Right - is vertically aligned and properly fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "29.1.g",
            CheckpointDescription:
              "Right - connection to hopper has three hucks properly tightened. ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "29.1.h",
            CheckpointDescription:
              "Right - connection to hopper is correctly welded in the reinforcement",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "29.1.i",
            CheckpointDescription:
              "Right - connection to front chassis is correctly welded in the reinforcement",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "29.1.j",
            CheckpointDescription:
              "Right - connection to front chassis has five hucks properly tightened.",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Front Outer Vertical Inclined Bars",
    SectionNumber: 30,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Check that the outer vertical inclined bar...",
        DoubleSided: "true",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/30-Front-Outer-Vertical-Inclined-Bars/30.1.1.png",
          "/images/imagesQC/lead/30-Front-Outer-Vertical-Inclined-Bars/30.1.2.png",
          "/images/imagesQC/lead/30-Front-Outer-Vertical-Inclined-Bars/30.1.3.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "30.1.a",
            CheckpointDescription: "Left - is properly aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "30.1.b",
            CheckpointDescription:
              "Left - upper connection’s welds are correct",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "30.1.c",
            CheckpointDescription:
              "Left - lower connection’s welds are correct",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "30.1.d",
            CheckpointDescription:
              "Left - lower connection’s bolt is tightened and has washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "30.1.e",
            CheckpointDescription: "Right - is properly aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "30.1.f",
            CheckpointDescription:
              "Right - upper connection’s welds are correct",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "30.1.g",
            CheckpointDescription:
              "Right - lower connection’s welds are correct",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "30.1.h",
            CheckpointDescription:
              "Right - lower connection’s bolt is tightened and has washers",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Front Inner Vertical Inclined Bars",
    SectionNumber: 31,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Check that the inner vertical inclined bar...",
        DoubleSided: "true",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/31-Front-Inner-Vertical-Inclined-Bars/31.1.1.png",
          "/images/imagesQC/lead/31-Front-Inner-Vertical-Inclined-Bars/31.1.2.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "31.1.a",
            CheckpointDescription: "Left - is properly aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "31.1.b",
            CheckpointDescription:
              "Left - upper connection’s welds are correct",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "31.1.c",
            CheckpointDescription:
              "Left - lower connection’s welds are correct",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "31.1.d",
            CheckpointDescription:
              "Left - lower connection’s bolt is tightened and has washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "31.1.e",
            CheckpointDescription: "Right - is properly aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "31.1.f",
            CheckpointDescription:
              "Right - upper connection’s welds are correct",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "31.1.g",
            CheckpointDescription:
              "Right - lower connection’s welds are correct",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "31.1.h",
            CheckpointDescription:
              "Right - lower connection’s bolt is tightened and has washers",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Front Bolted Ladder",
    SectionNumber: 32,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Check that the bolted ladder...",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/32-Front-Bolted-Ladder/32.1.1.png",
          "/images/imagesQC/lead/32-Front-Bolted-Ladder/32.1.2.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "32.1.a",
            CheckpointDescription:
              "is vertically and horizontally aligned in all the steps",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "32.1.b",
            CheckpointDescription:
              "has its two bolts with washers tightened at the upper connection",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "32.1.c",
            CheckpointDescription:
              "has its four bolts with washers tightened at the lower connection",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "32.1.d",
            CheckpointDescription:
              "has its six steps firmly welded and horizontally aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "32.1.e",
            CheckpointDescription:
              "withstands the weight of a person in all its steps",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Front Center Step",
    SectionNumber: 33,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Check that the center step...",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/33-Front-Center-Step/33.1.1.png",
          "/images/imagesQC/lead/33-Front-Center-Step/33.1.2.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "33.1.a",
            CheckpointDescription: "is vertically and horizontally aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "33.1.b",
            CheckpointDescription:
              "brackets are properly aligned and centered with respect to the bars",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "33.1.c",
            CheckpointDescription:
              "right bracket has its two tightened bolts with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "33.1.d",
            CheckpointDescription:
              "middle bracket has its two tightened bolts with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "33.1.e",
            CheckpointDescription:
              "left bracket has its two tightened bolts with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "33.1.f",
            CheckpointDescription: "is fixed in all directions",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "33.1.g",
            CheckpointDescription: "withstands the weight of a person",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "33.1.h",
            CheckpointDescription: "has its set three attachment in the front",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Front Mud Flap Curtain Support",
    SectionNumber: 34,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check that the front mud flap curtain support...",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/34-Front-Mud-Flap-Curtain-Support/34.1.1.png",
          "/images/imagesQC/lead/34-Front-Mud-Flap-Curtain-Support/34.1.2.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "34.1.a",
            CheckpointDescription: "is vertically and horizontally",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "34.1.b",
            CheckpointDescription: "is properly fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "34.1.c",
            CheckpointDescription:
              "left connection to the chassis has its three tightened bolts with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "34.1.d",
            CheckpointDescription:
              "right connection to the chassis has its three tightened bolts with washers",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Front Mud Flaps",
    SectionNumber: 35,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Check that...",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/35-Front-Mud-Flaps/35.1.1.png",
          "/images/imagesQC/lead/35-Front-Mud-Flaps/35.1.2.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "35.1.a",
            CheckpointDescription:
              "The outer left mud flap is properly aligned and fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "35.1.b",
            CheckpointDescription:
              "The outer left mud flap has four tightened bolts with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "35.1.c",
            CheckpointDescription:
              "The inner left mud flap is properly aligned and fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "35.1.d",
            CheckpointDescription:
              "The inner left mud flap has four tightened bolts with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "35.1.e",
            CheckpointDescription:
              "The outer right mud flap is properly aligned and fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "35.1.f",
            CheckpointDescription:
              "The outer right mud flap has four tightened bolts with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "35.1.g",
            CheckpointDescription:
              "The inner right mud flap is properly aligned and fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "35.1.h",
            CheckpointDescription:
              "The inner right mud flap has four tightened bolts with washers",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Line Filter Sealco",
    SectionNumber: 36,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Check that the line filter Sealco...",
        Status: "",
        ImageList: ["/images/imagesQC/lead/36-Line-Filter-Sealco/36.1.png"],
        CheckpointList: [
          {
            CheckpointID: "36.1.a",
            CheckpointDescription:
              "is properly fixed to its support by two tightened bolts with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "36.1.b",
            CheckpointDescription:
              "support is properly fixed to the chassis by two tightened bolts with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "36.1.c",
            CheckpointDescription: "is connected to two red air hoses",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Line Filter Wabco",
    SectionNumber: 37,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Check that the line filter Wabco...",
        Status: "",
        ImageList: ["/images/imagesQC/lead/37-Line-Filter-Wabco/37.1.png"],
        CheckpointList: [
          {
            CheckpointID: "37.1.a",
            CheckpointDescription:
              "is properly fixed to its support by two tightened bolts with washers  ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "37.1.b",
            CheckpointDescription:
              "support is properly fixed to the chassis by two tightened bolts with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "37.1.c",
            CheckpointDescription: "is connected to two blue air hoses",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Control Box", // Redo checkpoints due to design update.
    SectionNumber: 38,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Check that...",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/38-Control-Box/38.1.png",
          "/images/imagesQC/lead/38-Control-Box/38.2.png",
          "/images/imagesQC/lead/38-Control-Box/38.3.png",
          "/images/imagesQC/lead/38-Control-Box/38.4.png",
          "/images/imagesQC/lead/38-Control-Box/38.5.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "38.1.a",
            CheckpointDescription:
              "The assembly support is fixed in all directions (doesn’t move by hand)",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "38.1.b",
            CheckpointDescription:
              "The assembly support has two tightened bolts with washers in the front connection",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "38.1.c",
            CheckpointDescription:
              "The assembly support has two tightened bolts with washers in the rear connection",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "38.1.d",
            CheckpointDescription:
              "The control box is fixed to the assembly support by four tightened bolts with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "38.1.e",
            CheckpointDescription:
              "The landing gear crank cradle is fixed to the assembly support by four tightened bolts with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "38.1.f",
            CheckpointDescription:
              "The control box is connected to the three electric connections",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "38.1.g",
            CheckpointDescription: "The crank handle has two plastic supports",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "38.1.h",
            CheckpointDescription: "The crank handle has a plastic handle end",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Front Air and Electric Connections",
    SectionNumber: 39,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Check that...",
        Status: "",
        ImageList: [
          {
            TrailerType: ["Lead"],
            TireType: "",
            FendersType: "",
            doorsOpeningDirection: "",
            tarpsOpening: "",
            AirInflation: "",
            url: [
              "/images/imagesQC/lead/39-Front-Air-Electric-Connections/39.1.png",
              "/images/imagesQC/lead/39-Front-Air-Electric-Connections/39.2.png",
            ],
          },
          {
            TrailerType: [
              "Tri 61' 2 Hoppers",
              "Tri 61' 3 Hoppers",
              "Tri 72' 2 Hoppers",
              "Pup",
            ],
            TireType: "",
            FendersType: "",
            doorsOpeningDirection: "",
            tarpsOpening: "",
            AirInflation: "",
            url: [
              "/images/imagesQC/lead/39-Front-Air-Electric-Connections/39.1.png",
            ],
          },
        ],
        CheckpointList: [
          {
            CheckpointID: "39.1.a",
            CheckpointDescription:
              "The 7-way socket is properly fixed by two tightened bolts with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "39.1.b",
            CheckpointDescription:
              "The 7-way socket is properly connected to the electric wiring",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "39.1.c",
            CheckpointDescription:
              "The glad hand red connection is properly fixed and connected to a red hose",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "39.1.d",
            CheckpointDescription:
              "The glad hand blue connection is properly fixed and connected to a blue hose",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "39.1.e",
            CheckpointDescription:
              "The cover is properly fixed by two tightened bolts with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "39.1.f",
            CheckpointDescription:
              "For the Lead, check the main hose has enough bending space for each wire and hose while these are connected to the Pup plugs.",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Center Lights",
    SectionNumber: 40,
    SectionProgress: 0,
    optional: "underglow",
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Front:",
        Status: "",
        optional: "underglow",
        ImageList: [
          "/images/imagesQC/lead/40-Front-Center-Lights/40.1.png",
          "/images/imagesQC/lead/40-Front-Center-Lights/40.2.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "40.1.a",
            CheckpointDescription:
              "The 7-way socket is properly fixed by two tightened bolts with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "40.1.b",
            CheckpointDescription:
              "The 7-way socket is properly connected to the electric wiring",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "40.1.c",
            CheckpointDescription:
              "The glad hand red connection is properly fixed and connected to a red hose",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "40.1.d",
            CheckpointDescription:
              "The glad hand blue connection is properly fixed and connected to a blue hose",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 2,
        SubSectionDescription: "Rear:",
        Status: "",
        optional: "underglow",
        ImageList: [
          "/images/imagesQC/lead/40-Front-Center-Lights/40.1.png",
          "/images/imagesQC/lead/40-Front-Center-Lights/40.2.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "40.2.a",
            CheckpointDescription:
              "The 7-way socket is properly fixed by two tightened bolts with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "40.2.b",
            CheckpointDescription:
              "The 7-way socket is properly connected to the electric wiring",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "40.2.c",
            CheckpointDescription:
              "The glad hand red connection is properly fixed and connected to a red hose",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "40.2.d",
            CheckpointDescription:
              "The glad hand blue connection is properly fixed and connected to a blue hose",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  // Verify checkpoints
  {
    SectionName: "Hopper support legs", // Verify checkpoints
    SectionNumber: 41,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Check that...",
        DoubleSided: "true",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/41-Hopper-Support-Legs/41.1.1.png",
          "/images/imagesQC/lead/41-Hopper-Support-Legs/41.1.2.png",
          "/images/imagesQC/lead/41-Hopper-Support-Legs/41.1.3.png",
          "/images/imagesQC/lead/41-Hopper-Support-Legs/41.1.4.png",
          "/images/imagesQC/lead/41-Hopper-Support-Legs/41.1.5.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "41.1.a",
            CheckpointDescription: "Left - is vertically aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "41.1.b",
            CheckpointDescription:
              "Left - connection with the hopper has 8 (new model) tightened bolts with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "41.1.c",
            CheckpointDescription:
              "Left - connection with the hopper has 3 tightened bolts with washers at the bottom",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "41.1.d",
            CheckpointDescription:
              "Left - connection with the inclined reinforcement brace has one tightened bolt with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "41.1.e",
            CheckpointDescription:
              "Left - connection with the horizontal reinforcement brace has one tightened bolt with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "41.1.f",
            CheckpointDescription: "Left - is connected to the cross tube",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "41.1.g",
            CheckpointDescription: "Left - has the landing gear crank block",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "41.1.h",
            CheckpointDescription: "Left - has all the required labels",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "41.1.i",
            CheckpointDescription: "Right - is vertically aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "41.1.j",
            CheckpointDescription:
              "Right - connection with the hopper has 8 (new model) tightened bolts with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "41.1.k",
            CheckpointDescription:
              "Right - connection with the hopper has 3 tightened bolts with washers at the bottom",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "41.1.l",
            CheckpointDescription:
              "Right - connection with the inclined reinforcement brace has one tightened bolt with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "41.1.m",
            CheckpointDescription:
              "Right - connection with the horizontal reinforcement brace has one tightened bolt with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "41.1.n",
            CheckpointDescription: "Right - is connected to the cross tube",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 2,
        SubSectionDescription: "Check that the support legs move the hopper...",
        DoubleSided: "true",
        Status: "",
        ImageList: ["/images/imagesQC/lead/41-Hopper-Support-Legs/41.2.png"],
        CheckpointList: [
          {
            CheckpointID: "41.2.a",
            CheckpointDescription: "up from the left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "41.2.b",
            CheckpointDescription: "down from the left",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "41.2.c",
            CheckpointDescription: "up from the right",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "41.2.d",
            CheckpointDescription: "down from the right",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Platinum Reinforcement Triangle",
    SectionNumber: 42,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check that the platinum reinforcement triangle...",
        DoubleSided: "true",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/42-Platinum-Reinforcement-Triangle/42.1.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "42.1.a",
            CheckpointDescription: "left - must be fixed and properly aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "42.1.b",
            CheckpointDescription:
              "left - upper rear connection has one tightened bolt with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "42.1.c",
            CheckpointDescription:
              "left - lower connection has one tightened bolt with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "42.1.d",
            CheckpointDescription:
              "left - upper front connection has three tightened bolts with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "42.1.e",
            CheckpointDescription: "right - must be fixed and properly aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "42.1.f",
            CheckpointDescription:
              "right - upper rear connection has one tightened bolt with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "42.1.g",
            CheckpointDescription:
              "right - lower connection has one tightened bolt with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "42.1.h",
            CheckpointDescription:
              "right - upper front connection has three tightened bolts with washers",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Hopper Doors Central Mechanisms",
    SectionNumber: 43,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Check that the hopper door's...",
        DoubleSided: "true", //front and rear, (a-g, h-n)
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/43-Hopper-Doors-Central-Mechanisms/43.1.1.png",
          "/images/imagesQC/lead/43-Hopper-Doors-Central-Mechanisms/43.1.2.png",
          "/images/imagesQC/lead/43-Hopper-Doors-Central-Mechanisms/43.1.3.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "43.1.a",
            CheckpointDescription:
              "Front - wiper mounting plate is fixed by 5 tightened bolts with washers and Nylocks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.1.b",
            CheckpointDescription:
              "Front - wiper clamp is fixed by 6 tightened bolts with washers and Nylocks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.1.c",
            CheckpointDescription:
              "Front - wiper is properly aligned, and it is in contact with the door at all points",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.1.d",
            CheckpointDescription:
              "Front - two chains and sprockets are properly aligned and welded",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.1.e",
            CheckpointDescription:
              "Front - shaft is vertically and horizontally aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.1.f",
            CheckpointDescription:
              "Front - surface is plane and has no damage on the upper side",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.1.g",
            CheckpointDescription:
              "Front - shaft guide is centered and properly welded to the door",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.1.h",
            CheckpointDescription:
              "Rear - wiper mounting plate is fixed by 5 tightened bolts with washers and Nylocks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.1.i",
            CheckpointDescription:
              "Rear - wiper clamp is fixed by 6 tightened bolts with washers and Nylocks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.1.j",
            CheckpointDescription:
              "Rear - wiper is properly aligned, and it is in contact with the door at all points",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.1.k",
            CheckpointDescription:
              "Rear - two chains and sprockets are properly aligned and welded",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.1.l",
            CheckpointDescription:
              "Rear - shaft is vertically and horizontally aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.1.m",
            CheckpointDescription:
              "Rear - surface is plane and has no damage on the upper side",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.1.n",
            CheckpointDescription:
              "Rear - shaft guide is centered and properly welded to the door",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  //-->doors
  {
    SectionName: "Hopper Doors Side Mechanisms",
    SectionNumber: 44,
    SectionProgress: 0,
    DoubleSided: "true",
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Check that the front left hopper door...",
        Status: "",
        ImageList: [
          {
            TrailerType: [],
            TireType: "",
            FendersType: "",
            doorsOpeningDirection: "Doors Open Inwards",
            tarpsOpening: "",
            AirInflation: "",
            url: [
              "/images/imagesQC/lead/44-Hopper-Doors-Side-Mechanisms/44.1.png",
              "/images/imagesQC/lead/44-Hopper-Doors-Side-Mechanisms/44.2.png",
              "/images/imagesQC/lead/44-Hopper-Doors-Side-Mechanisms/44.3.png",
              "/images/imagesQC/lead/44-Hopper-Doors-Side-Mechanisms/44.4.png",
              "/images/imagesQC/lead/44-Hopper-Doors-Side-Mechanisms/44.5.png",
              "/images/imagesQC/lead/44-Hopper-Doors-Side-Mechanisms/44.6.png",
              "/images/imagesQC/lead/44-Hopper-Doors-Side-Mechanisms/44.7.png",
              "/images/imagesQC/lead/44-Hopper-Doors-Side-Mechanisms/44.8.png",
              "/images/imagesQC/lead/44-Hopper-Doors-Side-Mechanisms/44.9.png",
              "/images/imagesQC/lead/44-Hopper-Doors-Side-Mechanisms/44.10.png",
            ],
          },
          {
            TrailerType: [],
            TireType: "",
            FendersType: "",
            doorsOpeningDirection: "Doors Open Outwards",
            tarpsOpening: "",
            AirInflation: "",
            url: [
              "/images/imagesQC/variants/doors-opening/DO8.png",
              "/images/imagesQC/variants/doors-opening/DO9.png",
              "/images/imagesQC/lead/44-Hopper-Doors-Side-Mechanisms/44.3.png",
              "/images/imagesQC/lead/44-Hopper-Doors-Side-Mechanisms/44.4.png",
              "/images/imagesQC/variants/doors-opening/DO10.png",
              "/images/imagesQC/lead/44-Hopper-Doors-Side-Mechanisms/44.6.png",
              "/images/imagesQC/lead/44-Hopper-Doors-Side-Mechanisms/44.7.png",
              "/images/imagesQC/lead/44-Hopper-Doors-Side-Mechanisms/44.8.png",
              "/images/imagesQC/lead/44-Hopper-Doors-Side-Mechanisms/44.9.png",
              "/images/imagesQC/lead/44-Hopper-Doors-Side-Mechanisms/44.10.png",
            ],
          },
        ],
        CheckpointList: [
          {
            CheckpointID: "44.1.a",
            CheckpointDescription:
              "push lock is fixed to the hopper by two rivets",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.1.b",
            CheckpointDescription: "push lock has an open/close sticker",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.1.c",
            CheckpointDescription:
              "push lock has a tightened bolt in the lock mechanism articulation",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.1.d",
            CheckpointDescription: "push lock’s spring works properly",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.1.e",
            CheckpointDescription:
              "josh is well centered and fixed by the white polymer bearing",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.1.f",
            CheckpointDescription:
              "push lock is connected to a wire, that is attached by a tightened bolt with a washer",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.1.g",
            CheckpointDescription:
              "push lock clip in present and in the right position",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.1.h",
            CheckpointDescription:
              "push lock polymer bearing is fixed and attached by two tightened bolts with washers and Nylocks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.1.i",
            CheckpointDescription:
              "has all the jost articulation’s bolts tightened",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.1.j",
            CheckpointDescription:
              "shaft is well centered and fixed by the white polymer bearing",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.1.k",
            CheckpointDescription:
              "has all the bolts on the sides of the shaft bearing tightened with washers and Nylocks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.1.l",
            CheckpointDescription:
              "transversal beam is properly fixed at this side, and has four tightened bolts with washers and Nylocks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.1.m",
            CheckpointDescription:
              "has all the six bolts on the fixed inner side guide tightened with washers and Nylocks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.1.n",
            CheckpointDescription:
              "fixed inner side guide is properly fixed and aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.1.o",
            CheckpointDescription:
              "fixed inner side two grooves are empty and have no bolt inside them",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.1.p",
            CheckpointDescription:
              "has all the six bolts tightened with washers and Nylocks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.1.q",
            CheckpointDescription:
              "fixed inner side guide has none of the bolts with signs of over torque or deformations",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.1.r",
            CheckpointDescription:
              "fixed outer side upper guide is properly fixed and aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.1.s",
            CheckpointDescription:
              "fixed outer side upper guide has all the 5 bolts tightened with washers and Nylocks with no signs of over torque or deformations",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.1.t",
            CheckpointDescription:
              "fixed outer side lower guide is properly fixed and aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.1.u",
            CheckpointDescription:
              "fixed outer side lower guide has all the 5 bolts tightened with washers and Nylocks with no signs of over torque or deformations",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.1.v",
            CheckpointDescription:
              "allows a 5/16” gauge to go through the gap between the door fixed outer side upper and lower guides, without being stuck at any point",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.1.w",
            CheckpointDescription: "hammer hit is properly aligned and fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.1.x",
            CheckpointDescription:
              "hammer hit has a “HIT HERE” label properly centered, pasted and aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.1.y",
            CheckpointDescription:
              "hammer hit is properly welded at both sides",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 2,
        SubSectionDescription: "Check that the rear left hopper door...",
        Status: "",
        ImageList: [],
        CheckpointList: [
          {
            CheckpointID: "44.2.a",
            CheckpointDescription:
              "push lock is fixed to the hopper by two rivets",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.2.b",
            CheckpointDescription: "push lock has an open/close sticker",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.2.c",
            CheckpointDescription:
              "push lock has a tightened bolt in the lock mechanism articulation",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.2.d",
            CheckpointDescription: "push lock’s spring works properly",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.2.e",
            CheckpointDescription:
              "josh is well centered and fixed by the white polymer bearing",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.2.f",
            CheckpointDescription:
              "push lock is connected to a wire, that is attached by a tightened bolt with a washer",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.2.g",
            CheckpointDescription:
              "push lock clip in present and in the right position",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.2.h",
            CheckpointDescription:
              "push lock polymer bearing is fixed and attached by two tightened bolts with washers and Nylocks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.2.i",
            CheckpointDescription:
              "has all the jost articulation’s bolts tightened",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.2.j",
            CheckpointDescription:
              "shaft is well centered and fixed by the white polymer bearing",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.2.k",
            CheckpointDescription:
              "has all the bolts on the sides of the shaft bearing tightened with washers and Nylocks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.2.l",
            CheckpointDescription:
              "transversal beam is properly fixed at this side, and has four tightened bolts with washers and Nylocks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.2.m",
            CheckpointDescription:
              "has all the six bolts on the fixed inner side guide tightened with washers and Nylocks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.2.n",
            CheckpointDescription:
              "fixed inner side guide is properly fixed and aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.2.o",
            CheckpointDescription:
              "fixed inner side two grooves are empty and have no bolt inside them",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.2.p",
            CheckpointDescription:
              "has all the six bolts tightened with washers and Nylocks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.2.q",
            CheckpointDescription:
              "fixed inner side guide has none of the bolts with signs of over torque or deformations",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.2.r",
            CheckpointDescription:
              "fixed outer side upper guide is properly fixed and aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.2.s",
            CheckpointDescription:
              "fixed outer side upper guide has all the 5 bolts tightened with washers and Nylocks with no signs of over torque or deformations",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.2.t",
            CheckpointDescription:
              "fixed outer side lower guide is properly fixed and aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.2.u",
            CheckpointDescription:
              "fixed outer side lower guide has all the 5 bolts tightened with washers and Nylocks with no signs of over torque or deformations",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.2.v",
            CheckpointDescription:
              "allows a 5/16” gauge to go through the gap between the door fixed outer side upper and lower guides, without being stuck at any point",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.2.w",
            CheckpointDescription: "hammer hit is properly aligned and fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.2.x",
            CheckpointDescription:
              "hammer hit has a “HIT HERE” label properly centered, pasted and aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.2.y",
            CheckpointDescription:
              "hammer hit is properly welded at both sides",
            CheckpointStatus: "",
          },
        ],
      },
      //next 2 optional - if customer requests on both sides.
      {
        SubSectionNumber: 3, //optional
        SubSectionDescription: "Check that the Front Right hopper door...",
        optional: "Dual door locks",
        Status: "",
        ImageList: [],
        CheckpointList: [
          {
            CheckpointID: "44.3.a",
            CheckpointDescription:
              "push lock is fixed to the hopper by two rivets",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.3.b",
            CheckpointDescription: "push lock has an open/close sticker",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.3.c",
            CheckpointDescription:
              "push lock has a tightened bolt in the lock mechanism articulation",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.3.d",
            CheckpointDescription: "push lock’s spring works properly",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.3.e",
            CheckpointDescription:
              "josh is well centered and fixed by the white polymer bearing",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.3.f",
            CheckpointDescription:
              "push lock is connected to a wire, that is attached by a tightened bolt with a washer",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.3.g",
            CheckpointDescription:
              "push lock clip in present and in the right position",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.3.h",
            CheckpointDescription:
              "push lock polymer bearing is fixed and attached by two tightened bolts with washers and Nylocks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.3.i",
            CheckpointDescription:
              "has all the jost articulation’s bolts tightened",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.3.j",
            CheckpointDescription:
              "shaft is well centered and fixed by the white polymer bearing",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.3.k",
            CheckpointDescription:
              "has all the bolts on the sides of the shaft bearing tightened with washers and Nylocks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.3.l",
            CheckpointDescription:
              "transversal beam is properly fixed at this side, and has four tightened bolts with washers and Nylocks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.3.m",
            CheckpointDescription:
              "has all the six bolts on the fixed inner side guide tightened with washers and Nylocks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.3.n",
            CheckpointDescription:
              "fixed inner side guide is properly fixed and aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.3.o",
            CheckpointDescription:
              "fixed inner side two grooves are empty and have no bolt inside them",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.3.p",
            CheckpointDescription:
              "has all the six bolts tightened with washers and Nylocks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.3.q",
            CheckpointDescription:
              "fixed inner side guide has none of the bolts with signs of over torque or deformations",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.3.r",
            CheckpointDescription:
              "fixed outer side upper guide is properly fixed and aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.3.s",
            CheckpointDescription:
              "fixed outer side upper guide has all the 5 bolts tightened with washers and Nylocks with no signs of over torque or deformations",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.3.t",
            CheckpointDescription:
              "fixed outer side lower guide is properly fixed and aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.3.u",
            CheckpointDescription:
              "fixed outer side lower guide has all the 5 bolts tightened with washers and Nylocks with no signs of over torque or deformations",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.3.v",
            CheckpointDescription:
              "allows a 5/16” gauge to go through the gap between the door fixed outer side upper and lower guides, without being stuck at any point",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.3.w",
            CheckpointDescription: "hammer hit is properly aligned and fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.3.x",
            CheckpointDescription:
              "hammer hit has a “HIT HERE” label properly centered, pasted and aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.3.y",
            CheckpointDescription:
              "hammer hit is properly welded at both sides",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 4, //optional
        SubSectionDescription: "Check that the rear right hopper door...",
        Status: "",
        optional: "Dual door locks",
        ImageList: [],
        CheckpointList: [
          {
            CheckpointID: "44.4.a",
            CheckpointDescription:
              "push lock is fixed to the hopper by two rivets",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.4.b",
            CheckpointDescription: "push lock has an open/close sticker",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.4.c",
            CheckpointDescription:
              "push lock has a tightened bolt in the lock mechanism articulation",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.4.d",
            CheckpointDescription: "push lock’s spring works properly",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.4.e",
            CheckpointDescription:
              "josh is well centered and fixed by the white polymer bearing",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.4.f",
            CheckpointDescription:
              "push lock is connected to a wire, that is attached by a tightened bolt with a washer",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.4.g",
            CheckpointDescription:
              "push lock clip in present and in the right position",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.4.h",
            CheckpointDescription:
              "push lock polymer bearing is fixed and attached by two tightened bolts with washers and Nylocks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.4.i",
            CheckpointDescription:
              "has all the jost articulation’s bolts tightened",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.4.j",
            CheckpointDescription:
              "shaft is well centered and fixed by the white polymer bearing",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.4.k",
            CheckpointDescription:
              "has all the bolts on the sides of the shaft bearing tightened with washers and Nylocks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.4.l",
            CheckpointDescription:
              "transversal beam is properly fixed at this side, and has four tightened bolts with washers and Nylocks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.4.m",
            CheckpointDescription:
              "has all the six bolts on the fixed inner side guide tightened with washers and Nylocks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.4.n",
            CheckpointDescription:
              "fixed inner side guide is properly fixed and aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.4.o",
            CheckpointDescription:
              "fixed inner side two grooves are empty and have no bolt inside them",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.4.p",
            CheckpointDescription:
              "has all the six bolts tightened with washers and Nylocks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.4.q",
            CheckpointDescription:
              "fixed inner side guide has none of the bolts with signs of over torque or deformations",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.4.r",
            CheckpointDescription:
              "fixed outer side upper guide is properly fixed and aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.4.s",
            CheckpointDescription:
              "fixed outer side upper guide has all the 5 bolts tightened with washers and Nylocks with no signs of over torque or deformations",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.4.t",
            CheckpointDescription:
              "fixed outer side lower guide is properly fixed and aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.2.u",
            CheckpointDescription:
              "fixed outer side lower guide has all the 5 bolts tightened with washers and Nylocks with no signs of over torque or deformations",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.4.v",
            CheckpointDescription:
              "allows a 5/16” gauge to go through the gap between the door fixed outer side upper and lower guides, without being stuck at any point",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.4.w",
            CheckpointDescription: "hammer hit is properly aligned and fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.4.x",
            CheckpointDescription:
              "hammer hit has a “HIT HERE” label properly centered, pasted and aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "44.4.y",
            CheckpointDescription:
              "hammer hit is properly welded at both sides",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Hopper's surface and external welds check",
    SectionNumber: 45,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Check that...",
        DoubleSided: "true", // front, rear, left, right
        Status: "",
        ImageList: [],
        CheckpointList: [
          {
            CheckpointID: "45.1.a",
            CheckpointDescription:
              "Hopper’s front wall surface doesn’t have any damage or scratch",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "45.1.b",
            CheckpointDescription:
              "Hopper’s front rails and beams surfaces don’t have any damage or scratch",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "45.1.c",
            CheckpointDescription: "Hopper’s front welds are visually correct",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "45.1.d",
            CheckpointDescription:
              "Hopper’s left side wall surface doesn’t have any damage or scratch",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "45.1.e",
            CheckpointDescription:
              "Hopper’s left side rails and beams surfaces don’t have any damage or scratch",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "45.1.f",
            CheckpointDescription:
              "Hopper’s left side welds are visually correct",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "45.1.g",
            CheckpointDescription:
              "Hopper’s right side wall surface doesn’t have any damage or scratch",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "45.1.h",
            CheckpointDescription:
              "Hopper’s right side rails and beams surfaces don’t have any damage or scratch",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "45.1.i",
            CheckpointDescription:
              "Hopper’s right side welds are visually correct",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "45.1.j",
            CheckpointDescription:
              "Hopper’s rear wall surface doesn’t have any damage or scratch",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "45.1.k",
            CheckpointDescription:
              "Hopper’s rear rails and beams surfaces don’t have any damage or scratch",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "45.1.l",
            CheckpointDescription: "Hopper’s rear welds are visually correct",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Check that...",
        DoubleSided: "true", // front, rear, left, right
        Status: "",
        ImageList: [],
        CheckpointList: [
          {
            CheckpointID: "45.2.a",
            CheckpointDescription:
              "Hopper’s front inner surface doesn’t have any damage or scratch",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "45.2.b",
            CheckpointDescription: "Hopper’s front inner ladders are aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "45.2.c",
            CheckpointDescription: "Hopper’s front inner welds are correct",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "45.2.d",
            CheckpointDescription: "Hopper’s front tarp bows are aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "45.2.e",
            CheckpointDescription:
              "Hopper’s rear inner surface doesn’t have any damage or scratch",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "45.2.f",
            CheckpointDescription:
              "Hopper’s rear inner ladder steps are aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "45.2.g",
            CheckpointDescription:
              "Hopper’s rear inner ladder has the correct number of steps",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "45.2.h",
            CheckpointDescription: "Hopper’s rear inner welds are correct",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "45.2.i",
            CheckpointDescription: "Hopper’s front tarp bows are aligned",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Front Hopper 3 dime red lights",
    SectionNumber: 46,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check that the hopper front three red dime lights...",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/46-Front-Hopper-3-Dime-Lights/46.1.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "46.1.a",
            CheckpointDescription: "bezels in good condition",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "46.1.b",
            CheckpointDescription: "are vertically centered",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "46.1.c",
            CheckpointDescription: "set is horizontally centered",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "46.1.d",
            CheckpointDescription: "have the same separation with each other",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Hopper Platinum 'P' ",
    SectionNumber: 47,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Check that the Platinum “P”...",
        DoubleSided: "true",
        Status: "",
        ImageList: ["/images/imagesQC/lead/47-Hopper-Platinum-P/47.1.png"],
        CheckpointList: [
          {
            CheckpointID: "46.1.a",
            CheckpointDescription:
              "front - is well cut and has the selected color",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "46.1.b",
            CheckpointDescription: "front - is horizontally centered",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "46.1.c",
            CheckpointDescription: "front - properly fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "46.1.d",
            CheckpointDescription: "front - has four tightened rivets",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "46.1.e",
            CheckpointDescription:
              "rear - is well cut and has the selected color",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "46.1.f",
            CheckpointDescription: "rear - is horizontally centered",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "46.1.g",
            CheckpointDescription: "rear - properly fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "46.1.h",
            CheckpointDescription: "rear - has four tightened rivets",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Customer Logo",
    SectionNumber: 48,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Check that the customer logo('s)...",
        Status: "",
        ImageList: ["/images/imagesQC/lead/48-Customer-Logo/48.1.png"],
        CheckpointList: [
          {
            CheckpointID: "48.1.a",
            CheckpointDescription: "is required, and it is present",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "48.1.b",
            CheckpointDescription: "number matches the required number",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "48.1.c",
            CheckpointDescription: "color matches the required color",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "48.1.d",
            CheckpointDescription: "size matches the required size",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "48.1.e",
            CheckpointDescription:
              "position or positions matches the required position or positions",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "48.1.f",
            CheckpointDescription:
              "is properly pasted or painted and has the correct design",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Platinum Logo",
    SectionNumber: 49,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Check that the platinum logo...",
        DoubleSided: "true",
        Status: "",
        ImageList: ["/images/imagesQC/lead/49-Platinum-Logo/49.1.png"],
        CheckpointList: [
          {
            CheckpointID: "49.1.a",
            CheckpointDescription: "Left - is present",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "49.1.b",
            CheckpointDescription: "Left - color matches the required color",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "49.1.c",
            CheckpointDescription:
              "Left - horizontal position matches the required position",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "49.1.d",
            CheckpointDescription:
              "Left - vertical position matches the required position",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "49.1.e",
            CheckpointDescription: "Left - is vertically aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "49.1.f",
            CheckpointDescription:
              "Left - is properly pasted or painted and has the correct design",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "49.1.g",
            CheckpointDescription: "Right - is present",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "49.1.h",
            CheckpointDescription: "Right - color matches the required color",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "49.1.i",
            CheckpointDescription:
              "Right - horizontal position matches the required position",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "49.1.j",
            CheckpointDescription:
              "Right - vertical position matches the required position",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "49.1.k",
            CheckpointDescription: "Right - is vertically aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "49.1.l",
            CheckpointDescription:
              "Right - is properly pasted or painted and has the correct design",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Hopper's side bottom rail amber dime lights",
    SectionNumber: 50,
    SectionProgress: 0,
    optional: "28 extra lights",
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check that the hopper’s side bottom rail amber dime lights...",
        DoubleSided: "true",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/50-Hopper-Side-Bottom-Dime/50.1.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "50.1.a",
            CheckpointDescription:
              "Left - are present. There are three amber lights with bezels in good condition",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "50.1.b",
            CheckpointDescription:
              "Left - are vertically and horizontally centered",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "50.1.c",
            CheckpointDescription: "Left - have the same separation distance",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "50.1.d",
            CheckpointDescription:
              "Right - are present. There are three amber lights with bezels in good condition",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "50.1.e",
            CheckpointDescription:
              "Right - are vertically and horizontally centered",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "50.1.f",
            CheckpointDescription: "Right - have the same separation distance",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Hopper's side bottom rail reflective tapes",
    SectionNumber: 51,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check that the hopper’s side bottom rail reflective tapes...",
        DoubleSided: "true",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/51-Hopper-Side-Bottom-Reflective-Tapes/51.1.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "51.1.a",
            CheckpointDescription:
              "Left - four sets are present and properly pasted. ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "51.1.b",
            CheckpointDescription:
              "Each left set has two red sections and one silver section in the middle.",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "51.1.c",
            CheckpointDescription:
              "Left - sets are vertically and horizontally centered.",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "51.1.d",
            CheckpointDescription:
              "Left - sets have the same length and separation distance.",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "51.1.e",
            CheckpointDescription:
              "Right - four sets are present and properly pasted. ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "51.1.f",
            CheckpointDescription:
              "Each right set has two red sections and one silver section in the middle.",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "51.1.g",
            CheckpointDescription:
              "Right - sets are vertically and horizontally centered.",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "51.1.h",
            CheckpointDescription:
              "Right - sets have the same length and separation distance.",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Hopper's side bottom rail amber oval lights",
    SectionNumber: 52,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check that the hopper’s side bottom rail amber oval light...",
        DoubleSided: "true",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/52-Hopper-Side-Bottom-Oval/52.1.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "52.1.a",
            CheckpointDescription: "Left - is in good condition ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "52.1.b",
            CheckpointDescription: "Left - has 4 fixed rivets",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "52.1.c",
            CheckpointDescription:
              "Left - bezel is properly fixed to the support.",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "52.1.d",
            CheckpointDescription: "Left - support is properly welded",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "52.1.e",
            CheckpointDescription:
              "Left - support is properly aligned in all directions (check also from below)",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "52.1.f",
            CheckpointDescription: "Right - is in good condition ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "52.1.g",
            CheckpointDescription: "Right - has 4 fixed rivets",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "52.1.h",
            CheckpointDescription:
              "Right - bezel is properly fixed to the support.",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "52.1.i",
            CheckpointDescription: "Right - support is properly welded",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "52.1.j",
            CheckpointDescription:
              "Right - support is properly aligned in all directions (check also from below)",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Hopper's side inclined rail amber dime lights",
    SectionNumber: 53,
    SectionProgress: 0,
    optional: "28 extra lights",
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check that the front hopper’s side inclined rail amber dime lights...",
        DoubleSided: "true", //front, rear, right, left
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/53-Hopper-Inclined-Rail-Dime/53.1.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "53.1.a",
            CheckpointDescription:
              "Left - are present. There are two amber lights with bezels in good condition",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "53.1.b",
            CheckpointDescription: "Left - are vertically centered",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "53.1.c",
            CheckpointDescription:
              "Left - have the required separation distance with both rail ends",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "53.1.d",
            CheckpointDescription:
              "Right - are present. There are two amber lights with bezels in good condition",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "53.1.e",
            CheckpointDescription: "Right - are vertically centered",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "53.1.f",
            CheckpointDescription:
              "Right - have the required separation distance with both rail ends",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 2,
        SubSectionDescription:
          "Check that the rear hopper’s side inclined rail amber dime lights...",
        DoubleSided: "true", //front, rear, right, left
        Status: "",
        ImageList: [],
        CheckpointList: [
          {
            CheckpointID: "53.2.a",
            CheckpointDescription:
              "Left - are present. There are two amber lights with bezels in good condition",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "53.2.b",
            CheckpointDescription: "Left - are vertically centered",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "53.2.c",
            CheckpointDescription:
              "Left - have the required separation distance with both rail ends",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "53.2.d",
            CheckpointDescription:
              "Right - are present. There are two amber lights with bezels in good condition",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "53.2.e",
            CheckpointDescription: "Right - are vertically centered",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "53.2.f",
            CheckpointDescription:
              "Right - have the required separation distance with both rail ends",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Hopper's side panels amber dime lights",
    SectionNumber: 54,
    SectionProgress: 0,
    optional: "28 extra lights",
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check that the hopper's side panels amber dime lights...",
        DoubleSided: "true",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/54-Hopper-Side-Panels-Dime/54.1.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "54.1.a",
            CheckpointDescription:
              "Left - are present. There are seven amber lights with bezels in good condition",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "54.1.b",
            CheckpointDescription: "Left - are vertically centered",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "54.1.c",
            CheckpointDescription:
              "Left - have the required separation distance between them",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "54.1.d",
            CheckpointDescription:
              "Left - have the required separation distance with both wall’s ends",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "54.1.e",
            CheckpointDescription:
              "Right - are present. There are seven amber lights with bezels in good condition",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "54.1.f",
            CheckpointDescription: "Right - are vertically centered",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "54.1.g",
            CheckpointDescription:
              "Right - have the required separation distance between them",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "54.1.h",
            CheckpointDescription:
              "Right - have the required separation distance with both wall’s ends",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Hopper's front vertical rails amber dime lights",
    SectionNumber: 55,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check that the hopper's front vertical rails amber dime lights...",
        DoubleSided: "true",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/55-Hopper-Side-Panels-Dime/55.1.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "55.1.a",
            CheckpointDescription:
              "Left - are present. There are two amber lights with bezels in good condition",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "55.1.b",
            CheckpointDescription: "Left - are horizontally centered",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "55.1.c",
            CheckpointDescription:
              "Left - have the required separation distance between them",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "55.1.d",
            CheckpointDescription:
              "Left - have the required separation distance with both rail’s ends",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "55.1.e",
            CheckpointDescription:
              "Right - are present. There are two amber lights with bezels in good condition",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "55.1.f",
            CheckpointDescription: "Right - are horizontally centered",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "55.1.g",
            CheckpointDescription:
              "Right - have the required separation distance between them",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "55.1.h",
            CheckpointDescription:
              "Right - have the required separation distance with both rail’s ends",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Hopper's rear vertical rails red dime lights",
    SectionNumber: 56,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check that the hopper's rear vertical rails red dime lights...",
        DoubleSided: "true",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/56-Hopper-Rear-Vertical-Dime/56.1.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "56.1.a",
            CheckpointDescription:
              "Left - are present. There are two red lights with bezels in good condition",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "56.1.b",
            CheckpointDescription: "Left - are horizontally centered",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "56.1.c",
            CheckpointDescription:
              "Left - have the required separation distance between them",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "56.1.d",
            CheckpointDescription:
              "Left - have the required separation distance with both rail’s ends",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "56.1.e",
            CheckpointDescription:
              "Right - are present. There are two red lights with bezels in good condition",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "56.1.f",
            CheckpointDescription: "Right - are horizontally centered",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "56.1.g",
            CheckpointDescription:
              "Right - have the required separation distance between them",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "56.1.h",
            CheckpointDescription:
              "Right - have the required separation distance with both rail’s ends",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Hopper's rear oval red lights",
    SectionNumber: 57,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check that the hopper's rear oval red lights...",
        DoubleSided: "true",
        Status: "",
        ImageList: ["/images/imagesQC/lead/57-Hopper-Rear-Oval/57.1.png"],
        CheckpointList: [
          {
            CheckpointID: "57.1.a",
            CheckpointDescription: "Left - are in good condition ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "57.1.b",
            CheckpointDescription: "Both left - have 4 fixed rivets",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "57.1.c",
            CheckpointDescription:
              "Both left - bezel are properly fixed to the support.",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "57.1.d",
            CheckpointDescription: "Left - support is properly welded",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "57.1.e",
            CheckpointDescription: "Right - are in good condition ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "57.1.f",
            CheckpointDescription: "Both right - have 4 fixed rivets",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "57.1.g",
            CheckpointDescription:
              "Both right - bezel are properly fixed to the support.",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "57.1.h",
            CheckpointDescription: "Right - support is properly welded",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Hopper's middle bottom four red lights",
    SectionNumber: 58,
    SectionProgress: 0,
    optional: "underglow",
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check that all the hopper's middle bottom four red lights...",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/58-Hopper-Middle-Bottom-Red/58.1.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "58.1.a",
            CheckpointDescription: "are in good condition ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "58.1.b",
            CheckpointDescription: "bezels are properly fixed to the support.",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "58.1.c",
            CheckpointDescription: "support is properly welded.",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Hopper's rear bottom four red lights",
    SectionNumber: 59,
    SectionProgress: 0,
    optional: "underglow",
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check that all the hopper's rear bottom four red lights...",
        Status: "",
        ImageList: ["/images/imagesQC/lead/59-Hopper-Rear-Bottom-Red/59.1.png"],
        CheckpointList: [
          {
            CheckpointID: "59.1.a",
            CheckpointDescription: "are in good condition ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "59.1.b",
            CheckpointDescription: "bezels are properly fixed to the support.",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "59.1.c",
            CheckpointDescription: "support is properly welded.",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Hopper's front bottom four red lights",
    SectionNumber: 60,
    SectionProgress: 0,
    optional: "underglow",
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check that all the hopper's front bottom four red lights...",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/60-Hopper-Front-Bottom-Red/60.1.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "60.1.a",
            CheckpointDescription: "are in good condition ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "60.1.b",
            CheckpointDescription: "bezels are properly fixed to the support.",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "60.1.c",
            CheckpointDescription: "support is properly welded",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Hopper's side bottom four red lights",
    SectionNumber: 61,
    SectionProgress: 0,
    optional: "underglow",
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check that all the hopper's side bottom four/six red lights",
        DoubleSided: "true",
        Status: "",
        ImageList: ["/images/imagesQC/lead/61-Hopper-Side-Bottom-Red/61.1.png"],
        CheckpointList: [
          {
            CheckpointID: "61.1.a",
            CheckpointDescription: "Left - are in good condition ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "61.1.b",
            CheckpointDescription:
              "Left - bezels are properly fixed to their supports",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "61.1.c",
            CheckpointDescription: "Left - supports are properly welded",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "61.1.d",
            CheckpointDescription: "Right - are in good condition ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "61.1.e",
            CheckpointDescription:
              "Right - bezels are properly fixed to their supports",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "61.1.f",
            CheckpointDescription: "Right - supports are properly welded",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Hopper's bottom work lights",
    SectionNumber: 62,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Hopper's bottom work light...",
        DoubleSided: "true",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/62-Hopper-Rear-Bottom-Work/62.1.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "62.1.a",
            CheckpointDescription: "rear - is in good condition ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "62.1.b",
            CheckpointDescription: "rear - is properly fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "62.1.c",
            CheckpointDescription: "rear - is connected",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "62.1.d",
            CheckpointDescription: "front - is in good condition ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "62.1.e",
            CheckpointDescription: "front - is properly fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "62.1.f",
            CheckpointDescription: "front - is connected",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Arrangement/Attachment of Wires and Tubes",
    SectionNumber: 63,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Side wires and tubes...",
        DoubleSided: "true",
        Status: "",
        ImageList: ["/images/imagesQC/lead/63-Wires-Tubes/63.1.png"],
        CheckpointList: [
          {
            CheckpointID: "63.1.a",
            CheckpointDescription:
              "Left - are properly ordered and attached. They must not be in contact with sharp edges at any point",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "63.1.b",
            CheckpointDescription:
              "Left - are not in contact with sharp edges at any point",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "63.1.c",
            CheckpointDescription:
              "Right - are properly ordered and attached. They must not be in contact with sharp edges at any point",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "63.1.d",
            CheckpointDescription:
              "Right - are not in contact with sharp edges at any point",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  //string contains the word "right" as in correct, not the direction. Mapping is wrong. --> potentially replace "right" with "correct"? or implement new mapping method (len/2)
  {
    SectionName: "Hopper's rear upper corner silver tapes",
    SectionNumber: 64,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Hopper’s rear upper corner silver tapes",
        DoubleSided: "true",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/64-Hopper-Rear-Corner-Tapes/64.1.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "64.1.a",
            CheckpointDescription:
              "Left - are vertically and horizontally aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "64.1.b",
            CheckpointDescription: "Left - have the correct length",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "64.1.c",
            CheckpointDescription:
              "Left - are positioned at the correct distance from the corner",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "64.1.d",
            CheckpointDescription:
              "Right - are vertically and horizontally aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "64.1.e",
            CheckpointDescription: "Right - have the correct length",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "64.1.f",
            CheckpointDescription:
              "Right - are positioned at the correct distance from the corner",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  //--> tarps opening
  {
    SectionName: "Tarps Fasteners and stick",
    SectionNumber: 65,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Check that...",
        Status: "",
        ImageList: [
          {
            TrailerType: [],
            TireType: "",
            FendersType: "",
            doorsOpeningDirection: "",
            tarpsOpening: "Manual",
            AirInflation: "",
            url: [
              "/images/imagesQC/lead/65-Tarps-Fasteners-Stick/65.1.png",
              "/images/imagesQC/lead/65-Tarps-Fasteners-Stick/65.2.png",
            ],
          },
          {
            TrailerType: [],
            TireType: "",
            FendersType: "",
            doorsOpeningDirection: "",
            tarpsOpening: "Electric",
            AirInflation: "",
            url: [
              "/images/imagesQC/lead/65-Tarps-Fasteners-Stick/65.1.png",
              "/images/imagesQC/variants/tarps-opening/TO1.jpg",
            ],
          },
        ],
        CheckpointList: [
          {
            CheckpointID: "65.1.a",
            CheckpointDescription:
              "All the five Tarp’s fasteners are properly fixed to the hopper by two tightened bolts with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "65.1.b",
            CheckpointDescription:
              "All the five Tarp’s fasteners have their own mechanism’s bolts properly tightened",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "65.1.c",
            CheckpointDescription:
              "All the five Tarp’s fasteners have their own mechanism’s bolts properly tightened",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "65.1.d",
            CheckpointDescription:
              "The tarp’s stick is present, it is aligned with the tarp’s ends and it’s being hold by all the fasteners",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  //-->tarps opening
  {
    SectionName: "Front Tarps spring return mechanism",
    SectionNumber: 66,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Front tarp...",
        Status: "",
        ImageList: [
          {
            TrailerType: [],
            TireType: "",
            FendersType: "",
            doorsOpeningDirection: "",
            tarpsOpening: "Manual",
            AirInflation: "",
            url: [
              "/images/imagesQC/lead/66-Front-Tarps-Spring/66.1.png",
              "/images/imagesQC/lead/66-Front-Tarps-Spring/66.2.png",
            ],
          },
        ],
        CheckpointList: [
          {
            CheckpointID: "66.1.a",
            CheckpointDescription: "spring return mechanism is properly fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "66.1.b",
            CheckpointDescription:
              "spring return mechanism is vertically aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "66.1.c",
            CheckpointDescription:
              "spring return mechanism has two tightened bolts with washers at both supports",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "66.1.d",
            CheckpointDescription:
              "spring return mechanism single bolt is tightened with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "66.1.e",
            CheckpointDescription:
              "spring return mechanism ends are protected by a plastic cover",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "66.1.f",
            CheckpointDescription:
              "spring return mechanism wire is connected to the pulley and the spring mechanism",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "66.1.g",
            CheckpointDescription: "stick end cover is properly fixed",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 2,
        SubSectionDescription: "Front tarp...",
        optional: "Electric Tarp Opening",
        Status: "",
        ImageList: [
          {
            TrailerType: [],
            TireType: "",
            FendersType: "",
            doorsOpeningDirection: "",
            tarpsOpening: "Electric",
            AirInflation: "",
            url: [
              "/images/imagesQC/variants/tarps-opening/TO3.jpg",
              "/images/imagesQC/variants/tarps-opening/TO7.png",
              "/images/imagesQC/variants/tarps-opening/TO8.png",
              "/images/imagesQC/variants/tarps-opening/TO9.png",
            ],
          },
        ],
        CheckpointList: [
          {
            CheckpointID: "66.2.a",
            CheckpointDescription: "Mechanism is properly fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "66.2.b",
            CheckpointDescription: "Mechanism is vertically aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "66.2.c",
            CheckpointDescription:
              "Mechanism has two tightened bolts with washers at both supports",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "66.2.d",
            CheckpointDescription:
              "Mechanism lower single bolt is tightened with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "66.2.e",
            CheckpointDescription:
              "Mechanism ends are protected by a plastic cover",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "66.2.f",
            CheckpointDescription:
              "Top electric box is present and is fixed to the metal beam by tightened bolts",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "66.2.g",
            CheckpointDescription: "Stick end cover is properly fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "66.2.h",
            CheckpointDescription: "Tubing follows correct path",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  //--> tarps opening
  {
    SectionName: "Rear Tarps spring return mechanism",
    SectionNumber: 67,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "The mechanism('s)",
        Status: "",
        ImageList: [
          {
            TrailerType: [],
            TireType: "",
            FendersType: "",
            doorsOpeningDirection: "",
            tarpsOpening: "Manual",
            AirInflation: "",
            url: [
              "/images/imagesQC/lead/67-Rear-Tarps-Spring/67.1.png",
              "/images/imagesQC/lead/67-Rear-Tarps-Spring/67.2.png",
            ],
          },
          {
            TrailerType: [],
            TireType: "",
            FendersType: "",
            doorsOpeningDirection: "",
            tarpsOpening: "Electric",
            AirInflation: "",
            url: ["/images/imagesQC/variants/tarps-opening/TO4.jpg"],
          },
        ],
        CheckpointList: [
          {
            CheckpointID: "67.1.a",
            CheckpointDescription: "is properly fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "67.1.b",
            CheckpointDescription: "is vertically aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "67.1.c",
            CheckpointDescription:
              "has two tightened bolts with washers at both supports",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "67.1.d",
            CheckpointDescription: "single bolt is tightened with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "67.1.e",
            CheckpointDescription: "ends are protected by a plastic cover",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "67.1.f",
            CheckpointDescription:
              "wire is connected to the pulley and the spring mechanism",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "67.1.g",
            CheckpointDescription: "wire is in line with the pulley",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 2,
        SubSectionDescription: "Rear tarp...",
        Status: "",
        optional: "Electric Tarp Opening",
        ImageList: [
          {
            TrailerType: [],
            TireType: "",
            FendersType: "",
            doorsOpeningDirection: "",
            tarpsOpening: "Electric",
            AirInflation: "",
            url: ["/images/imagesQC/variants/tarps-opening/TO10.png"],
          },
        ],
        CheckpointList: [
          {
            CheckpointID: "67.2.a",
            CheckpointDescription: "spring return mechanism is properly fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "67.2.b",
            CheckpointDescription:
              "spring return mechanism is vertically aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "67.2.c",
            CheckpointDescription:
              "spring return mechanism has two tightened bolts with washers at both supports",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "67.2.d",
            CheckpointDescription:
              "spring return mechanism single bolt is tightened with washers",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "67.2.e",
            CheckpointDescription:
              "spring return mechanism ends are protected by a plastic cover",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "67.2.f",
            CheckpointDescription:
              "spring return mechanism wire is connected to the pulley and the spring mechanism",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "67.2.g",
            CheckpointDescription: "stick end cover is properly fixed",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Tarps",
    SectionNumber: 68,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Check that...",
        Status: "",
        ImageList: ["/images/imagesQC/lead/68-Tarps/68.1.png"],
        CheckpointList: [
          {
            CheckpointID: "68.1.a",
            CheckpointDescription:
              "The tarp doesn’t have any visible damage on its surface",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "68.1.b",
            CheckpointDescription:
              "The tarp closes properly against the front arch at the front",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "68.1.c",
            CheckpointDescription:
              "The tarp closes properly against the rear arch at the front",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Warning Labels", //must add more inspection details about safety stickers
    SectionNumber: 69,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Check that...",
        Status: "",
        ImageList: ["/images/imagesQC/lead/69-Warning-Labels/69.1.png"],
        CheckpointList: [
          {
            CheckpointID: "69.1.a",
            CheckpointDescription:
              "The rear face must have the two warning labels described below",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Hopper's inner steps",
    SectionNumber: 70,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Hopper’s inner vertical ladder",
        DoubleSided: "true",
        Status: "",
        ImageList: [],
        CheckpointList: [
          {
            CheckpointID: "70.1.a",
            CheckpointDescription: "Has the correct number of steps -rear",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "70.1.b",
            CheckpointDescription: "Steps are properly welded -rear",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "70.1.c",
            CheckpointDescription: "Steps are properly aligned -rear",
            CheckpointStatus: "",
          },

          {
            CheckpointID: "70.1.d",
            CheckpointDescription: "Has the correct number of steps -front",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "70.1.e",
            CheckpointDescription: "Steps are properly welded -front",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "70.1.f",
            CheckpointDescription: "Steps are properly aligned -front",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 2,
        SubSectionDescription: "Hopper’s inner inclined ladder ",
        DoubleSided: "true",
        Status: "",
        ImageList: [],
        CheckpointList: [
          {
            CheckpointID: "70.2.a",
            CheckpointDescription: "Has the correct number of steps -rear",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "70.2.b",
            CheckpointDescription: "Steps are properly welded -rear",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "70.2.c",
            CheckpointDescription: "Steps are properly aligned -rear",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "70.2.d",
            CheckpointDescription: "Has the correct number of steps -front",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "70.2.e",
            CheckpointDescription: "Steps are properly welded -front",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "70.2.f",
            CheckpointDescription: "Steps are properly aligned -front",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Hopper's inner surface",
    SectionNumber: 71,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Check that...",
        DoubleSided: "true", //front and rear
        Status: "",
        ImageList: [],
        CheckpointList: [
          {
            CheckpointID: "71.1.a",
            CheckpointDescription:
              "Hopper’s rear inner surface has all the welds properly ground and allow material’s flow on the 4 sides",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "71.1.b",
            CheckpointDescription:
              "Hopper’s rear inner surface has no unnecessary holes",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "71.1.c",
            CheckpointDescription:
              "Hopper’s front inner surface has all the welds properly ground and allow material’s flow on the 4 sides",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "71.1.d",
            CheckpointDescription:
              "Hopper’s front inner surface has no unnecessary holes",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Hopper's external paint", //optional
    SectionNumber: 72,
    SectionProgress: 0,
    optional: "Paint",
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Check that...",
        DoubleSided: "true",
        Status: "",
        ImageList: [],
        CheckpointList: [
          {
            CheckpointID: "72.1.a",
            CheckpointDescription:
              "Left Hopper’s external paint has no noticeable defects",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "72.1.b",
            CheckpointDescription:
              "Left Hopper’s external paint borders are properly painted and aligned and are on the same position at each side.  ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "72.1.c",
            CheckpointDescription:
              "Right Hopper’s external paint has no noticeable defects",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "72.1.d",
            CheckpointDescription:
              "Right Hopper’s external paint borders are properly painted and aligned and are on the same position at each side.  ",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
  {
    SectionName: "Lift Axle", //optional
    SectionNumber: 73,
    SectionProgress: 0,
    optional: "Lift Axle",
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Check that...",
        Status: "",
        ImageList: [
          "/images/imagesQC/variants/lift-axle/LA1.png",
          "/images/imagesQC/variants/lift-axle/LA2.png",
          "/images/imagesQC/variants/lift-axle/LA3.png",
          "/images/imagesQC/variants/lift-axle/LA4.png",
          "/images/imagesQC/variants/lift-axle/LA5.png",
          "/images/imagesQC/variants/lift-axle/LA6.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "73.1.a",
            CheckpointDescription:
              "Axle Bag’s upper support is fixed by 4 tightened bolts",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "73.1.b",
            CheckpointDescription:
              "Axle Bag connects to upper and lower support ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "73.1.c",
            CheckpointDescription:
              "Axle Bag’s upper plate is centered and aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "73.1.d",
            CheckpointDescription:
              "Axle Bag is properly in place and has no noticeable defects",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "73.1.e",
            CheckpointDescription: "Axle Bag lower support is fixed well ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "73.1.f",
            CheckpointDescription:
              "Valve is well connected and follows the correct path to the control box. ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "73.1.g",
            CheckpointDescription:
              "Lift axle control box has all the required connections in accordance with the diagram ",
            CheckpointStatus: "",
          },
        ],
      },
    ],
  },
];
// re-number subsections first,

export default checkpointsData;
