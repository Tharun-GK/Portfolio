export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  score?: string;
}

export const educationItems: EducationItem[] = [
  {
    id: "edu-presidency",
    institution: "Presidency University",
    degree: "Bachelor of Technology in Information Science and Technology",
    period: "2023–2027",
    score: "7.48/10",
  },
];
