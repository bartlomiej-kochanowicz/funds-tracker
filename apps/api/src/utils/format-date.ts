import { format } from "date-fns";

export const formatDate = (date: Date): string => format(date, "yyyy-MM-dd");
