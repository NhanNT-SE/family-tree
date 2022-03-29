export interface CurrentUser {
  id: string;
  username: string;
  permission: number;
}

export interface UserDto {
  id?: string;
  username: string;
  email: string;
  bod: Date | string;
}

export interface ProfileDto {
  username: string;
  password: string;
  permission: number;
}

export interface CreateUserResponse extends UserDto {
  id: string;
}

export interface MemberDto {
  id?: string;
  familyId:string;
  fullName: string;
  bYear: string;
  sex: "male" | "female";
}

export interface FamilyDto {
  id?:string
  father: string;
  mother: string;
  child: string[];
}
