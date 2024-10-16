const inspectionData = [
  {
    SectionName: "Tires",
    SectionNumber: 1,
    SectionProgress: 0,
    //*1-->lead and tri axles (3 axles)
    SubSectionList: [
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
    ],
    //*2--> pup and tandem (2 axles)
    SubSectionList2: [
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
    ],
  },

  {
    SectionName: "Fenders",
    SectionNumber: 2,
    SectionProgress: 0,
    //lead
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check that all the fender brackets connections to the fenders have their bolts and washers properly tightened.",
        DoubleSided: "true",
        Status: "",
        ImageList: ["/images/imagesQC/distributor-inspection/fenders/1.png"],
        ImageList2: [
          {
            TireType: "",
            doorsOpeningDirection: "",
            tarpsOpening: "",
            AirInflation: "",
            TrailerType: ["Lead"],
            FendersType: "Heartland Poly Fenders Class 8",
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
        SubSectionNumber: 2,
        SubSectionDescription:
          "Check that all the fender brackets connections to the frames have their bolts and washers properly tightened.",
        DoubleSided: "true",
        Status: "",
        ImageList: ["/images/imagesQC/distributor-inspection/fenders/2.png"],
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
    ],
    //pup and tandem
    SubSectionList2: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check that all the fender brackets connections to the fenders have their bolts and washers properly tightened.",
        DoubleSided: "true",
        Status: "",
        ImageList: ["/images/imagesQC/distributor-inspection/fenders/1.png"],
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
        SubSectionNumber: 2,
        SubSectionDescription:
          "Check that all the fender brackets connections to the frames have their bolts and washers properly tightened.",
        DoubleSided: "true",
        Status: "",
        ImageList: ["/images/imagesQC/distributor-inspection/fenders/2.png"],
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
    ],
    //tri-axles
    SubSectionList3: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check that all the fender brackets connections to the fenders have their bolts and washers properly tightened.",
        DoubleSided: "true",
        Status: "",
        ImageList: ["/images/imagesQC/distributor-inspection/fenders/1.png"],
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
        SubSectionNumber: 2,
        SubSectionDescription:
          "Check that all the fender brackets connections to the frames have their bolts and washers properly tightened.",
        DoubleSided: "true",
        Status: "",
        ImageList: ["/images/imagesQC/distributor-inspection/fenders/2.png"],
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
    ],
  },

  {
    SectionName: "Light Box Assembly",
    SectionNumber: 4,
    SectionProgress: 0,
    SubSectionList: [
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

  {
    SectionName: "Air Tanks",
    SectionNumber: 11,
    SectionProgress: 0,
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription:
          "Check if the front air tank is properly fixed and has all connections",
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
        ],
      },
      {
        SubSectionNumber: 2,
        SubSectionDescription:
          "Check if the rear air tank is properly fixed and has all connections",
        Status: "",
        ImageList: [
          "/images/imagesQC/lead/11-Air-Tanks/11.1.1.png",
          "/images/imagesQC/lead/11-Air-Tanks/11.1.2.png",
          "/images/imagesQC/lead/11-Air-Tanks/11.1.3.png",
          "/images/imagesQC/lead/11-Air-Tanks/11.1.4.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "11.2.a",
            CheckpointDescription: "Rear - is properly centered and fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "11.2.b",
            CheckpointDescription:
              "Rear - has a rubber layer in the left connection",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "11.2.c",
            CheckpointDescription:
              "Rear - has two tightened bolts with washers in the left connection",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "11.2.d",
            CheckpointDescription:
              "Rear - washers are firm but not over torqued in the left connection",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "11.2.e",
            CheckpointDescription:
              "Rear - has a rubber layer in the right connection",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "11.2.f",
            CheckpointDescription:
              "Rear - has two tightened bolts with washers in the right connection",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "11.2.g",
            CheckpointDescription:
              "Rear - washers are firm but not over torqued in the right connection",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "11.2.h",
            CheckpointDescription:
              "Rear - has a wire rope attached to its purge valve",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "11.2.i",
            CheckpointDescription:
              "Rear - left pneumatic connection is connected to the Dolly valve",
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
          "/images/imagesQC/lead/22-Rear-Center-Step/22.1.2.png",
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
    //2 hoppers
    SubSectionList: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Front/rear hopper doors manual opening",
        DoubleSided: "true", //front and rear, (a-g, h-n)
        optional: "Manual",
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
      {
        SubSectionNumber: 3,
        SubSectionDescription: "Front/rear hopper doors electric opening",
        DoubleSided: "true", //front and rear, (a-g, h-n)
        optional: "Electric Doors Opening",
        Status: "",
        ImageList: [
          "/images/imagesQC/variants/electric-doors-opening/EDO1.png",
          "/images/imagesQC/variants/electric-doors-opening/EDO2.png",
          "/images/imagesQC/variants/electric-doors-opening/EDO3.png",
          "/images/imagesQC/variants/electric-doors-opening/EDO4.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "43.3.a",
            CheckpointDescription:
              "Front - Metal Rod/Socket connection is properly fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.3.b",
            CheckpointDescription:
              "Front - Bolts surrounding the rod/socket are tightened well ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.3.c",
            CheckpointDescription:
              "Front - The welds on the surrounding rods are correct",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.3.d",
            CheckpointDescription:
              "Front - The rod is properly fixed to the hopper door ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.3.e",
            CheckpointDescription:
              "Front - Black box is present and connected to central metal plate by 4 tightened bolts with washers. ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.3.f",
            CheckpointDescription:
              "Front - Side metal plates are connected to central metal plate by 2 tightened bolts on each side",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.3.g",
            CheckpointDescription:
              "Front - Side metal plates are connected to chassis by 4 tightened bolts with washers on each side",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.3.h",
            CheckpointDescription:
              "Front - Metal plate ( Platinum P) is connected to side metal plates by 6 tightened screws (3 on each side)",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.3.i",
            CheckpointDescription:
              "Front - Tubing and air connections are placed correctly, on the top and behind the black box. ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.3.j",
            CheckpointDescription:
              "Rear - Metal Rod/Socket connection is properly fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.3.k",
            CheckpointDescription:
              "Rear - Bolts surrounding the rod/socket are tightened well ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.3.l",
            CheckpointDescription:
              "Rear - The welds on the surrounding rods are correct",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.3.m",
            CheckpointDescription:
              "Rear - The rod is properly fixed to the hopper door ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.3.n",
            CheckpointDescription:
              "Rear - Black box is present and connected to central metal plate by 4 tightened bolts with washers. ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.3.o",
            CheckpointDescription:
              "Rear - Side metal plates are connected to central metal plate by 2 tightened bolts on each side",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.3.p",
            CheckpointDescription:
              "Rear - Side metal plates are connected to chassis by 4 tightened bolts with washers on each side",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.3.q",
            CheckpointDescription:
              "Rear - Metal plate ( Platinum P) is connected to side metal plates by 6 tightened screws (3 on each side)",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.3.r",
            CheckpointDescription:
              "Rear - Tubing and air connections are placed correctly, on the top and behind the black box. ",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 6,
        SubSectionDescription: "Electric door opening control box",
        Status: "",
        optional: "Electric Doors Opening",
        ImageList: [
          "/images/imagesQC/variants/electric-doors-opening/EDO5.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "43.6.a",
            CheckpointDescription:
              "There is a hopper door control box present for each hopper door ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.6.b",
            CheckpointDescription:
              "Each control box has the correct connection at the back",
            CheckpointStatus: "",
          },
        ],
      },
    ],
    // 3 hoppers
    SubSectionList4: [
      {
        SubSectionNumber: 1,
        SubSectionDescription: "Front/rear hopper doors manual opening",
        DoubleSided: "true", //front and rear, (a-g, h-n)
        optional: "Manual",
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
      {
        SubSectionNumber: 3,
        SubSectionDescription: "Front/rear hopper doors electric opening",
        DoubleSided: "true", //front and rear, (a-g, h-n)
        optional: "Electric Doors Opening",
        Status: "",
        ImageList: [
          "/images/imagesQC/variants/electric-doors-opening/EDO1.png",
          "/images/imagesQC/variants/electric-doors-opening/EDO2.png",
          "/images/imagesQC/variants/electric-doors-opening/EDO3.png",
          "/images/imagesQC/variants/electric-doors-opening/EDO4.png",
          "/images/imagesQC/variants/electric-doors-opening/EDO6.jpg",
        ],
        CheckpointList: [
          {
            CheckpointID: "43.3.a",
            CheckpointDescription:
              "Front - Metal Rod/Socket connection is properly fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.3.b",
            CheckpointDescription:
              "Front - Bolts surrounding the rod/socket are tightened well ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.3.c",
            CheckpointDescription:
              "Front - The welds on the surrounding rods are correct",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.3.d",
            CheckpointDescription:
              "Front - The rod is properly fixed to the hopper door ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.3.e",
            CheckpointDescription:
              "Front - Black box is present and connected to central metal plate by 4 tightened bolts with washers. ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.3.f",
            CheckpointDescription:
              "Front - Side metal plates are connected to central metal plate by 2 tightened bolts on each side",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.3.g",
            CheckpointDescription:
              "Front - Side metal plates are connected to chassis by 4 tightened bolts with washers on each side",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.3.h",
            CheckpointDescription:
              "Front - Metal plate ( Platinum P) is connected to side metal plates by 6 tightened screws (3 on each side)",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.3.i",
            CheckpointDescription:
              "Front - Tubing and air connections are placed correctly, on the top and behind the black box. ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.3.j",
            CheckpointDescription:
              "Rear - Metal Rod/Socket connection is properly fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.3.k",
            CheckpointDescription:
              "Rear - Bolts surrounding the rod/socket are tightened well ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.3.l",
            CheckpointDescription:
              "Rear - The welds on the surrounding rods are correct",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.3.m",
            CheckpointDescription:
              "Rear - The rod is properly fixed to the hopper door ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.3.n",
            CheckpointDescription:
              "Rear - Black box is present and connected to central metal plate by 4 tightened bolts with washers. ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.3.o",
            CheckpointDescription:
              "Rear - Side metal plates are connected to central metal plate by 2 tightened bolts on each side",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.3.p",
            CheckpointDescription:
              "Rear - Side metal plates are connected to chassis by 4 tightened bolts with washers on each side",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.3.q",
            CheckpointDescription:
              "Rear - Metal plate ( Platinum P) is connected to side metal plates by 6 tightened screws (3 on each side)",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.3.r",
            CheckpointDescription:
              "Rear - Tubing and air connections are placed correctly, on the top and behind the black box. ",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 4,
        SubSectionDescription: "Middle hopper doors manual opening",
        Status: "",
        optional: "Manual",
        ImageList: [
          "/images/imagesQC/lead/43-Hopper-Doors-Central-Mechanisms/43.1.1.png",
          "/images/imagesQC/lead/43-Hopper-Doors-Central-Mechanisms/43.1.2.png",
          "/images/imagesQC/lead/43-Hopper-Doors-Central-Mechanisms/43.1.3.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "43.4.a",
            CheckpointDescription:
              "Front - wiper mounting plate is fixed by 5 tightened bolts with washers and Nylocks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.4.b",
            CheckpointDescription:
              "Front - wiper clamp is fixed by 6 tightened bolts with washers and Nylocks",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.4.c",
            CheckpointDescription:
              "Front - wiper is properly aligned, and it is in contact with the door at all points",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.4.d",
            CheckpointDescription:
              "Front - two chains and sprockets are properly aligned and welded",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.4.e",
            CheckpointDescription:
              "Front - shaft is vertically and horizontally aligned",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.4.f",
            CheckpointDescription:
              "Front - surface is plane and has no damage on the upper side",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.4.g",
            CheckpointDescription:
              "Front - shaft guide is centered and properly welded to the door",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 5,
        SubSectionDescription: "Middle hopper doors electric opening",
        // 3 hopper tri only with electric door opening
        optional: "Electric Doors Opening",
        Status: "",
        ImageList: [
          "/images/imagesQC/variants/electric-doors-opening/EDO1.png",
          "/images/imagesQC/variants/electric-doors-opening/EDO2.png",
          "/images/imagesQC/variants/electric-doors-opening/EDO3.png",
          "/images/imagesQC/variants/electric-doors-opening/EDO4.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "43.5.a",
            CheckpointDescription:
              "Front - Metal Rod/Socket connection is properly fixed",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.5.b",
            CheckpointDescription:
              "Front - Bolts surrounding the rod/socket are tightened well ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.5.c",
            CheckpointDescription:
              "Front - The welds on the surrounding rods are correct",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.5.d",
            CheckpointDescription:
              "Front - The rod is properly fixed to the hopper door ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.5.e",
            CheckpointDescription:
              "Front - Black box is present and connected to central metal plate by 4 tightened bolts with washers. ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.5.f",
            CheckpointDescription:
              "Front - Side metal plates are connected to central metal plate by 2 tightened bolts on each side",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.5.g",
            CheckpointDescription:
              "Front - Side metal plates are connected to chassis by 4 tightened bolts with washers on each side",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.5.h",
            CheckpointDescription:
              "Front - Metal plate ( Platinum P) is connected to side metal plates by 6 tightened screws (3 on each side)",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.5.i",
            CheckpointDescription:
              "Front - Tubing and air connections are placed correctly, on the top and behind the black box. ",
            CheckpointStatus: "",
          },
        ],
      },
      {
        SubSectionNumber: 6,
        SubSectionDescription: "Electric door opening control box",
        Status: "",
        optional: "Electric Doors Opening",
        ImageList: [
          "/images/imagesQC/variants/electric-doors-opening/EDO5.png",
        ],
        CheckpointList: [
          {
            CheckpointID: "43.6.a",
            CheckpointDescription:
              "There is a hopper door control box present for each hopper door ",
            CheckpointStatus: "",
          },
          {
            CheckpointID: "43.6.b",
            CheckpointDescription:
              "Each control box has the correct connection at the back",
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
              "/images/imagesQC/variants/doors-opening-direction/DO8.png",
              "/images/imagesQC/variants/doors-opening-direction/DO9.png",
              "/images/imagesQC/lead/44-Hopper-Doors-Side-Mechanisms/44.3.png",
              "/images/imagesQC/lead/44-Hopper-Doors-Side-Mechanisms/44.4.png",
              "/images/imagesQC/variants/doors-opening-direction/DO10.png",
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
              "/images/imagesQC/variants/electric-tarps-opening/TO1.jpg",
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
        optional: "Manual",
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
              "/images/imagesQC/variants/electric-tarps-opening/TO7.png",
              "/images/imagesQC/variants/electric-tarps-opening/TO8.png",
              "/images/imagesQC/variants/electric-tarps-opening/TO9.png",
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
        optional: "Manual",
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
            url: ["/images/imagesQC/variants/electric-tarps-opening/TO10.png"],
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
];

export default inspectionData;
