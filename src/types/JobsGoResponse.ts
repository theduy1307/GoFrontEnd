export interface JobsGoApiResult {
  status: number
  data: JobsGoResponse
}

export interface JobsGoResponse {
  name: string
  dob: string
  formatedDob: string
  gender: string
  email: string
  phone: string
  location: string
  jobHistory: JobsGoJobHistory[]
  education: JobsGoEducation[]
  otherSkill: string
  otherCertificate: string
  otherCareerObjective: string
  otherInterest: string
  otherAward: string
  otherProject: string
  otherSocialActivities: string
}

export interface JobsGoJobHistory {
  expPeriod: string
  expPosition: string
  expCompanyName: string
  expDescription: string
  normalizedPeriod: TimePeriod
}

export interface JobsGoEducation {
  eduSchoolUniv: string
  eduMajor: string
  eduGraduation: string
  eduPeriod: string
  normalizedPeriod: TimePeriod
}

export interface TimePeriod {
  start: string
  to: string
}
