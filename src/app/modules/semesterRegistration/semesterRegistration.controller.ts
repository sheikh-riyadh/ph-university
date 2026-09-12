import { catchAsync } from "../../utils/catchAsync";
import { semesterRegistrationServices } from "./semesterRegistration.service";

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationServices.createSemesterRegistrationIntoDB(
      req.body.semesterRegistrtion,
    );
  res.status(201).json({
    success: true,
    message: "semester registration created successfully !",
    data: result,
  });
});

const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationServices.getAllSemesterRegistrationFromDB();
  res.status(200).json({
    success: true,
    message: "all semester registration retrived successfully !",
    data: result,
  });
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await semesterRegistrationServices.getSingleSemesterRegistrationFromDB(
      id as string,
    );
  res.status(200).json({
    success: true,
    message: "single semester registration retrived successfully !",
    data: result,
  });
});

const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await semesterRegistrationServices.updateSemesterRegistrationFromDB(
      id as string,
      req.body.semesterRegistration,
    );
  res.status(200).json({
    success: true,
    message: "updated semester registration successfully !",
    data: result,
  });
});

export const semesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
