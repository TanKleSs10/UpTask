export const statusDetails: {
  [key: string]: { translation: string; color: string };
} = {
  pending: {
    translation: "Pendiente",
    color: "border-t-slate-600",
  },
  onHold: {
    translation: "En Espera",
    color: "border-t-red-500",
  },
  inProgress: {
    translation: "En Progreso",
    color: "border-t-blue-500",
  },
  underReview: {
    translation: "En Revisión",
    color: "border-t-amber-500",
  },
  completed: {
    translation: "Completado",
    color: "border-t-emerald-500",
  },
};
