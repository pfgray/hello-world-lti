const fetchPlatformInformation = async (params: {
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

export default async function Install({ searchParams }: any) {
  const params = await searchParams;
  const platformData = await fetchPlatformInformation({
    openid_configuration: params.openid_configuration,
    registration_token: params.registration_token,
  });
  if (platformData) {
    return (
      <h1>
        <button>Install App</button>
      </h1>
    );
  } else {
    return <h1>Error</h1>;
  }
}
