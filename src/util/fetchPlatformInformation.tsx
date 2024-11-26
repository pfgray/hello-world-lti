export const fetchPlatformInformation = async (params: {
  openid_configuration?: string;
  registration_token?: string;
}) => {
  return params.openid_configuration
    ? fetch(
        params.openid_configuration,
        params.registration_token
          ? {
              headers: {
                Authorization: `Bearer ${params.registration_token}`,
              },
            }
          : {}
      ).then((resp) => resp.json())
    : undefined;
};
