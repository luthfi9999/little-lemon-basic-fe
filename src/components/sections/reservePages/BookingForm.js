import { Formik, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';

const EMPTY_REQUIRED_FIELD = "Input is required.";

const initialValue = {
  fullName: '',
  email: '',
  mobileNumber: '',
  numberOfPeople: '',
  date: '',
  time: '',
  preferences: ''
};

export default function ReservationForm() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    fullName: Yup.string().required(EMPTY_REQUIRED_FIELD).min(2, 'At least 2 characters'),
    email: Yup.string().email('Invalid email format').required(EMPTY_REQUIRED_FIELD),
    mobileNumber: Yup.string().matches(/^\d+$/, 'Must be a number'),
    numberOfPeople: Yup.number().min(1, 'At least 1 person').required(EMPTY_REQUIRED_FIELD),
    date: Yup.string().required(EMPTY_REQUIRED_FIELD),
    time: Yup.string().required(EMPTY_REQUIRED_FIELD),
    preferences: Yup.string().required(EMPTY_REQUIRED_FIELD)
  });

  const onSubmit = (values) => {
    console.log('Form Values:', values);
    navigate('/confirmation');
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={onSubmit}
    >
      {({ submitForm }) => (
        <div className="reservation-form">
          <div className="form-field">
            <label htmlFor="fullName">Full Name</label> <br />
            <Field type="text" id="fullName" name="fullName" placeholder="Enter Full Name" minLength={2} maxLength={50} />
            <ErrorMessage name="fullName" component="span" />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label> <br />
            <Field type="email" id="email" name="email" placeholder="Enter Email" minLength={2} maxLength={50} />
            <ErrorMessage name="email" component="span" />
          </div>

          <div className="form-field">
            <label htmlFor="mobileNumber">Mobile Number</label> <br />
            <Field type="text" id="mobileNumber" name="mobileNumber" placeholder="Enter Mobile Number" minLength={8} maxLength={12} />
            <ErrorMessage name="mobileNumber" component="span" />
          </div>

          <div className="form-field">
            <label htmlFor="numberOfPeople">Number of People</label> <br />
            <Field type="number" id="numberOfPeople" name="numberOfPeople" placeholder="Enter Number of People" />
            <ErrorMessage name="numberOfPeople" component="span" />
          </div>

          <div className="form-field">
            <label htmlFor="date">Select Date</label> <br />
            <Field type="date" id="date" name="date" />
            <ErrorMessage name="date" component="span" />
          </div>

          <div className="form-field">
            <label htmlFor="time">Select Time</label> <br />
            <Field as="select" id="time" name="time">
              <option value="">Select Time</option>
              <option>07:00</option>
              <option>08:00</option>
              <option>09:00</option>
            </Field>
            <ErrorMessage name="time" component="span" />
          </div>

          <div className="form-field">
            <label htmlFor="preferences">Seating Preferences</label> <br />
            <Field as="select" id="preferences" name="preferences">
              <option value="">Select Preference</option>
              <option>None</option>
              <option>Indoors</option>
              <option>Outdoor (Patio)</option>
              <option>Outdoor (Sidewalk)</option>
            </Field>
            <ErrorMessage name="preferences" component="span" />
          </div>

          <button className="action-button" type="button" onClick={submitForm}>
            Submit
          </button>
        </div>
      )}
    </Formik>
  );
}
