import dayjs from 'dayjs/esm';
import { Status } from 'app/entities/enumerations/status.model';
import { EmployeeCategory } from '../../shared/model/enumerations/employee-category.model';
import { NomineeType } from '../../shared/model/enumerations/nominee-type.model';
import { IdentityType } from '../../shared/model/enumerations/identity-type.model';

export interface INominee {
  id: number;
  nomineeName?: string | null;
  presentAddress?: string | null;
  relationshipWithEmployee?: string | null;
  dateOfBirth?: dayjs.Dayjs | null;
  age?: number | null;
  sharePercentage?: number | null;
  imagePath?: string | null;
  status?: Status | null;
  guardianName?: string | null;
  guardianFatherName?: string | null;
  guardianSpouseName?: string | null;
  guardianDateOfBirth?: dayjs.Dayjs | null;
  guardianPresentAddress?: string | null;
  guardianDocumentName?: string | null;
  guardianRelationshipWith?: string | null;
  guardianImagePath?: string | null;
  isLocked?: boolean | null;
  nominationDate?: dayjs.Dayjs | null;
  permanentAddress?: string | null;
  guardianPermanentAddress?: string | null;
  nomineeType?: NomineeType | null;
  identityType?: IdentityType | null;
  documentName?: string | null;
  idNumber?: string | null;
  isNidVerified?: boolean | null;
  guardianIdentityType?: IdentityType | null;
  guardianIdNumber?: string | null;
  isGuardianNidVerified?: boolean | null;

  employeeId?: number;
  approvedById?: number;
  witnessId?: number;
  memberId?: number;
  pin?: string;
  fullName?: string;
  designationName?: string;
  departmentName?: string;
  unitName?: string;
  employeeCategory?: EmployeeCategory;
  dateOfJoining?: dayjs.Dayjs;
  dateOfConfirmation?: dayjs.Dayjs;
  isChecked?: boolean;
  approvedByFullName?: string;

  // employee?: Pick<IEmployee, 'id'> | null;
  // approvedBy?: Pick<IEmployee, 'id'> | null;
  // witness?: Pick<IEmployee, 'id'> | null;
  // member?: Pick<IEmployee, 'id'> | null;
}

export type NewNominee = Omit<INominee, 'id'> & { id: null };

export class Nominee implements INominee {
  age: number | null;
  approvedByFullName: string;
  approvedById: number;
  dateOfBirth: dayjs.Dayjs | null;
  dateOfConfirmation: dayjs.Dayjs;
  dateOfJoining: dayjs.Dayjs;
  departmentName: string;
  designationName: string;
  documentName: string | null;
  employeeCategory: EmployeeCategory;
  employeeId: number;
  fullName: string;
  guardianDateOfBirth: dayjs.Dayjs | null;
  guardianDocumentName: string | null;
  guardianFatherName: string | null;
  guardianIdNumber: string | null;
  guardianIdentityType: IdentityType | null;
  guardianImagePath: string | null;
  guardianName: string | null;
  guardianPermanentAddress: string | null;
  guardianPresentAddress: string | null;
  guardianRelationshipWith: string | null;
  guardianSpouseName: string | null;
  id: number;
  idNumber: string | null;
  identityType: IdentityType | null;
  imagePath: string | null;
  isChecked: boolean;
  isGuardianNidVerified: boolean | null;
  isLocked: boolean | null;
  isNidVerified: boolean | null;
  memberId: number;
  nominationDate: dayjs.Dayjs | null;
  nomineeName: string | null;
  nomineeType: NomineeType | null;
  permanentAddress: string | null;
  pin: string;
  presentAddress: string | null;
  relationshipWithEmployee: string | null;
  sharePercentage: number | null;
  status: Status | null;
  unitName: string;
  witnessId: number;
}
