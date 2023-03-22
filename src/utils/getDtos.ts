import { ROW } from 'src/patients/interface/row-interface';
import {
  HospitalDTO,
  MedicationDTO,
  NurseDto,
  PatientDTO,
  PractitionerDto,
} from '../patients/dtos/index';

let patientDTO: PatientDTO;

let practitionerDTO: PractitionerDto;

let hospitalDTO: HospitalDTO;

let medicationDTO: MedicationDTO;

let nurseDTO: NurseDto;

  let currentSSN = '';
  let currentNurseId = '';
  let currentPractitionerId = '';
  let currentMedicationId = '';
  let currentHospitalId = '';

export function getDtos(row: ROW) {

  const {
    patient_ssn,
    nurse_id,
    hospital_id,
    practitioner_id,
    medication_id,
    observation_id,
  } = row;
  if (patient_ssn.length > 1) {
    currentSSN = patient_ssn;

    patientDTO = {
      patient_ssn: row.patient_ssn,
      patient_firstname: row.patient_firstName,
      patient_lastname:  row.patient_lastName,
      patient_country: row.patient_country,
      patient_address1: row.patient_address1,
      patient_address2: row.patient_address2,
      patient_number1: row.patient_number1,
      patient_number2: row.patient_number2,
      patient_sex: row.patient_sex,
      patient_dob: row.patient_DOB,
      patient_dod: row.patient_DOD,
      patient_email: row.patient_email,
      patient_height: parseFloat(row.patient_height),
      patient_weight: row.patient_weight,
      patient_bloodtype: row.patient_bloodType,
      patient_education_background: row.patient_educationBackground,
      patient_occupation: row.patient_occupation,
    };
  }

  if (nurse_id.length > 1) {
    currentNurseId = nurse_id;
    nurseDTO = {
      nurse_id: row.nurse_id,
      nurse_firstname: row.nurse_firstName,
      nurse_lastname: row.nurse_lastName,
      nurse_address1: row.nurse_address1,
      nurse_address2: row.nurse_address2,
      nurse_number1: row.nurse_number1,
      nurse_checkIn: row.nurse_checkIn,
      nurse_checkOut: row.nurse_checkOut,
    };
  }

  if (practitioner_id.length > 1) {
    currentPractitionerId = practitioner_id;
    practitionerDTO = {
      practitioner_id: row.practitioner_id,
      practitioner_firstname: row.practitioner_firstName,
      practitioner_lastname: row.practitioner_lastName,
      practitioner_address1: row.practitioner_address1,
      practitioner_address2: row.practitioner_address2,
      practitioner_number1: row.practitioner_number1,
      practitioner_number2: row.practitioner_number2,
      practitioner_checkin: row.practitioner_checkIn,
      practitioner_checkout: row.practitioner_checkOut,
    };
  }

  if (hospital_id.length > 1) {
    currentHospitalId = hospital_id;
    hospitalDTO = {
      hospital_id: row.hospital_id,
      hospital_name: row.hospital_name,
      hospital_address: row.hospital_name,
      hospital_number: row.hospital_number,
      hospital_email: row.hospital_email,
    };
  }

  if (medication_id.length > 1) {
    currentMedicationId = medication_id;
    medicationDTO = {
      medication_id: row.medication_id,
      medication_name: row.medication_name,
      medication_company: row.medication_company,
      medication_level: row.medication_level,
      medication_remark: row.medication_remark,
    };
  }

  const observationDTO = {
    observation_id: observation_id,
    observation_time: row.observation_time,
    observation_remark: row.observation_remark,
    patient_ssn: currentSSN,
    hospital_id: currentHospitalId,
    medication_id: currentMedicationId,
    practitioner_id: currentPractitionerId,
    nurse_id: currentNurseId,
  };
  return {
    id: {
      currentSSN,
      currentNurseId,
      currentHospitalId,
      currentMedicationId,
      currentPractitionerId,
    },
    dtos: {
      patientDTO,
      nurseDTO,
      observationDTO,
      medicationDTO,
      practitionerDTO,
      hospitalDTO,
    },
  };
}
