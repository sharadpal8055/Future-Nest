import {
  Briefcase,
  FileText,
  BookOpen,
  ClipboardList,
  Map,
} from "lucide-react";

export const LIBRARY_ITEMS = [
  {
    id: 1,
    title: "Interview Questions",
    description: "Practice company interview questions by subject.",
    icon: Briefcase,
    path: "/library/interview",
    available: true,
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Notes",
    description: "Quick revision notes.",
    icon: FileText,
    available: false,
    color: "bg-purple-500",
  },
  {
    id: 3,
    title: "Cheat Sheets",
    description: "One-page revision sheets.",
    icon: BookOpen,
    available: false,
    color: "bg-green-500",
  },
  {
    id: 4,
    title: "MCQs",
    description: "Practice objective questions.",
    icon: ClipboardList,
    available: false,
    color: "bg-orange-500",
  },
  {
    id: 5,
    title: "Roadmaps",
    description: "Structured learning paths.",
    icon: Map,
    available: false,
    color: "bg-pink-500",
  },
];