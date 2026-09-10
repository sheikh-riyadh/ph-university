import { catchAsync } from "../../utils/catchAsync";

const createSemesterRegistration = catchAsync(async (req, res) => {
  res.status(201).json({
    success: true,
    message: "semester registration created successfully !",
    data: "",
  });
});

const getAllSemesterRegistration = catchAsync(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "all semester registration retrived successfully !",
    data: "",
  });
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "single semester registration retrived successfully !",
    data: "",
  });
});

const updateSemesterRegistration = catchAsync(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "updated semester registration successfully !",
    data: "",
  });
});

export const semesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
