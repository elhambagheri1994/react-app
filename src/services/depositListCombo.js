import http from "./httpServices";

const apiEndpoint = "/rest/mha/general/mhageneral/accListByOrgIdCombo/";

export default async function depositList(orgId) {
  return http.getRequest(`${apiEndpoint}${orgId}`, {
    searchFilter: "",
    pageNumber: 0,
    pageSize: 0,
  });
}
