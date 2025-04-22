/* eslint-disable no-restricted-globals */
const APIURL =
	(location.hostname === "localhost" || location.hostname === '127.0.0.1' ? "http://127.0.0.1:8000"
	 : location.hostname.includes("peoria-fresh-staging")
		? "https://peoria-fresh-backend-staging-gep43t2cmq-uc.a.run.app"
		: "https://peoria-fresh-backend-gep43t2cmq-uc.a.run.app");

export default APIURL;
