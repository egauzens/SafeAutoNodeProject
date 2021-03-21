import axios from "axios";

export const fetchReportInput = async () => {
	return await axios.get("/api/report_input");
};
