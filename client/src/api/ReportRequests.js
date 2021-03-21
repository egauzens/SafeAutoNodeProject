import axios from "axios";

export const fetchReportInput = async () => {
	const config = { headers: { Accept: "application/json" } };
	const res = await axios.get("/api/report_input", config);
	return res;
};
