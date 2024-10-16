// determineTrailerStatus.js

const renderStatus = (start, end) => {
  if (!start) {
    return "Not Started";
  } else if (start && !end) {
    return "In Progress";
  } else {
    return "Completed";
  }
};

const renderSectionStatus = (timesArr) => {
  const statusArr = timesArr.map((time) => renderStatus(time.start, time.end));

  if (
    statusArr.includes("Not Started") &&
    !statusArr.includes("Completed") &&
    !statusArr.includes("In Progress")
  ) {
    return "Not Started";
  }
  if (
    statusArr.includes("Completed") &&
    !statusArr.includes("Not Started") &&
    !statusArr.includes("In Progress")
  ) {
    return "Completed";
  } else {
    return "In Progress";
  }
};

const determineTrailerStatus = (trailer) => {
  const frontFrameTimesArr = [
    {
      start: trailer?.partKits?.frontFrameState?.StartTime,
      end: trailer?.partKits?.frontFrameState?.EndTime,
    },
    {
      start: trailer?.frontFrameTimeData?.startDate,
      end: trailer?.frontFrameTimeData?.completedDate,
    },
    {
      start: trailer?.frontFrameTimeData?.finishingStartTime,
      end: trailer?.frontFrameTimeData?.finishingEndTime,
    },
  ];

  const rearFrameTimesArr = [
    {
      start: trailer?.partKits?.rearFrameState?.StartTime,
      end: trailer?.partKits?.rearFrameState?.EndTime,
    },
    {
      start: trailer?.rearFrameTimeData?.startDate,
      end: trailer?.rearFrameTimeData?.completedDate,
    },
    {
      start: trailer?.rearFrameTimeData?.finishingStartTime,
      end: trailer?.rearFrameTimeData?.finishingEndTime,
    },
  ];

  const boxStageTimesArr = (stageIndex) => [
    {
      start:
        trailer?.partKits?.[`boxStage${stageIndex}State`]?.StartTime ?? null,
      end: trailer?.partKits?.[`boxStage${stageIndex}State`]?.EndTime ?? null,
    },
    {
      start: trailer?.boxData?.stages?.[stageIndex - 1]?.startedDate ?? null,
      end: trailer?.boxData?.stages?.[stageIndex - 1]?.completedDate ?? null,
    },
  ];

  const boxStage1TimesArr = boxStageTimesArr(1);
  const boxStage2TimesArr = boxStageTimesArr(2);
  const boxStage3TimesArr = boxStageTimesArr(3);
  const boxStage4TimesArr = boxStageTimesArr(4);

  const smallPartsTimesArr =
    trailer?.trailerType === "Tri 61' 3 Hoppers"
      ? [
          {
            start: trailer?.partKits?.smallPartsStageState?.StartTime ?? null,
            end: trailer?.partKits?.smallPartsStageState?.EndTime ?? null,
          },
          {
            start: trailer?.hopperDoorsFront?.StartTime ?? null,
            end: trailer?.hopperDoorsFront?.EndTime ?? null,
          },
          {
            start: trailer?.hopperDoorsRear?.StartTime ?? null,
            end: trailer?.hopperDoorsRear?.EndTime ?? null,
          },
          {
            start: trailer?.hopperDoorsMiddle?.StartTime ?? null,
            end: trailer?.hopperDoorsMiddle?.EndTime ?? null,
          },
        ]
      : [
          {
            start: trailer?.partKits?.smallPartsStageState?.StartTime ?? null,
            end: trailer?.partKits?.smallPartsStageState?.EndTime ?? null,
          },
          {
            start: trailer?.hopperDoorsFront?.StartTime ?? null,
            end: trailer?.hopperDoorsFront?.EndTime ?? null,
          },
          {
            start: trailer?.hopperDoorsRear?.StartTime ?? null,
            end: trailer?.hopperDoorsRear?.EndTime ?? null,
          },
        ];

  const finishingTimesArr = (part) => [
    {
      start: trailer?.partKits?.[`${part}FinishingState`]?.StartTime ?? null,
      end: trailer?.partKits?.[`${part}FinishingState`]?.EndTime ?? null,
    },
    {
      start: trailer?.[`${part}FinishingState`]?.StartTime ?? null,
      end: trailer?.[`${part}FinishingState`]?.EndTime ?? null,
    },
  ];

  const frontFrameFinishingTimesArr = finishingTimesArr("frontFrame");
  const rearFrameFinishingTimesArr = finishingTimesArr("rearFrame");

  const boxFinishingTimesArr = [
    {
      start: trailer?.partKits?.boxFinishingState?.StartTime ?? null,
      end: trailer?.partKits?.boxFinishingState?.EndTime ?? null,
    },
    {
      start: trailer?.boxFinishingState?.StartTime ?? null,
      end: trailer?.boxFinishingState?.EndTime ?? null,
    },
    {
      start: trailer?.installHopperDoorsState?.StartTime ?? null,
      end: trailer?.installHopperDoorsState?.EndTime ?? null,
    },
    {
      start: trailer?.installFramesState?.StartTime ?? null,
      end: trailer?.installFramesState?.EndTime ?? null,
    },
  ];

  const wallsTimesArr =
    trailer?.walls?.map((wall) => ({
      start: wall.startedDate ?? null,
      end: wall.completedDate ?? null,
    })) || [];

  const qualityInspectionTimesArr = [
    {
      start: trailer?.qualityInspection?.initialInspection?.startTime ?? null,
      end: trailer?.qualityInspection?.initialInspection?.endTime ?? null,
    },
    {
      start: trailer?.qualityInspection?.finalCheckStartingDate ?? null,
      end: trailer?.qualityInspection?.finalCheckCompletedDate ?? null,
    },
  ];

  const allSections = [
    frontFrameTimesArr,
    rearFrameTimesArr,
    wallsTimesArr,
    boxStage1TimesArr,
    boxStage2TimesArr,
    boxStage3TimesArr,
    boxStage4TimesArr,
    smallPartsTimesArr,
    boxFinishingTimesArr,
    frontFrameFinishingTimesArr,
    rearFrameFinishingTimesArr,
    qualityInspectionTimesArr,
  ];

  const areAllSectionsCompleted = allSections.every(
    (section) => renderSectionStatus(section) === "Completed"
  );
  const areAllSectionsNotStarted = allSections.every(
    (section) => renderSectionStatus(section) === "Not Started"
  );

  if (areAllSectionsCompleted) {
    return "Completed";
  } else if (areAllSectionsNotStarted) {
    return "Not Started";
  } else {
    return "In Progress";
  }
};

export default determineTrailerStatus;
