import * as Yup from "yup";

export const eventValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),

  description: Yup.string().optional(),

  date: Yup.string().required("Date is required"),

  time: Yup.string()
    .optional()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      excludeEmptyString: true,
      message: "Time must be in HH:MM format",
    }),
  location: Yup.string().optional(),
});
