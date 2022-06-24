import { getHolidaysUrl } from "../routes";
import api from "../../axios";

export const fetchHolidaysRequest = async () => {
  const response = await api.get(getHolidaysUrl, {
    params: { groupBy: "month" },
  });

  return response;
};
