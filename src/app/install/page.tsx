import { fetchPlatformInformation } from "../../util/fetchPlatformInformation";
import InstallButton from "./InstallButton";

export default async function Install({ searchParams }: any) {
  const params = await searchParams;
  const platformData = await fetchPlatformInformation({
    openid_configuration: params.openid_configuration,
    registration_token: params.registration_token,
  });

  if (platformData) {
    return (
      <InstallButton
        platformConfiguration={platformData}
        token={params.registration_token}
      />
    );
  } else {
    return <h1>Error</h1>;
  }
}
